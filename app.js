let itemGrid = [];
let itemLayout = [];
let dungeonSelect = 0;

let chestsopenedInit = new Array(chests.length).fill(false);

let trackerOptions = {
    showprizes: true,
    selected: {}
};

let trackerData = {
    items: { ...itemsInit },
    dungeonchests: { ...dungeonchestsInit },
    medallions: { ...medallionsInit },
    chestsopened: [...chestsopenedInit],
    dungeonChestState: {}
};

function captureDungeonChestState() {
    const snapshot = {};
    for (let dungeonIndex = 0; dungeonIndex < dungeons.length; dungeonIndex++) {
        const dungeon = dungeons[dungeonIndex];
        snapshot[dungeonIndex] = {};

        for (const key in dungeon.chestlist) {
            if (Object.prototype.hasOwnProperty.call(dungeon.chestlist, key)) {
                snapshot[dungeonIndex][key] = !!dungeon.chestlist[key].isOpened;
            }
        }
    }
    return snapshot;
}

function restoreDungeonChestState(snapshot) {
    if (!snapshot) return;

    for (let dungeonIndex = 0; dungeonIndex < dungeons.length; dungeonIndex++) {
        const dungeon = dungeons[dungeonIndex];
        const savedDungeon = snapshot[dungeonIndex];
        if (!dungeon || !savedDungeon) continue;

        for (const key in dungeon.chestlist) {
            if (Object.prototype.hasOwnProperty.call(dungeon.chestlist, key) && Object.prototype.hasOwnProperty.call(savedDungeon, key)) {
                dungeon.chestlist[key].isOpened = !!savedDungeon[key];
            }
        }
    }
}

const defaultSettings = {
    map: 1,
    iZoom: 100,
    mZoom: 100,
    mPos: 1,
    layoutVersion: 1,
    glogic: 'Open',
    prize: 1,
    items: defaultItemGrid,
    trackerData: trackerData
};

async function saveState() {
    trackerData.dungeonChestState = captureDungeonChestState();
    const config = getConfigObject();
    await LocalStorageDB.setItem('trackerConfig', config);
    await LocalStorageDB.setItem('trackerData', trackerData);
}

async function loadState() {
    try {
        const savedConfig = await LocalStorageDB.getItem('trackerConfig');
        const savedData = await LocalStorageDB.getItem('trackerData');
        
        if (savedData) {
            trackerData = savedData;
            if (!Array.isArray(trackerData.chestsopened)) {
                trackerData.chestsopened = [...chestsopenedInit];
            }
            if (!trackerData.dungeonChestState) {
                trackerData.dungeonChestState = {};
            }
            restoreDungeonChestState(trackerData.dungeonChestState);
        }

        if (savedConfig) {
            setConfigObject(savedConfig);
        } else {
            setConfigObject(defaultSettings);
        }
    } catch (e) {
        console.error("Failed loading from IndexedDB", e);
        setConfigObject(defaultSettings);
    }
}

function setConfigObject(configobj) {
    const items = configobj.items || defaultItemGrid;
    const mapPosition = configobj.layoutVersion === undefined ? 1 : configobj.mPos;
    initGridRow(JSON.parse(JSON.stringify(items)));

    document.getElementById('showmap').checked = !!configobj.map;
    showTracker('mapdiv', document.getElementById('showmap'));

    document.getElementById('itemdivsize').value = configobj.iZoom || 100;
    setZoom('itemdiv', document.getElementById('itemdivsize'));

    document.getElementById('mapdivsize').value = configobj.mZoom || 100;
    setZoom('mapdiv', document.getElementById('mapdivsize'));

    const mappos = document.getElementsByName('mapposition');
    if (mappos[mapPosition]) mappos[mapPosition].checked = true;
    setOrder(mapPosition === 0);

    document.getElementById('showprizes').checked = !!configobj.prize;
    trackerOptions.showprizes = !!configobj.prize;

    const glogics = document.getElementsByName('ganonlogic');
    for (let rbutton of glogics) {
        if (rbutton.value === configobj.glogic) {
            rbutton.checked = true;
            ganonlogic = rbutton.value;
        }
    }
    refreshMap();
}

