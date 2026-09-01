var dungeonImg = ['Unknown', 'dungeon1', 'dungeon2', 'dungeon3', 'dungeon4', 'dungeon5', 'dungeon6', 'dungeon7', 'dungeon8']
ganonlogic = 'Open';

var itemGrid = [];
var itemLayout = [];

var dungeonSelect = 0;

var chestsopenedInit = [];
for(var i = 0; i < chests.length; i++) {
    chestsopenedInit.push(false);
}

var trackerOptions = {
  selected: {}
};

var trackerData = {
  items: itemsInit,
  dungeonchests: dungeonchestsInit,
  medallions: medallionsInit,
  chestsopened: chestsopenedInit
};


// Event of clicking a chest on the map
function toggleChest(x){
    rootRef.child('chestsopened').child(x).set(!trackerData.chestsopened[x]);    
}

function refreshChests() {

     for(k=0; k<chests.length; k++){
        if(trackerData.chestsopened[k])
            document.getElementById(k).className = "mapspan chest opened";
        else
            document.getElementById(k).className = "mapspan chest " + chests[k].isAvailable();
     }
}

// Highlights a chest location
function highlight(x){
    document.getElementById(x).style.backgroundImage = "url(assets/highlighted.png)";
}

function unhighlight(x){
    document.getElementById(x).style.backgroundImage = "url(assets/poi.png)";
}

// Highlights a chest location (but for dungeons)
function highlightDungeon(x){
    document.getElementById("dungeon"+x).style.backgroundImage = "url(assets/highlighted.png)";
}

function unhighlightDungeon(x){
    if (dungeonSelect != x)
        document.getElementById("dungeon"+x).style.backgroundImage = "url(assets/poi.png)";
}

function clickDungeon(d){
    document.getElementById("dungeon"+dungeonSelect).style.backgroundImage = "url(assets/poi.png)";
    dungeonSelect = d;
    document.getElementById("dungeon"+dungeonSelect).style.backgroundImage = "url(assets/highlighted.png)";

    document.getElementById('submaparea').innerHTML = dungeons[dungeonSelect].name;
    document.getElementById('submaparea').className = "DC" + dungeons[dungeonSelect].isBeatable();
    var DClist = document.getElementById('submaplist');
    DClist.innerHTML = ""

    for (var key in dungeons[dungeonSelect].chestlist) {
        var s = document.createElement('li');
        s.innerHTML = key

        if ( dungeons[dungeonSelect].chestlist[key].isOpened)
            s.className = "DCopened";               
        else if ( dungeons[dungeonSelect].chestlist[key].isAvailable())
            s.className = "DCavailable";               
        else
            s.className = "DCunavailable";               

        s.onclick = new Function('toggleDungeonChest(this,'+dungeonSelect+',"'+key+'")');
        s.onmouseover = new Function('highlightDungeonChest(this)');
        s.onmouseout = new Function('unhighlightDungeonChest(this)');
        s.style.cursor = "pointer";

        DClist.appendChild(s)
    }
}

function toggleDungeonChest(sender, d, c){
    dungeons[d].chestlist[c].isOpened = !dungeons[d].chestlist[c].isOpened;
    if(dungeons[d].chestlist[c].isOpened)
        sender.className = "DCopened";
    else if(dungeons[d].chestlist[c].isAvailable())
        sender.className = "DCavailable";     
    else
        sender.className = "DCunavailable";

    updateMap();
}

function highlightDungeonChest(x){
    x.style.backgroundColor = "#282828"
}

function unhighlightDungeonChest(x){
    x.style.backgroundColor = ""
}

function setOrder(H) {
    if (H) {
        document.getElementById('layoutdiv').classList.remove('flexcontainer');
    } 
    else {
        document.getElementById('layoutdiv').classList.add('flexcontainer');
    }
    saveCookie();
}

function showPrizes(sender) {
    trackerOptions.showprizes = sender.checked;
    updateGridItemAll();
    saveCookie();
}

function setGanonLogic(sender) {
    ganonlogic = sender.value;
    updateMap();
    saveCookie();
}

function setZoom(target, sender) {
    document.getElementById(target).style.zoom = sender.value / 100;
    document.getElementById(target).style.zoom = sender.value / 100;

    document.getElementById(target).style.MozTransform = "scale(" + (sender.value / 100) + ")";
    document.getElementById(target).style.MozTransformOrigin = "0 0";

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveCookie();
}


