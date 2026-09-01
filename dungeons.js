function generalCanGetChest(chestlist) {
    let canGet = 0;
    let unopened = 0;
    for (let key in chestlist) {
        if (chestlist.hasOwnProperty(key)) {
            if (!chestlist[key].isOpened) unopened++;
            if (!chestlist[key].isOpened && chestlist[key].isAvailable()) canGet++;
        }
    }
    if (unopened === 0) return "opened";
    if (canGet === unopened) return "available";
    if (canGet === 0) return "unavailable";
    return "possible";
}

var dungeons = [
    {
        name: "Deku Tree", x: "87.0%", y: "57.0%",
        chestlist: {
            'Lobby Chest': { isAvailable: () => true },
            'Compass Chest': { isAvailable: () => true },
            'Compass Room Side Chest': { isAvailable: () => true },
            'Basement Chest': { isAvailable: () => true },
            'Slingshot Chest': { isAvailable: () => true },
            'Slingshot Room Side Chest': { isAvailable: () => true },
            'Gohma': { isAvailable: () => trackerData.items.Slingshot }
        },
        isBeatable: function() {
            if(trackerData.items.Slingshot) {
                return this.canGetChest() === 'available' ? 'available' : 'possible';
            }
            return "unavailable";
        },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Water Temple", x: "36.1%", y: "91.0%",
        chestlist: {
            'Map Chest': { isAvailable: () => trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot },
            'Compass Chest': { isAvailable: () => trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot },
            'Torches Chest': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && (trackerData.items.Bow || (trackerData.items.Dins && trackerData.items.Magic)) && trackerData.items.ZeldasLullaby },
            'Dragon Chest': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.ZeldasLullaby && trackerData.items.SongofTime && trackerData.items.Bow },
            'Central Bow Target Chest': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.Bow && trackerData.items.Glove && trackerData.items.ZeldasLullaby && (trackerData.items.HoverBoots || trackerData.items.Hookshot >= 2) },
            'Boss Key Chest': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.ZeldasLullaby && ((trackerData.items.Bombs && trackerData.items.Glove) || trackerData.items.HoverBoots) && trackerData.items.Hookshot >= 2 },
            'Central Pillar Chest': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.ZeldasLullaby },
            'Cracked Wall Chest': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.Bombs && trackerData.items.ZeldasLullaby },
            'Dark Link Chest': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.ZeldasLullaby },
            'River Chest': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.SongofTime && trackerData.items.Bow && trackerData.items.ZeldasLullaby },
            'Morpha': { isAvailable: () => (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot >= 2) }
        },
        isBeatable: function() {
            if(trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot >= 2) {
                return this.canGetChest() === 'available' ? 'available' : 'possible';
            }
            return "unavailable";
        },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Gerudo Training Grounds", x: "18.8%", y: "28.0%",
        chestlist: {
            'Lobby Left Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Bow },
            'Lobby Right Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Bow },
            'Stalfos Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && (trackerData.items.Bow || trackerData.items.Hookshot || trackerData.items.HoverBoots) },
            'Beamos Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && (trackerData.items.Bow || trackerData.items.Hookshot || trackerData.items.HoverBoots) && trackerData.items.Bombs },
            'Hidden Ceiling Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && (trackerData.items.Bow || trackerData.items.Hookshot) && trackerData.items.Lens && trackerData.items.Magic },
            'Maze Path First Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow },
            'Maze Path Second Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow },
            'Maze Path Third Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow },
            'Maze Path Final Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow },
            'Maze Right Central Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow },
            'Maze Right Side Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow },
            'Maze Right Side Key': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow },
            'Underwater Silver Rupee Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.SongofTime && trackerData.items.IronBoots },
            ['Hammer Room Clear Chest']: { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && (trackerData.items.SongofTime || trackerData.items.HoverBoots || trackerData.items.Hookshot >=2 || (trackerData.items.Lens && trackerData.items.Magic)) },
            ['Hammer Room Switch Chest']: { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Hammer && (trackerData.items.SongofTime || trackerData.items.HoverBoots || trackerData.items.Hookshot >=2 || (trackerData.items.Lens && trackerData.items.Magic)) },
            'Eye Statue Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Bow && (trackerData.items.SongofTime || trackerData.items.HoverBoots || trackerData.items.Hookshot >=2 || (trackerData.items.Lens && trackerData.items.Magic)) },
            'Near Scarecrow Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Lens && trackerData.items.Magic },
            'Before Heavy Block Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot },
            'Heavy Block First Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic },
            'Heavy Block Second Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic },
            'Heavy Block Third Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic },
            'Heavy Block Fourth Chest': { isAvailable: () => (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Spirit Temple", x: "02.5%", y: "17.0%",
        chestlist: {
            'Child Left Chest': { isAvailable: () => trackerData.items.RequiemofSpirit && (trackerData.items.Boomerang || trackerData.items.Slingshot) },
            'Child Right Chest': { isAvailable: () => trackerData.items.RequiemofSpirit && (trackerData.items.Boomerang || trackerData.items.Slingshot) },
            'Compass Chest': { isAvailable: () => ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && trackerData.items.Hookshot && trackerData.items.ZeldasLullaby },
            'Early Adult Right Chest': { isAvailable: () => ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && (trackerData.items.Bow || trackerData.items.Hookshot || trackerData.items.Bombs) },
            'First Mirror Right Chest': { isAvailable: () => ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 },
            'First Mirror Left Chest': { isAvailable: () => ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 },
            'Map Chest': { isAvailable: () => ((trackerData.items.RequiemofSpirit && trackerData.items.Bombs) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2)) && trackerData.items.Magic && (trackerData.items.Dins || (trackerData.items.Fire && trackerData.items.Bow && trackerData.items.Glove >= 2)) },
            'Child Climb East Chest': { isAvailable: () => ((trackerData.items.RequiemofSpirit && (trackerData.items.Boomerang || trackerData.items.Slingshot)) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && (trackerData.items.Hookshot || trackerData.items.Bow))) },
            'Child Climb North Chest': { isAvailable: () => ((trackerData.items.RequiemofSpirit && (trackerData.items.Boomerang || trackerData.items.Slingshot)) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && (trackerData.items.Hookshot || trackerData.items.Bow))) },
            'Sun Block Room Chest': { isAvailable: () => ((trackerData.items.RequiemofSpirit && trackerData.items.Bombs) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.Glove >= 2 && (trackerData.items.Dins || (trackerData.items.Fire && trackerData.items.Bow)) && trackerData.items.Magic)) },
            'Statue Hand Chest': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.ZeldasLullaby },
            'NE Main Room Chest': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.ZeldasLullaby && trackerData.items.Hookshot },
            'Silver Gauntlets Chest': { isAvailable: () => (trackerData.items.RequiemofSpirit && trackerData.items.Bombs) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) },
            'Mirror Shield Chest': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) },
            'Near Four Armos Chest': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.MirrorShield },
            'Hallway Left Invisible Chest': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.Magic && trackerData.items.Lens },
            'Hallway Right Invisible Chest': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.Magic && trackerData.items.Lens },
            'Boss Key Chest': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.ZeldasLullaby && trackerData.items.Bow && trackerData.items.Hookshot && (trackerData.items.Bombs || trackerData.items.Hammer) },
            'Topmost Chest': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && (trackerData.items.Hookshot || trackerData.items.Bow || trackerData.items.Bombs) && trackerData.items.MirrorShield },
            'Twinrova': { isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && trackerData.items.MirrorShield && trackerData.items.Bombs && trackerData.items.Hookshot) }
        },
        isBeatable: function() {
            if(((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && trackerData.items.MirrorShield && trackerData.items.Bombs && trackerData.items.Hookshot) {
                return this.canGetChest() === 'available' ? 'available' : 'possible';
            }
            return "unavailable";
        },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Bottom of the Well", x: "68.0%", y: "23.0%",
        chestlist: {
            'Front Left Hidden Wall': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic },
            'Front Center Bombable': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Bombs },
            'Right Bottom Hidden Wall': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic },
            'Center Large Chest': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic },
            'Center Small Chest': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic },
            'Back Left Bombable': { isAvailable: () => trackerData.items.SongofStorms && (trackerData.items.ZeldasLullaby || trackerData.items.Scale) },
            'Coffin Key': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Bombs },
            'Defeat Boss': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.ZeldasLullaby && trackerData.items.KokiriSword },
            'Invisible Chest': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.ZeldasLullaby && trackerData.items.Lens && trackerData.items.Magic },
            'Underwater Front Chest': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.ZeldasLullaby },
            'Underwater Left Chest': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.ZeldasLullaby },
            'Basement Chest': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Bombs },
            'Locked Pits': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic },
            'Behind Right Grate': { isAvailable: () => trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Shadow Temple", x: "76.0%", y: "21.0%",
        chestlist: {
            'Map Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && (trackerData.items.HoverBoots || trackerData.items.Hookshot) },
            'Hover Boots Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && (trackerData.items.HoverBoots || trackerData.items.Hookshot) },
            'Compass Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots },
            'Early Silver Rupee Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots },
            'Invisible Blades Visible Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs },
            'Invisible Blades Invisible Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs },
            'Falling Spikes Lower Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs },
            'Falling Spikes Upper Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Glove },
            'Falling Spikes Switch Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Glove },
            'Invisible Spikes Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs },
            'Giant Pot Key': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot },
            'Wind Hint Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot },
            'After Wind Enemy Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot },
            'After Wind Hidden Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot },
            'Spike Walls Left Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby },
            'Boss Key Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby },
            'Hidden Floormaster Chest': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby },
            'Bongo Bongo': { isAvailable: () => trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby && trackerData.items.Bow }
        },
        isBeatable: function() {
            if(trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby && trackerData.items.Bow) {
                return this.canGetChest() === 'available' ? 'available' : 'possible';
            }
            return "unavailable";
        },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Dodongo's Cavern", x: "59.0%", y: "13.5%",
        chestlist: {
            'Map Chest': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove },
            'Compass Chest': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove },
            'Bomb Flower Platform': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove },
            'Bomb Bag Chest': { isAvailable: () => (trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove) && (trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) },
            'End of Bridge Chest': { isAvailable: () => (trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) && (trackerData.items.Bombs || ((trackerData.items.Bow || trackerData.items.HoverBoots) && trackerData.items.Hammer)) },
            'Chest Above King Dodongo': { isAvailable: () => (trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) && trackerData.items.Bombs },
            'King Dodongo': { isAvailable: () => (trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) && trackerData.items.Bombs }
        },
        isBeatable: function() {
            if((trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) && trackerData.items.Bombs) {
                return this.canGetChest() === 'available' ? 'available' : 'possible';
            }
            return "unavailable";
        },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Fire Temple", x: "68.0%", y: "06.5%",
        chestlist: {
            'Chest Near Boss': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) },
            'Fire Dancer Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Hammer },
            'Boss Key Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Hammer },
            'Big Lava Room Bombable Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.ZeldasLullaby && trackerData.items.Bombs },
            'Big Lava Room Open Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) },
            'Boulder Maze Lower Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) },
            'Boulder Maze Upper Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) },
            'Boulder Maze Side Room': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) },
            'Boulder Maze Bombable Pit': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && trackerData.items.Bombs },
            'Scarecrow Chest': { isAvailable: () => trackerData.items.GoronTunic && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) && trackerData.items.Hookshot },
            'Map Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) },
            'Compass Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) },
            'Highest Goron Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) && trackerData.items.SongofTime && trackerData.items.Hammer },
            'Megaton Hammer Chest': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && trackerData.items.Bombs },
            'Volvagia': { isAvailable: () => trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Hammer && (trackerData.items.HoverBoots || (trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) && (trackerData.items.SongofTime || trackerData.items.Bombs))) }
        },
        isBeatable: function() {
            if(trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Hammer && (trackerData.items.HoverBoots || (trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) && (trackerData.items.SongofTime || trackerData.items.Bombs)))) {
                return this.canGetChest() === 'available' ? 'available' : 'possible';
            }
            return "unavailable";
        },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Jabu Jabu's Belly", x: "91.5%", y: "21.0%",
        chestlist: {
            'Boomerang Chest': { isAvailable: () => ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && (trackerData.items.Slingshot || trackerData.items.Bombs || trackerData.items.Boomerang) },
            'Map Chest': { isAvailable: () => ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && trackerData.items.Boomerang },
            'Compass Chest': { isAvailable: () => ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && trackerData.items.Boomerang },
            'Barinade': { isAvailable: () => ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && trackerData.items.Boomerang }
        },
        isBeatable: function() {
            if(((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && trackerData.items.Boomerang) {
                return this.canGetChest() === 'available' ? 'available' : 'possible';
            }
            return "unavailable";
        },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Ice Cavern", x: "90.5%", y: "16.0%",
        chestlist: {
            'Map Chest': { isAvailable: () => (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle },
            'Compass Chest': { isAvailable: () => (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle },
            'Heart Piece': { isAvailable: () => (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle },
            'Iron Boots Chest': { isAvailable: () => (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle },
            'Sheik in Ice Cavern': { isAvailable: () => (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Forest Temple", x: "78.5%", y: "39.0%",
        chestlist: {
            'First Chest': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot },
            'Chest Behind Lobby': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot },
            'Well Chest': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot },
            'Map Chest': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot },
            'Outside Hookshot Chest': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot },
            'Falling Room Chest': { isAvailable: () => ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && (trackerData.items.Bow || (trackerData.items.Dins && trackerData.items.Magic)) },
            'Block Push Chest': { isAvailable: () => ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && trackerData.items.Bow },
            'Boss Key Chest': { isAvailable: () => ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && trackerData.items.Bow },
            'Floormaster Chest': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot },
            'Bow Chest': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot },
            'Red Poe Chest': { isAvailable: () => ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && trackerData.items.Bow },
            'Blue Poe Chest': { isAvailable: () => ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && trackerData.items.Bow },
            'Near Boss Chest': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot && trackerData.items.Bow },
            'Phantom Ganon': { isAvailable: () => (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot && trackerData.items.Bow }
        },
        isBeatable: function() {
            if((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot && trackerData.items.Bow) {
                return this.canGetChest() === 'available' ? 'available' : 'possible';
            }
            return "unavailable";
        },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Ganon's Castle", x: "52.0%", y: "10.0%",
        chestlist: {
            'Forest Trial Chest': { isAvailable: () => isBridgeOpen() },
            'Water Trial Left Chest': { isAvailable: () => isBridgeOpen() },
            'Water Trial Right Chest': { isAvailable: () => isBridgeOpen() },
            'Shadow Trial First Chest': { isAvailable: () => isBridgeOpen() && ((trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Fire) || trackerData.items.Hookshot >= 2) },
            'Shadow Trial Second Chest': { isAvailable: () => isBridgeOpen() && ((trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Fire) || (trackerData.items.Hookshot >= 2 && trackerData.items.HoverBoots)) },
            'Spirit Trial First Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Hookshot && (trackerData.items.Magic || trackerData.items.Bombs) },
            'Spirit Trial Second Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Hookshot && trackerData.items.Magic && trackerData.items.Bombs && trackerData.items.Lens },
            'Light Trial First Left Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 },
            'Light Trial Second Left Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 },
            'Light Trial Third Left Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 },
            'Light Trial First Right Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 },
            'Light Trial Second Right Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 },
            'Light Trial Third Right Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 },
            'Light Trail Invisible Enemies Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 && (trackerData.items.Magic && trackerData.items.Lens) },
            'Light Trial Lullaby Chest': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 && trackerData.items.ZeldasLullaby }
        },
        trials: {
            'Forest Trial Clear': { isAvailable: () => isBridgeOpen() && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light && (trackerData.items.Fire || (trackerData.items.Hookshot && trackerData.items.Dins)) },
            'Fire Trial Clear': { isAvailable: () => isBridgeOpen() && trackerData.items.GoronTunic && trackerData.items.Glove >= 3 && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light && trackerData.items.Hookshot >= 2 },
            'Water Trial Clear': { isAvailable: () => isBridgeOpen() && trackerData.items.Bottle && trackerData.items.Hammer && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light },
            'Shadow Trial Clear': { isAvailable: () => isBridgeOpen() && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light && trackerData.items.Hammer && (trackerData.items.Fire || trackerData.items.Hookshot >= 2) && (trackerData.items.Lens || (trackerData.items.HoverBoots && trackerData.items.Hookshot >= 2)) },
            'Spirit Trial Clear': { isAvailable: () => isBridgeOpen() && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light && trackerData.items.MirrorShield && trackerData.items.Bombs && trackerData.items.Hookshot },
            'Light Trial Clear': { isAvailable: () => isBridgeOpen() && trackerData.items.Glove >= 3 && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Hookshot && trackerData.items.Light }
        },
        isBeatable: function() { return generalCanGetChest(this.trials); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Castle Town", x: "52.0%", y: "20.0%",
        chestlist: {
            "Zelda's Lullaby": { isAvailable: () => true },
            'Child Shooting Gallery': { isAvailable: () => true },
            'Bombchu Bowling 1': { isAvailable: () => trackerData.items.Bombs },
            'Bombchu Bowling 2': { isAvailable: () => trackerData.items.Bombs },
            'Treasure Chest Game': { isAvailable: () => trackerData.items.Lens && trackerData.items.Magic },
            'Dog Lady': { isAvailable: () => true },
            '10 Big Poes': { isAvailable: () => trackerData.items.Bow && trackerData.items.EponasSong && trackerData.items.Bottle },
            'Hyrule Castle Fairy': { isAvailable: () => trackerData.items.Bombs && trackerData.items.ZeldasLullaby },
            "Ganon's Castle Fairy": { isAvailable: () => trackerData.items.Glove >= 3 && trackerData.items.ZeldasLullaby },
            'Prelude of Light': { isAvailable: () => trackerData.items.ForestMedallion },
            'Light Arrows': { isAvailable: () => trackerData.items.ShadowMedallion && trackerData.items.SpiritMedallion }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Kakariko Village", x: "65.0%", y: "24.0%",
        chestlist: {
            'Anju as Adult': { isAvailable: () => true },
            "Anju's Chickens": { isAvailable: () => true },
            'Kakariko Grotto Chest': { isAvailable: () => true },
            'Kakariko Redead Grotto Chest': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer },
            'Cow Heart Piece': { isAvailable: () => true },
            'Man on Roof': { isAvailable: () => trackerData.items.Hookshot },
            'Adult Shooting Gallery': { isAvailable: () => trackerData.items.Bow },
            'Song of Storms': { isAvailable: () => true },
            'Windmill Heart Piece': { isAvailable: () => trackerData.items.SongofTime || trackerData.items.Boomerang },
            'Dampe Race 1': { isAvailable: () => true },
            'Dampe Race 2': { isAvailable: () => true },
            'Dampe Digging': { isAvailable: () => true },
            'Shield Grave Chest': { isAvailable: () => true },
            'Redead Grave Chest': { isAvailable: () => trackerData.items.SunsSong },
            "Sun's Song": { isAvailable: () => trackerData.items.ZeldasLullaby },
            "Sun's Song Chest": { isAvailable: () => trackerData.items.ZeldasLullaby && ((trackerData.items.Dins || (trackerData.items.Fire && trackerData.items.Bow)) && trackerData.items.Magic) },
            'Magic Bean Heart Piece': { isAvailable: () => trackerData.items.Scale || trackerData.items.Bombs || trackerData.items.Hookshot >= 2 },
            'Nocturne of Shadow': { isAvailable: () => trackerData.items.ForestMedallion && trackerData.items.FireMedallion && trackerData.items.WaterMedallion },
            'Skulltula House 10': { isAvailable: () => trackerData.items.Skulltula >= 1 },
            'Skulltula House 20': { isAvailable: () => trackerData.items.Skulltula >= 2 },
            'Skulltula House 30': { isAvailable: () => trackerData.items.Skulltula >= 3 },
            'Skulltula House 40': { isAvailable: () => trackerData.items.Skulltula >= 4 },
            'Skulltula House 50': { isAvailable: () => trackerData.items.Skulltula >= 5 }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Goron City", x: "60.0%", y: "06.5%",
        chestlist: {
            'Left Boulder Maze Chest': { isAvailable: () => trackerData.items.Glove >= 2 || trackerData.items.Hammer },
            'Center Boulder Maze Chest': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove >= 2 },
            'Right Boulder Maze Chest': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove >= 2 },
            'Hot Rodder Goron': { isAvailable: () => trackerData.items.Bombs },
            'Link the Goron': { isAvailable: () => trackerData.items.Glove || trackerData.items.Bombs || trackerData.items.Bow },
            'Spinning Pot Heart Piece': { isAvailable: () => (trackerData.items.Glove || trackerData.items.Bombs) && (trackerData.items.ZeldasLullaby || (trackerData.items.Magic && trackerData.items.Dins)) },
            "Darunia's Joy": { isAvailable: () => trackerData.items.ZeldasLullaby && trackerData.items.SariasSong }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Lost Woods", x: "78.0%", y: "48.0%",
        chestlist: {
            'Skull Kid': { isAvailable: () => trackerData.items.SariasSong },
            'Deku Salesman': { isAvailable: () => true },
            'Ocarina Memory Game': { isAvailable: () => true },
            'Target in Woods': { isAvailable: () => trackerData.items.Slingshot },
            'Bomb Grotto Chest': { isAvailable: () => trackerData.items.Bombs || (trackerData.items.Hammer && (trackerData.items.SariasSong || trackerData.items.MinuetofForest)) },
            'Deku Salesman Grotto': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer },
            'Wolfos Grotto Chest': { isAvailable: () => trackerData.items.Bombs || (trackerData.items.Hammer && (trackerData.items.SariasSong || trackerData.items.MinuetofForest)) },
            "Saria's Song": { isAvailable: () => true },
            'Minuet of Forest': { isAvailable: () => trackerData.items.SariasSong || trackerData.items.MinuetofForest },
            'Deku Theater Skull Mask': { isAvailable: () => true },
            'Deku Theater Mask of Truth': { isAvailable: () => trackerData.items.SariasSong && trackerData.items.KokiriEmerald && trackerData.items.GoronRuby && trackerData.items.ZoraSapphire }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Zora's Domain", x: "93.5%", y: "29.0%",
        chestlist: {
            'Diving Minigame': { isAvailable: () => (trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale },
            'Zoras Domain Torch Run': { isAvailable: () => (trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale },
            'Fairy Fountain': { isAvailable: () => trackerData.items.ZoraLetter && trackerData.items.Bombs && trackerData.items.ZeldasLullaby },
            'Iceberg Heart Piece': { isAvailable: () => trackerData.items.ZoraLetter && (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZeldasLullaby },
            'Underwater Heart Piece': { isAvailable: () => trackerData.items.ZoraLetter && (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.IronBoots && trackerData.items.ZeldasLullaby },
            'King Zora Thawed': { isAvailable: () => trackerData.items.ZeldasLullaby && trackerData.items.Bottle && ((trackerData.items.ZoraLetter && (trackerData.items.Bombs || trackerData.items.Scale)) || isBridgeOpen() || trackerData.items.Wallet) }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    },
    {
        name: "Death Mountain", x: "64.0%", y: "09.0%",
        chestlist: {
            'Heart Piece Above Dodongo Cavern': { isAvailable: () => trackerData.items.Bombs || (trackerData.items.Glove && trackerData.items.Scale) },
            'Outside Goron City Chest': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer },
            'Outside Goron City Grotto': { isAvailable: () => trackerData.items.SongofStorms },
            'Bolero of Fire': { isAvailable: () => trackerData.items.BoleroofFire || (trackerData.items.HoverBoots && (trackerData.items.Hammer || trackerData.items.Bombs || trackerData.items.Glove)) || (trackerData.items.Hookshot && trackerData.items.Glove) },
            'Crater Wall Heart Piece': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer || (trackerData.items.BoleroofFire && (trackerData.items.HoverBoots || trackerData.items.Hookshot)) || trackerData.items.Glove },
            'Crater Magic Bean Heart Piece': { isAvailable: () => (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.BoleroofFire },
            'Crater Grotto': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer },
            'Crater Fairy Fountain': { isAvailable: () => trackerData.items.Hammer && trackerData.items.ZeldasLullaby && (trackerData.items.Glove || (trackerData.items.BoleroofFire && trackerData.items.Hookshot) || trackerData.items.HoverBoots) },
            'Summit Fairy Fountain': { isAvailable: () => (trackerData.items.Bombs || trackerData.items.Hammer) && trackerData.items.ZeldasLullaby },
            'Biggoron Sword': { isAvailable: () => trackerData.items.Bombs || trackerData.items.Hammer || (trackerData.items.BoleroofFire && (trackerData.items.HoverBoots || trackerData.items.Hookshot)) || trackerData.items.Glove }
        },
        isBeatable: function() { return this.canGetChest(); },
        canGetChest: function() { return generalCanGetChest(this.chestlist); }
    }
];

const chests = [
    { name: "Kokiri Sword Chest", x: "76.0%", y: "63.5%", isAvailable: () => "available" },
    { name: "Mido's House (4)", x: "78.5%", y: "58.0%", isAvailable: () => "available" },
    { name: "Kokiri Song of Storms Grotto", x: "77.5%", y: "54.5%", isAvailable: () => trackerData.items.SongofStorms ? "available" : "unavailable" },
    { name: "Song of Time", x: "52.3%", y: "30.5%", isAvailable: () => (trackerData.items.KokiriEmerald && trackerData.items.GoronRuby && trackerData.items.ZoraSapphire) ? "available" : "unavailable" },
    { name: "Hyrule Field North Grotto", x: "50.0%", y: "28.0%", isAvailable: () => (trackerData.items.Bombs || trackerData.items.Hammer) ? "available" : "unavailable" },
    { name: "Hyrule Field Forest Grotto", x: "60.0%", y: "59.0%", isAvailable: () => (trackerData.items.Bombs || trackerData.items.Hammer) ? "available" : "unavailable" },
    { name: "Hyrule Field South Grotto", x: "44.5%", y: "64.0%", isAvailable: () => "available" },
    { name: "Hyrule Field Deku Salesman Grotto", x: "42.0%", y: "64.0%", isAvailable: () => (trackerData.items.Bombs || trackerData.items.Hammer) ? "available" : "unavailable" },
    { name: "Diving Heart Piece Grotto", x: "44.0%", y: "32.0%", isAvailable: () => ((trackerData.items.Bombs || trackerData.items.Hammer) && (trackerData.items.Scale >= 2 || trackerData.items.IronBoots)) ? "available" : "unavailable" },
    { name: "Talon's Chickens Minigame", x: "49.0%", y: "38.0%", isAvailable: () => "available" },
    { name: "Epona's Song", x: "47.0%", y: "41.5%", isAvailable: () => "available" },
    { name: "Lon Lon Heart Piece", x: "44.0%", y: "43.5%", isAvailable: () => "available" },
    { name: "Underwater Bottle", x: "38.6%", y: "80.0%", isAvailable: () => trackerData.items.Scale ? "available" : "unavailable" },
    { name: "Lake Hylia Sun", x: "41.5%", y: "91.0%", isAvailable: () => (trackerData.items.Hookshot >= 2 && trackerData.items.Bow) ? "available" : "unavailable" },
    { name: "Diving in the Lab", x: "35.2%", y: "77.4%", isAvailable: () => trackerData.items.Scale >= 2 ? "available" : "unavailable" },
    { name: "Lab Roof Heart Piece", x: "35.2%", y: "74.0%", isAvailable: () => (trackerData.items.Scale || trackerData.items.Bombs || trackerData.items.Hookshot) ? "available" : "unavailable" },
    { name: "Child Fishing", x: "45.0%", y: "78.0%", isAvailable: () => trackerData.items.KokiriSword ? "available" : "unavailable" },
    { name: "Adult Fishing", x: "46.9%", y: "78.0%", isAvailable: () => (trackerData.items.Hookshot || trackerData.items.Scale || trackerData.items.Bombs) ? "available" : "unavailable" },
    { name: "Gerudo Valley Hammer Rocks Chest", x: "22.0%", y: "38.0%", isAvailable: () => ((trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hammer) ? "available" : "unavailable" },
    { name: "Gerudo Valley Crate Heart Piece", x: "24.0%", y: "41.5%", isAvailable: () => "available" },
    { name: "Gerudo Valley Waterfall Heart Piece", x: "25.5%", y: "32.0%", isAvailable: () => "available" },
    { name: "Gerudo Fortress Rooftop Chest", x: "18.8%", y: "23.0%", isAvailable: () => ((trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.HoverBoots || trackerData.items.Hookshot >= 2) ? "available" : "unavailable" },
    { name: "Horseback Archery Game 1000pts", x: "21.7%", y: "28.0%", isAvailable: () => ((trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.EponasSong && trackerData.items.Bow) ? "available" : "unavailable" },
    { name: "Horseback Archery Game 1500pts", x: "23.5%", y: "28.0%", isAvailable: () => ((trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.EponasSong && trackerData.items.Bow) ? "available" : "unavailable" },
    { name: "Haunted Wasteland Chest", x: "14.0%", y: "25.0%", isAvailable: () => (((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && ((trackerData.items.Dins || (trackerData.items.Fire && trackerData.items.Bow)) && trackerData.items.Magic)) ? "available" : "unavailable" },
    { name: "Requiem of Spirit", x: "04.5%", y: "21.5%", isAvailable: () => ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) ? "available" : "unavailable" },
    { name: "Desert Colossus Fairy", x: "08.0%", y: "19.0%", isAvailable: () => (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Bombs && trackerData.items.ZeldasLullaby) ? "available" : "unavailable" },
    { name: "Desert Colossus Heart Piece", x: "06.4%", y: "23.5%", isAvailable: () => (trackerData.items.RequiemofSpirit && (trackerData.items.Bombs || trackerData.items.Scale)) ? "available" : "unavailable" },
    { name: "Frog Ocarina Game", x: "79.8%", y: "32.0%", isAvailable: () => ((trackerData.items.Scale || trackerData.items.Bombs) && trackerData.items.ZeldasLullaby && trackerData.items.SariasSong && trackerData.items.SunsSong && trackerData.items.EponasSong && trackerData.items.SongofTime && trackerData.items.SongofStorms) ? "available" : "unavailable" },
    { name: "Frogs in the Rain", x: "78.0%", y: "32.0%", isAvailable: () => ((trackerData.items.Scale || trackerData.items.Bombs) && trackerData.items.SongofStorms) ? "available" : "unavailable" },
    { name: "Zora River Heart Piece 1", x: "75.0%", y: "30.0%", isAvailable: () => (trackerData.items.Scale || trackerData.items.Bombs || trackerData.items.HoverBoots) ? "available" : "unavailable" },
    { name: "Zora River Heart Piece 2", x: "86.0%", y: "29.2%", isAvailable: () => (trackerData.items.Scale || trackerData.items.Bombs || trackerData.items.HoverBoots) ? "available" : "unavailable" },
    { name: "Zora River Grotto", x: "75.5%", y: "34.5%", isAvailable: () => "available" }
];