function getConfigObject() {
    let configobj = {};
    configobj.map = document.getElementById('showmap').checked ? 1 : 0;
    configobj.iZoom = document.getElementById('itemdivsize').value;
    configobj.mZoom = document.getElementById('mapdivsize').value;
    configobj.mPos = document.getElementsByName('mapposition')[1].checked ? 1 : 0;
    configobj.layoutVersion = 1;
    configobj.prize = document.getElementById('showprizes').checked ? 1 : 0;

    for (let rbutton of document.getElementsByName('ganonlogic')) {
        if (rbutton.checked) configobj.glogic = rbutton.value;
    }
    configobj.items = JSON.parse(JSON.stringify(itemLayout));
    return configobj;
}

function toggleChest(x) {
    trackerData.chestsopened[x] = !trackerData.chestsopened[x];
    refreshChests();
    updateMap();
    saveState();
}

function refreshChests() {
    for (let k = 0; k < chests.length; k++) {
        const el = document.getElementById('chest-' + k);
        if (el) {
            const tooltipVisible = el.classList.contains('tooltip-visible');
            el.className = trackerData.chestsopened[k] 
                ? "mapspan chest opened" 
                : "mapspan chest " + chests[k].isAvailable();
            if (tooltipVisible) el.classList.add('tooltip-visible');
        }
    }
}

function highlight(x) {
    document.getElementById('chest-' + x).style.backgroundImage = "url('assets/highlighted.png')";
}

function unhighlight(x) {
    document.getElementById('chest-' + x).style.backgroundImage = "url('assets/poi.png')";
}

function highlightDungeon(x) {
    document.getElementById("dungeon" + x).style.backgroundImage = "url('assets/highlighted.png')";
}

function unhighlightDungeon(x) {
    if (dungeonSelect !== x) {
        document.getElementById("dungeon" + x).style.backgroundImage = "url('assets/poi.png')";
    }
}

function closeLocationTooltips() {
    document.querySelectorAll('.mapspan.tooltip-visible').forEach((location) => {
        location.classList.remove('tooltip-visible');
    });
}

function toggleLocationTooltip(event) {
    if (event.pointerType === 'mouse') return;

    closeLocationTooltips();
    event.currentTarget.classList.toggle('tooltip-visible');
}

function clickDungeon(d) {
    document.getElementById("dungeon" + dungeonSelect).style.backgroundImage = "url('assets/poi.png')";
    dungeonSelect = d;
    document.getElementById("dungeon" + dungeonSelect).style.backgroundImage = "url('assets/highlighted.png')";

    document.getElementById('submaparea').innerHTML = dungeons[dungeonSelect].name;
    document.getElementById('submaparea').className = "DC" + dungeons[dungeonSelect].isBeatable();
    
    const DClist = document.getElementById('submaplist');
    DClist.innerHTML = "";

    for (let key in dungeons[dungeonSelect].chestlist) {
        let s = document.createElement('li');
        s.innerHTML = key;

        if (dungeons[dungeonSelect].chestlist[key].isOpened) s.className = "DCopened";               
        else if (dungeons[dungeonSelect].chestlist[key].isAvailable()) s.className = "DCavailable";               
        else s.className = "DCunavailable";               

        s.onclick = () => toggleDungeonChest(s, dungeonSelect, key);
        s.onmouseover = () => s.style.backgroundColor = "#282828";
        s.onmouseout = () => s.style.backgroundColor = "";
        s.style.cursor = "pointer";

        DClist.appendChild(s);
    }
}

function toggleDungeonChest(sender, d, c) {
    dungeons[d].chestlist[c].isOpened = !dungeons[d].chestlist[c].isOpened;
    if (dungeons[d].chestlist[c].isOpened) sender.className = "DCopened";
    else if (dungeons[d].chestlist[c].isAvailable()) sender.className = "DCavailable";     
    else sender.className = "DCunavailable";

    updateMap();
    saveState();
}