function showTracker(target, sender) {
    if (sender.checked) {
        document.getElementById(target).style.display = '';
    }
    else {
        document.getElementById(target).style.display = 'none';
    }
}

function clickRowButton(row) {
    if (itemLayout[row].length % 2 == 0) {
        itemGrid[row]['button'].innerHTML = '-';
        itemGrid[row]['button'].style.backgroundColor = 'red';
        itemGrid[row][6]['item'].style.display = '';
        itemGrid[row]['half'].style.display = 'none';	
        itemLayout[row][6] = 'blank';
    } else {
        itemGrid[row]['button'].innerHTML = '+';
        itemGrid[row]['button'].style.backgroundColor = 'green';
        itemGrid[row][6]['item'].style.display = 'none';
        itemGrid[row]['half'].style.display = '';	
        document.getElementById(itemLayout[row][6]).style.opacity = 1;
        itemLayout[row].splice(-1, 1);
    }
    updateGridItem(row, 6);
}


function createItemTracker(sender) {
    var r;
    for (r = 0; r < 8; r++) {
        itemGrid[r] = [];
        itemLayout[r] = [];

        itemGrid[r]['row'] = document.createElement('table');
        itemGrid[r]['row'].className = 'tracker';
        sender.appendChild(itemGrid[r]['row']);

        var tr = document.createElement('tr');
        itemGrid[r]['row'].appendChild(tr);

        itemGrid[r]['half'] = document.createElement('td');
        itemGrid[r]['half'].className = 'halfcell';
        tr.appendChild(itemGrid[r]['half']);

        var i;
        for (i = 0; i < 7; i++) {	
            itemGrid[r][i] = [];
            itemLayout[r][i] = 'blank';

            itemGrid[r][i]['item'] = document.createElement('td');
            itemGrid[r][i]['item'].className = 'griditem';
            tr.appendChild(itemGrid[r][i]['item']);

            var tdt = document.createElement('table');
            tdt.className = 'lonk';
            itemGrid[r][i]['item'].appendChild(tdt);

                var tdtr1 = document.createElement('tr');
                tdt.appendChild(tdtr1);
                    itemGrid[r][i][0] = document.createElement('th');
                    itemGrid[r][i][0].className = 'corner';
                    itemGrid[r][i][0].onclick = new Function("gridItemClick("+r+","+i+",0)");
                    tdtr1.appendChild(itemGrid[r][i][0]);
                    itemGrid[r][i][1] = document.createElement('th');
                    itemGrid[r][i][1].className = 'corner';
                    itemGrid[r][i][1].onclick = new Function("gridItemClick("+r+","+i+",1)");
                    tdtr1.appendChild(itemGrid[r][i][1]);
                var tdtr2 = document.createElement('tr');
                tdt.appendChild(tdtr2);
                    itemGrid[r][i][2] = document.createElement('th');
                    itemGrid[r][i][2].className = 'corner';
                    itemGrid[r][i][2].onclick = new Function("gridItemClick("+r+","+i+",2)");
                    tdtr2.appendChild(itemGrid[r][i][2]);
                    itemGrid[r][i][3] = document.createElement('th');
                    itemGrid[r][i][3].className = 'corner';
                    itemGrid[r][i][3].onclick = new Function("gridItemClick("+r+","+i+",3)");
                    tdtr2.appendChild(itemGrid[r][i][3]);
        }

        var half = document.createElement('td');
        half.className = 'halfcell';
        tr.appendChild(half);
        itemGrid[r]['button'] = document.createElement('button');
        itemGrid[r]['button'].innerHTML = '-';
        itemGrid[r]['button'].style.backgroundColor = 'red';		
        itemGrid[r]['button'].style.color = 'white';	
        itemGrid[r]['button'].onclick = new Function("clickRowButton(" + r + ")");;
        half.appendChild(itemGrid[r]['button']);
    }
}