function setOrder(isBelow) {
    const layout = document.getElementById('layoutdiv');
    if (isBelow) {
        layout.classList.remove('flexcontainer');
    } else {
        layout.classList.add('flexcontainer');
    }
    saveState();
}

function showPrizes(sender) {
    trackerOptions.showprizes = sender.checked;
    updateGridItemAll();
    saveState();
}

function setGanonLogic(value) {
    ganonlogic = value;
    updateMap();
    saveState();
}

function setZoom(target, sender) {
    const scale = sender.value / 100;
    const el = document.getElementById(target);
    el.style.transform = `scale(${scale})`;
    document.getElementById(target + 'size-text').innerHTML = sender.value + '%';
    saveState();
}

function showSettings() {
    const sender = document.getElementById('settingsbutton');
    const x = document.getElementById("settings");
    if (!x.style.display || x.style.display === 'none') {
        x.style.display = 'initial';
        sender.innerHTML = 'X';
    } else {
        x.style.display = 'none';		
        sender.innerHTML = '🔧';
    } 
}

function showTracker(target, sender) {
    document.getElementById(target).style.display = sender.checked ? '' : 'none';
}





function createItemTracker(sender) {
    for (let r = 0; r < 8; r++) {
        itemGrid[r] = [];
        itemLayout[r] = [];

        itemGrid[r]['row'] = document.createElement('table');
        itemGrid[r]['row'].className = 'tracker';
        sender.appendChild(itemGrid[r]['row']);

        const tr = document.createElement('tr');
        itemGrid[r]['row'].appendChild(tr);

        for (let i = 0; i < 7; i++) {	
            itemGrid[r][i] = [];
            itemLayout[r][i] = 'blank';

            itemGrid[r][i]['item'] = document.createElement('td');
            itemGrid[r][i]['item'].className = 'griditem';
            tr.appendChild(itemGrid[r][i]['item']);

            const tdt = document.createElement('table');
            tdt.className = 'lonk';
            itemGrid[r][i]['item'].appendChild(tdt);

            const tdtr1 = document.createElement('tr');
            tdt.appendChild(tdtr1);
            for (let cornerIdx of [0, 1]) {
                itemGrid[r][i][cornerIdx] = document.createElement('th');
                itemGrid[r][i][cornerIdx].className = 'corner';
                itemGrid[r][i][cornerIdx].onclick = () => gridItemClick(r, i, cornerIdx);
                tdtr1.appendChild(itemGrid[r][i][cornerIdx]);
            }

            const tdtr2 = document.createElement('tr');
            tdt.appendChild(tdtr2);
            for (let cornerIdx of [2, 3]) {
                itemGrid[r][i][cornerIdx] = document.createElement('th');
                itemGrid[r][i][cornerIdx].className = 'corner';
                itemGrid[r][i][cornerIdx].onclick = () => gridItemClick(r, i, cornerIdx);
                tdtr2.appendChild(itemGrid[r][i][cornerIdx]);
            }
        }

    }
}

function updateGridItem(row, index) {
    const item = itemLayout[row][index];

    itemGrid[row][index]['item'].style.border = '0px';
    itemGrid[row][index]['item'].style.opacity = '';

    if (!item || item === 'blank') {
        itemGrid[row][index]['item'].style.backgroundImage = '';
        return;
    }

    if (typeof trackerData.items[item] === "boolean") {
        itemGrid[row][index]['item'].style.backgroundImage = `url('assets/${item}.png')`;
    } else {
        itemGrid[row][index]['item'].style.backgroundImage = `url('assets/${item}${trackerData.items[item]}.png')`;
    }

    itemGrid[row][index]['item'].className = "griditem " + (!!trackerData.items[item]);

    if (trackerData.medallions[item] !== undefined) {
        if (trackerOptions.showprizes) {
            itemGrid[row][index][3].style.backgroundImage = `url('assets/${dungeonImg[trackerData.medallions[item]]}.png')`;
        } else {
            itemGrid[row][index][3].style.backgroundImage = "";           
        }
    }
}

function updateGridItemAll() {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 7; c++) {
            updateGridItem(r, c);
        }
    }
}

function setGridItem(item, row, index) {
    itemLayout[row][index] = item;
    if (item !== 'blank' && document.getElementById(item)) {
        document.getElementById(item).style.opacity = 0.25;
    }
    updateGridItem(row, index);
}

function initGridRow(itemsets) {
    let r, c;
    let startdraw = false;

    for (r = 7; r >= 0 && !startdraw; r--) {
        if (!itemsets[r] || !itemsets[r].length) {
            itemGrid[r]['row'].style.display = 'none';
        } else {
            for (c = 0; c < 7; c++) {
                if (!!itemsets[r][c] && itemsets[r][c] !== 'blank') {
                    startdraw = true;
                    r++;
                    break;
                }
            }

            if (!startdraw) {
                itemGrid[r]['row'].style.display = 'none';
            }
        }
    }

    for (; r >= 0; r--) {
        itemGrid[r]['row'].style.display = '';

        for (c = 0; c < 7; c++) {
            if (itemsets[r][c]) {
                setGridItem(itemsets[r][c], r, c);
            }
        }
    }
}

function gridItemClick(row, col, corner) {
    const item = itemLayout[row][col];

    if (trackerData.medallions[item] !== undefined && trackerOptions.showprizes) {
        if (corner === 3) {
            let newVal = trackerData.medallions[item] + 1;
            if (newVal >= 9) newVal = 0;
            trackerData.medallions[item] = newVal;
        } else {
            trackerData.items[item] = !trackerData.items[item];
        }
    } else if (typeof trackerData.items[item] === "boolean") {
        trackerData.items[item] = !trackerData.items[item];
    } else {
        let newVal = trackerData.items[item] + 1;
        if (newVal > itemsMax[item]) newVal = itemsMin[item];
        trackerData.items[item] = newVal;
    }

    refreshMap();
    saveState();
}

function updateMap() {
    for (let k = 0; k < chests.length; k++) {
        if (!trackerData.chestsopened[k]) {
            const el = document.getElementById('chest-' + k);
            if (el) {
                const tooltipVisible = el.classList.contains('tooltip-visible');
                el.className = "mapspan chest " + chests[k].isAvailable();
                if (tooltipVisible) el.classList.add('tooltip-visible');
            }
        }
    }
    for (let k = 0; k < dungeons.length; k++) {
        const el = document.getElementById("dungeon" + k);
        if (el) {
            const tooltipVisible = el.classList.contains('tooltip-visible');
            el.className = "mapspan dungeon " + dungeons[k].canGetChest();
            if (tooltipVisible) el.classList.add('tooltip-visible');
            let DCcount = 0;
            for (let key in dungeons[k].chestlist) {
                if (dungeons[k].chestlist.hasOwnProperty(key)) {
                    if (!dungeons[k].chestlist[key].isOpened && dungeons[k].chestlist[key].isAvailable())
                        DCcount++;
                }
            }

            let child = el.firstChild;
            while (child) {
                if (child.className === "chestCount") {
                    child.innerHTML = DCcount === 0 ? "" : DCcount;
                    break;
                }
                child = child.nextSibling;
            }
        }
    }

    const submaparea = document.getElementById('submaparea');
    if (submaparea) {
        submaparea.className = "DC" + dungeons[dungeonSelect].isBeatable();
    }

    const itemlist = document.getElementById('submaplist').children;
    for (let item in itemlist) {
        if (itemlist.hasOwnProperty(item)) {
            const chestObj = dungeons[dungeonSelect].chestlist[itemlist[item].innerHTML];
            if (chestObj) {
                if (chestObj.isOpened) itemlist[item].className = "DCopened";            
                else if (chestObj.isAvailable()) itemlist[item].className = "DCavailable";        
                else itemlist[item].className = "DCunavailable";                
            }
        }
    }
}