function updateGridItem(row, index) {
    var item = itemLayout[row][index];

    itemGrid[row][index]['item'].style.border = '0px';
    itemGrid[row][index]['item'].style.opacity = '';

    if (!item || item == 'blank') {
        itemGrid[row][index]['item'].style.backgroundImage = '';
        return;
    }

    if((typeof trackerData.items[item]) == "boolean"){
        itemGrid[row][index]['item'].style.backgroundImage = "url(assets/" + item + ".png)";
    }
    else{
        itemGrid[row][index]['item'].style.backgroundImage = "url(assets/" + item + trackerData.items[item] + ".png)";
    }

    itemGrid[row][index]['item'].className = "griditem " + (!!trackerData.items[item]);

    if (trackerData.medallions[item] !== undefined){
        if (trackerOptions.showprizes)
            itemGrid[row][index][3].style.backgroundImage = "url(assets/" + dungeonImg[trackerData.medallions[item]] + ".png)";
        else
            itemGrid[row][index][3].style.backgroundImage = "";           
    }
}

function updateGridItemAll() {
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 7; c++) {
            updateGridItem(r, c);
        }
    }
}

function setGridItem(item, row, index) {
    var previtem = itemLayout[row][index];
    itemLayout[row][index] = item;
    if (item != 'blank')
        document.getElementById(item).style.opacity = 0.25;
    updateGridItem(row, index)
}

function initGridRow(itemsets) {

    var r, c;
    var startdraw = false;
    for (r = 7; r >= 0 && !startdraw; r--) {
        if (!itemsets[r] || !itemsets[r].length) {
            itemGrid[r]['row'].style.display = 'none';
            itemGrid[r]['half'].style.display = 'none';
        } else {
            for (c = 0; c < 8; c++) {
                if (!!itemsets[r][c] && itemsets[r][c] != 'blank') {
                    startdraw = true;
                    r++;
                    break;
                }
            }	

            if (!startdraw) {
                itemGrid[r]['row'].style.display = 'none';
                itemGrid[r]['half'].style.display = 'none';
            }			
        }
    }

    for (; r >= 0; r--) {
        itemGrid[r]['row'].style.display = '';	

        if (itemsets[r].length % 2 != 0) {
            itemGrid[r]['half'].style.display = 'none';
            itemGrid[r][6]['item'].style.display = '';
        } else {
            clickRowButton(r);
        }
        itemGrid[r]['button'].style.display = 'none';

        for (c = 0; c < 7; c++) {
            if (itemsets[r][c]) {
                setGridItem(itemsets[r][c], r, c);
            } 
        }
    }
}

function gridItemClick(row, col, corner) {
    var item = itemLayout[row][col];

    if((typeof trackerData.items[item]) == "boolean"){
        rootRef.child('items').child(item).set(!trackerData.items[item]);
    }
    else{
        var newVal = trackerData.items[item] + 1;
        if(newVal > itemsMax[item]){
            newVal = itemsMin[item];
        }

        rootRef.child('items').child(item).set(newVal);
    }
}

function updateMap() {
    for(k=0; k<chests.length; k++){
        if(!trackerData.chestsopened[k])
            document.getElementById(k).className = "mapspan chest " + chests[k].isAvailable();
    }
    for(k=0; k<dungeons.length; k++){
        document.getElementById("dungeon"+k).className = "mapspan dungeon " + dungeons[k].canGetChest();

        var DCcount = 0;
        for (var key in dungeons[k].chestlist) {
            if (dungeons[k].chestlist.hasOwnProperty(key)) {
                if (!dungeons[k].chestlist[key].isOpened && dungeons[k].chestlist[key].isAvailable())
                    DCcount++;
            }
        }

        var child = document.getElementById("dungeon"+k).firstChild;
        while (child) {
            if (child.className == "chestCount") {
                if (DCcount == 0)
                    child.innerHTML = "";
                else
                    child.innerHTML = DCcount;
                break;
            }
            child = child.nextSibling;
        }
    }

    document.getElementById('submaparea').className = "DC" + dungeons[dungeonSelect].isBeatable();
    var itemlist = document.getElementById('submaplist').children
    for (var item in itemlist) {
        if (itemlist.hasOwnProperty(item)) {
            if ( dungeons[dungeonSelect].chestlist[itemlist[item].innerHTML].isOpened)
                itemlist[item].className = "DCopened";            
            else if ( dungeons[dungeonSelect].chestlist[itemlist[item].innerHTML].isAvailable())
                itemlist[item].className = "DCavailable";        
            else
                itemlist[item].className = "DCunavailable";                
        }
    }
}

function itemConfigClick (sender) {
    var item = sender.id;

    if (trackerOptions.selected.item) {
        document.getElementById(trackerOptions.selected.item).style.border = '0px';
        sender.style.border = '3px solid yellow';
        trackerOptions.selected = {item:item};	
    } else if (trackerOptions.selected.row !== undefined) {
        itemGrid[trackerOptions.selected.row][trackerOptions.selected.col]['item'].style.border = '1px solid white';
        var old = itemLayout[trackerOptions.selected.row][trackerOptions.selected.col];

        if (old == item) {
            trackerOptions.selected = {};
            return;
        }

        if (item != 'blank') {
            sender.style.opacity = 0.25;

            var r,c;
            var found = false;
            for (r = 0; r < 8; r++) {
                for (c = 0; c < 7; c++) {
                    if (itemLayout[r][c] == item) {
                        itemLayout[r][c] = 'blank';
                        updateGridItem(r, c);
                        found = true;
                        break;
                    }
                }

                if (found)
                    break;
            }
        }

        itemLayout[trackerOptions.selected.row][trackerOptions.selected.col] = item;
        updateGridItem(trackerOptions.selected.row, trackerOptions.selected.col);

        document.getElementById(old).style.opacity = 1;

        trackerOptions.selected = {};
    } else {
        sender.style.border = '3px solid yellow';
        trackerOptions.selected = {item:item}
    }
}

function populateMapdiv() {
    var mapdiv = document.getElementById('mapdiv');

    // Initialize all chests on the map
    for(k=0; k<chests.length; k++){
        var s = document.createElement('span');
        s.style.backgroundImage = 'url(assets/poi.png)';
        s.style.color = 'black';
        s.id = k;
        s.onclick = new Function('toggleChest('+k+')');
        s.onmouseover = new Function('highlight('+k+')');
        s.onmouseout = new Function('unhighlight('+k+')');
        s.style.left = chests[k].x;
        s.style.top = chests[k].y;
        if(trackerData.chestsopened[k])
            s.className = "mapspan chest opened";
        else
            s.className = "mapspan chest " + chests[k].isAvailable();

        var ss = document.createElement('span');
        ss.className = "tooltip";
        ss.innerHTML = chests[k].name;
        s.appendChild(ss);

        mapdiv.appendChild(s);
    }

    // Dungeon bosses & chests
    for(k=0; k<dungeons.length; k++){
        s = document.createElement('span');
        s.style.backgroundImage = 'url(poi.png)';
        s.id = 'dungeon' + k;

        s.onclick = new Function('clickDungeon('+k+')');
        s.onmouseover = new Function('highlightDungeon('+k+')');
        s.onmouseout = new Function('unhighlightDungeon('+k+')');
        s.style.left = dungeons[k].x;
        s.style.top = dungeons[k].y;
        s.className = "mapspan dungeon " + dungeons[k].canGetChest();

        var DCcount = 0;
        for (var key in dungeons[k].chestlist) {
            if (dungeons[k].chestlist.hasOwnProperty(key)) {
                if (!dungeons[k].chestlist[key].isOpened && dungeons[k].chestlist[key].isAvailable())
                    DCcount++;
            }
        }

        var ss = document.createElement('span');
        ss.className = "chestCount";
        if (DCcount == 0)
            ss.innerHTML = "";
        else
            ss.innerHTML = DCcount;
        ss.style.color = "black"
        s.style.textAlign = "center";
        ss.display = "inline-block";
        ss.style.lineHeight = "24px";
        s.appendChild(ss);

        var ss = document.createElement('span');
        ss.className = "tooltipgray";
        ss.innerHTML = dungeons[k].name;
        s.appendChild(ss);

        mapdiv.appendChild(s);
    }

    document.getElementById('submaparea').innerHTML = dungeons[dungeonSelect].name;
    document.getElementById('submaparea').className = "DC" + dungeons[dungeonSelect].isBeatable();
    document.getElementById("dungeon"+dungeonSelect).style.backgroundImage = "url(assets/highlighted.png)";
    for (var key in dungeons[dungeonSelect].chestlist) {
        var s = document.createElement('li');
        s.innerHTML = key

        if ( dungeons[dungeonSelect].chestlist[key].isOpened)
            s.className = "DCopened";               
        else if ( dungeons[dungeonSelect].chestlist[key].isAvailable())
            s.className = "DCavailable";               
        else
            s.className = "DCunavailable";               

        s.onclick = new Function('toggleDungeonChest(this,'+dungeonSelect+',"'+key+'")');
        s.onmouseover = new Function('highlightDungeonChest(this)');
        s.onmouseout = new Function('unhighlightDungeonChest(this)');
        s.style.cursor = "pointer";

        document.getElementById('submaplist').appendChild(s)
    }
}