function itemConfigClick(sender) {
    const item = sender.id;

    if (trackerOptions.selected.item) {
        document.getElementById(trackerOptions.selected.item).style.border = '0px';
        sender.style.border = '3px solid yellow';
        trackerOptions.selected = { item: item };	
    } else if (trackerOptions.selected.row !== undefined) {
        itemGrid[trackerOptions.selected.row][trackerOptions.selected.col]['item'].style.border = '1px solid white';
        let old = itemLayout[trackerOptions.selected.row][trackerOptions.selected.col];

        if (old === item) {
            trackerOptions.selected = {};
            return;
        }

        if (item !== 'blank') {
            sender.style.opacity = 0.25;
            let found = false;
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 7; c++) {
                    if (itemLayout[r][c] === item) {
                        itemLayout[r][c] = 'blank';
                        updateGridItem(r, c);
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
        }

        itemLayout[trackerOptions.selected.row][trackerOptions.selected.col] = item;
        updateGridItem(trackerOptions.selected.row, trackerOptions.selected.col);

        if (document.getElementById(old)) {
            document.getElementById(old).style.opacity = 1;
        }

        trackerOptions.selected = {};
    } else {
        sender.style.border = '3px solid yellow';
        trackerOptions.selected = { item: item };
    }
}

function populateMapdiv() {
    const mapdiv = document.getElementById('mapdiv');

    for (let k = 0; k < chests.length; k++) {
        let s = document.createElement('span');
        s.style.backgroundImage = 'url(assets/poi.png)';
        s.style.color = 'black';
        s.id = 'chest-' + k;
        s.onclick = () => toggleChest(k);
        s.onpointerdown = toggleLocationTooltip;
        s.onmouseover = () => highlight(k);
        s.onmouseout = () => unhighlight(k);
        s.style.left = chests[k].x;
        s.style.top = chests[k].y;
        s.className = trackerData.chestsopened[k] 
            ? "mapspan chest opened" 
            : "mapspan chest " + chests[k].isAvailable();

        let ss = document.createElement('span');
        ss.className = "tooltip";
        ss.innerHTML = chests[k].name;
        s.appendChild(ss);

        mapdiv.appendChild(s);
    }

    for (let k = 0; k < dungeons.length; k++) {
        let s = document.createElement('span');
        s.style.backgroundImage = 'url(assets/poi.png)';
        s.id = 'dungeon' + k;
        s.onclick = () => clickDungeon(k);
        s.onpointerdown = toggleLocationTooltip;
        s.onmouseover = () => highlightDungeon(k);
        s.onmouseout = () => unhighlightDungeon(k);
        s.style.left = dungeons[k].x;
        s.style.top = dungeons[k].y;
        s.className = "mapspan dungeon " + dungeons[k].canGetChest();

        let DCcount = 0;
        for (let key in dungeons[k].chestlist) {
            if (dungeons[k].chestlist.hasOwnProperty(key)) {
                if (!dungeons[k].chestlist[key].isOpened && dungeons[k].chestlist[key].isAvailable())
                    DCcount++;
            }
        }

        let ss = document.createElement('span');
        ss.className = "chestCount";
        ss.innerHTML = DCcount === 0 ? "" : DCcount;
        ss.style.color = "black";
        s.style.textAlign = "center";
        ss.style.display = "inline-block";
        ss.style.lineHeight = "24px";
        s.appendChild(ss);

        let ss2 = document.createElement('span');
        ss2.className = "tooltipgray";
        ss2.innerHTML = dungeons[k].name;
        s.appendChild(ss2);

        mapdiv.appendChild(s);
    }

    document.getElementById('submaparea').innerHTML = dungeons[dungeonSelect].name;
    document.getElementById('submaparea').className = "DC" + dungeons[dungeonSelect].isBeatable();
    document.getElementById("dungeon" + dungeonSelect).style.backgroundImage = "url(assets/highlighted.png)";

    for (let key in dungeons[dungeonSelect].chestlist) {
        let s = document.createElement('li');
        s.innerHTML = key;

        if (dungeons[dungeonSelect].chestlist[key].isOpened) s.className = "DCopened";               
        else if (dungeons[dungeonSelect].chestlist[key].isAvailable()) s.className = "DCavailable";               
        else s.className = "DCunavailable";               

        s.onclick = () => toggleDungeonChest(s, dungeonSelect, key);
        s.onmouseover = () => s.style.backgroundColor = "#282828";
        s.onmouseout = () => s.style.backgroundColor = "";
        s.style.cursor = "pointer";

        document.getElementById('submaplist').appendChild(s);
    }
}

function populateItemconfig() {
    const grid = document.getElementById('itemconfig');
    let i = 0;
    let row;

    for (let key in trackerData.items) {
        if (i % 10 === 0) {
            row = document.createElement('tr');
            grid.appendChild(row);
        }
        i++;

        let rowitem = document.createElement('td');
        rowitem.className = 'corner';
        rowitem.id = key;
        rowitem.style.backgroundSize = '100% 100%';
        rowitem.onclick = function() { itemConfigClick(this); };

        if (typeof trackerData.items[key] === "boolean") {
            rowitem.style.backgroundImage = `url('assets/${key}.png')`;
        } else {
            rowitem.style.backgroundImage = `url('assets/${key}${itemsMax[key]}.png')`;
        }
        row.appendChild(rowitem);
    }		
}

function refreshMap() {
    updateGridItemAll();
    refreshChests();

    for (let k = 0; k < dungeons.length; k++) {
        const el = document.getElementById("dungeon" + k);
        const tooltipVisible = el.classList.contains('tooltip-visible');
        if (trackerData.dungeonchests[k])
            document.getElementById("dungeon" + k).className = "mapspan dungeon " + dungeons[k].canGetChest();
        else
            document.getElementById("dungeon" + k).className = "mapspan dungeon opened";
        if (tooltipVisible) el.classList.add('tooltip-visible');
    }

    updateMap();
}

function bindEvents() {
    document.addEventListener('pointerdown', (event) => {
        if (!(event.target instanceof Element) || !event.target.closest('.mapspan')) {
            closeLocationTooltips();
        }
    });

    document.getElementById('settingsbutton').onclick = showSettings;
    document.getElementById('btnResetTracker').onclick = async () => {
        if (confirm("Reset all local tracker progress?")) {
            await LocalStorageDB.clear();
            window.location.reload();
        }
    };

    document.getElementById('itemdivsize').oninput = (e) => setZoom('itemdiv', e.target);
    document.getElementById('mapdivsize').oninput = (e) => setZoom('mapdiv', e.target);
    document.getElementById('showmap').onchange = (e) => showTracker('mapdiv', e.target);
    document.getElementById('showprizes').onchange = (e) => showPrizes(e.target);

    document.getElementsByName('mapposition').forEach((el) => {
        el.onclick = () => setOrder(el.value === 'Below');
    });

    document.getElementsByName('ganonlogic').forEach((el) => {
        el.onclick = () => setGanonLogic(el.value);
    });
}

function initNotes() {
    const notesDiv = document.getElementById('notesdiv');
    const notesText = document.getElementById('notestext');
    const notesToggle = document.getElementById('notestoggle');

    // Load notes from localStorage
    const savedNotes = localStorage.getItem('trackerNotes') || '';
    notesText.value = savedNotes;

    // Save notes on input
    notesText.oninput = () => {
        localStorage.setItem('trackerNotes', notesText.value);
    };

    // Toggle collapse/expand
    notesToggle.onclick = (e) => {
        e.stopPropagation();
        notesDiv.classList.toggle('collapsed');
        notesToggle.innerHTML = notesDiv.classList.contains('collapsed') ? '+' : '−';
    };

    // Also allow clicking the header to toggle
    document.querySelector('.notesheader').onclick = () => {
        notesDiv.classList.toggle('collapsed');
        notesToggle.innerHTML = notesDiv.classList.contains('collapsed') ? '+' : '−';
    };
}

window.addEventListener('DOMContentLoaded', async () => {
    createItemTracker(document.getElementById('itemdiv'));
    populateMapdiv();
    populateItemconfig();
    bindEvents();
    initNotes();
    
    await loadState();
});