function populateItemconfig() {
    var grid = document.getElementById('itemconfig');

    var i = 0;

    var row;

    for (var key in trackerData.items) {
        if (i % 10 == 0){
            row = document.createElement('tr');
            grid.appendChild(row);
        }
        i++;

        var rowitem = document.createElement('td');
        rowitem.className = 'corner';
        rowitem.id = key;
        rowitem.style.backgroundSize = '100% 100%';
        rowitem.onclick = new Function('itemConfigClick(this)');
        if((typeof trackerData.items[key]) == "boolean"){
            rowitem.style.backgroundImage = "url(assets/" + key + ".png)";
        }
        else{
            rowitem.style.backgroundImage = "url(assets/" + key + itemsMax[key] + ".png)";
        }
        row.appendChild(rowitem);
    }		
}

function isBridgeOpen() {
    switch (ganonlogic) {
        case "Open":
            return true;
        case "Vanilla":
            return (trackerData.items['ShadowMedallion'] && trackerData.items['SpiritMedallion']);
        case "medallions":
            return (trackerData.items['ForestMedallion'] && trackerData.items['FireMedallion'] && 
                trackerData.items['WaterMedallion'] && trackerData.items['LightMedallion'] && 
                trackerData.items['ShadowMedallion'] && trackerData.items['SpiritMedallion']);
        case "Dungeons":
            return (trackerData.items['KokiriEmerald'] && trackerData.items['GoronRuby'] && trackerData.items['ZoraSapphire'] && 
                trackerData.items['ForestMedallion'] && trackerData.items['FireMedallion'] && 
                trackerData.items['WaterMedallion'] && trackerData.items['LightMedallion'] && 
                trackerData.items['ShadowMedallion'] && trackerData.items['SpiritMedallion']);
    }
    return false;
}


function initTracker() {
    createItemTracker(document.getElementById('itemdiv'));
    populateMapdiv();
    populateItemconfig();

    loadCookie();
    saveCookie(); //maybe delete

    window.document.title = roomid + " - " + window.document.title;

    rootRef.child('items').on('value', function(snapshot) {
        trackerData.items = snapshot.val();
        updateAll();
    });
    rootRef.child('dungeonchests').on('value', function(snapshot) {
        trackerData.dungeonchests = snapshot.val();
        updateAll();
    });
    rootRef.child('medallions').on('value', function(snapshot) {
        trackerData.medallions = snapshot.val();
        updateAll();
    });
    rootRef.child('chestsopened').on('value', function(snapshot) {
        trackerData.chestsopened = snapshot.val();
        updateAll();
    });

}

function updateAll() {
    if(trackerData.items && trackerData.dungeonchests && trackerData.medallions && trackerData.chestsopened) {
      refreshMap();
    }
}

function refreshMap() {
  updateGridItemAll();
  refreshChests();

  for(k=0; k<dungeons.length; k++){
      if(trackerData.dungeonchests[k])
          document.getElementById("dungeon"+k).className = "mapspan dungeon " + dungeons[k].canGetChest();
      else
          document.getElementById("dungeon"+k).className = "mapspan dungeon opened";
  }

  updateMap();
}

function preloader() {
    for (item in trackerData.items) {
        if((typeof trackerData.items[item]) == "boolean") {
            var img = new Image();
            img.src = "assets/" + item + ".png";
        }
        else{
            for (i = itemsMin[item]; i < itemsMax[item]; i++) {
                var img = new Image();
                img.src = "assets/" + item + i + ".png";
            }
        }
    }

    for (medallion in dungeonImg) {
        var img = new Image();
        img.src = "assets/" + dungeonImg[medallion] + ".png";
    }
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);