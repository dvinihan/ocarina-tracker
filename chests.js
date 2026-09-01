function generalCanGetChest(chestlist) {
    var canGet = 0;
    var unopened = 0
    for (var key in chestlist) {
        if (chestlist.hasOwnProperty(key)) {
            if (!chestlist[key].isOpened)
                unopened++;

            if (!chestlist[key].isOpened && chestlist[key].isAvailable())
                canGet++;
        }
    }

    if (unopened == 0)
        return "opened"
    if (canGet == unopened)
        return "available";
    if (canGet == 0)
        return "unavailable"
    return "possible"
}

// define dungeon chests
var dungeons = [
    {
        name: "Deku Tree",
        x: "87.0%",
        y: "57.0%",
        chestlist: {
            ['Lobby Chest']: { isAvailable: function () {return true} },
            ['Compass Chest']: { isAvailable: function () {return true} },
            ['Compass Room Side Chest']: { isAvailable: function () {return true} },
            ['Basement Chest']: { isAvailable: function () {return true} },
            ['Slingshot Chest']: { isAvailable: function () {return true} },
            ['Slingshot Room Side Chest']: { isAvailable: function () {return true} },
            ['Gohma']: { isAvailable: function () {return trackerData.items.Slingshot;} },
        },
        isBeatable: function(){
            if(trackerData.items.Slingshot) {
                if (this.canGetChest() == 'available')
                    return 'available';
                return 'possible';
            }
            else
                return "unavailable";
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Water Temple",
        x: "36.1%",
        y: "91.0%",
        chestlist: {
            ['Map Chest']: { isAvailable: function () {
                return trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot; } },
            ['Compass Chest']: { isAvailable: function () {
                return trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot; } },
            ['Torches Chest']: { isAvailable: function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && (trackerData.items.Bow || (trackerData.items.Dins && trackerData.items.Magic)) && trackerData.items.ZeldasLullaby; } },
            ['Dragon Chest']: { isAvailable: function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.ZeldasLullaby && trackerData.items.SongofTime && trackerData.items.Bow; } },
            ['Central Bow Target Chest']: { isAvailable: function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.Bow && trackerData.items.Glove && trackerData.items.ZeldasLullaby && (trackerData.items.HoverBoots || trackerData.items.Hookshot >= 2); } },
            ['Boss Key Chest']: { isAvailable:  function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.ZeldasLullaby && ((trackerData.items.Bombs && trackerData.items.Glove) || trackerData.items.HoverBoots) && trackerData.items.Hookshot >= 2; } },
            ['Central Pillar Chest']: { isAvailable: function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.ZeldasLullaby ; } },
            ['Cracked Wall Chest']: { isAvailable: function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.Bombs && trackerData.items.ZeldasLullaby; } },
            ['Dark Link Chest']: { isAvailable: function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.ZeldasLullaby; } },
            ['River Chest']: { isAvailable:  function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot) && trackerData.items.SongofTime && trackerData.items.Bow && trackerData.items.ZeldasLullaby; } },
            ['Morpha']: { isAvailable:  function () {
                return (trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot >= 2); } },
        },
        isBeatable: function(){
            if(trackerData.items.ZoraTunic && trackerData.items.IronBoots && trackerData.items.Hookshot >= 2) {
                if (this.canGetChest() == 'available')
                    return 'available';
                return 'possible';
            }
            else
                return "unavailable";
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Gerudo Training Grounds",
        x: "18.8%",
        y: "28.0%",
        chestlist: {
            ['Lobby Left Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Bow; } },
            ['Lobby Right Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Bow ; } },
            ['Stalfos Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && (trackerData.items.Bow || trackerData.items.Hookshot || trackerData.items.HoverBoots); } },
            ['Beamos Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && (trackerData.items.Bow || trackerData.items.Hookshot || trackerData.items.HoverBoots) && trackerData.items.Bombs; } },
            ['Hidden Ceiling Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && (trackerData.items.Bow || trackerData.items.Hookshot) && trackerData.items.Lens && trackerData.items.Magic ; } },
            ['Maze Path First Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow; } },
            ['Maze Path Second Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow; } },
            ['Maze Path Third Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow; } },
            ['Maze Path Final Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow; } },
            ['Maze Right Central Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow; } },
            ['Maze Right Side Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bow; } },
            ['Maze Right Side Key']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.SongofTime && trackerData.items.Bows; } },
            ['Underwater Silver Rupee Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.SongofTime && trackerData.items.IronBoots; } },
            ['Hammer Room Clear Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && (trackerData.items.SongofTime || trackerData.items.HoverBoots || trackerData.items.Hookshot >=2 || (trackerData.items.Lens && trackerData.items.Magic)); } },
            ['Hammer Room Switch Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Hammer && (trackerData.items.SongofTime || trackerData.items.HoverBoots || trackerData.items.Hookshot >=2 || (trackerData.items.Lens && trackerData.items.Magic)); } },
            ['Eye Statue Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Bow && (trackerData.items.SongofTime || trackerData.items.HoverBoots || trackerData.items.Hookshot >=2 || (trackerData.items.Lens && trackerData.items.Magic)); } },
            ['Near Scarecrow Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Before Heavy Block Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot; } },
            ['Heavy Block First Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Heavy Block Second Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Heavy Block Third Chest']: { isAvailable:  function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Heavy Block Fourth Chest']: { isAvailable: function () {
                return (trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hookshot && trackerData.items.Glove >= 2 && trackerData.items.Lens && trackerData.items.Magic; } },
        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Spirit Temple",
        x: "02.5%",
        y: "17.0%",
        chestlist: {
            ['Child Left Chest']: { isAvailable: function () {
                return trackerData.items.RequiemofSpirit && (trackerData.items.Boomerang || trackerData.items.Slingshot); } },
            ['Child Right Chest']: { isAvailable:  function () {
                return trackerData.items.RequiemofSpirit && (trackerData.items.Boomerang || trackerData.items.Slingshot); } },
            ['Compass Chest']: { isAvailable:  function () {
                return ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && trackerData.items.Hookshot && trackerData.items.ZeldasLullaby; } },
            ['Early Adult Right Chest']: { isAvailable:  function () {
                return ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && (trackerData.items.Bow || trackerData.items.Hookshot || trackerData.items.Bombs); } },
            ['First Mirror Right Chest']: { isAvailable:  function () {
                return ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2; } },
            ['First Mirror Left Chest']: { isAvailable:  function () {
                return ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2; } },
            ['Map Chest']: { isAvailable:  function () {
                return ((trackerData.items.RequiemofSpirit && trackerData.items.Bombs) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2)) && trackerData.items.Magic && (trackerData.items.Dins || (trackerData.items.Fire && trackerData.items.Bow && trackerData.items.Glove >= 2)); } },
            ['Child Climb East Chest']: { isAvailable:  function () {
                return ((trackerData.items.RequiemofSpirit && (trackerData.items.Boomerang || trackerData.items.Slingshot)) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && (trackerData.items.Hookshot || trackerData.items.Bow))); } },
            ['Child Climb North Chest']: { isAvailable: function () {
                 return ((trackerData.items.RequiemofSpirit && (trackerData.items.Boomerang || trackerData.items.Slingshot)) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && (trackerData.items.Hookshot || trackerData.items.Bow))); } },
            ['Sun Block Room Chest']: { isAvailable: function () {
                return ((trackerData.items.RequiemofSpirit && trackerData.items.Bombs) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Lens && trackerData.items.Magic && trackerData.items.Glove >= 2 && (trackerData.items.Dins || (trackerData.items.Fire && trackerData.items.Bow)) && trackerData.items.Magic)) ; } },
            ['Statue Hand Chest']: { isAvailable:  function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.ZeldasLullaby; } },
            ['NE Main Room Chest']: { isAvailable:  function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.ZeldasLullaby && trackerData.items.Hookshot; } },
            ['Silver Gauntlets Chest']: { isAvailable:  function () {
                return (trackerData.items.RequiemofSpirit && trackerData.items.Bombs) || (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2); } },
            ['Mirror Shield Chest']: { isAvailable: function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2); } },
            ['Near Four Armos Chest']: { isAvailable:  function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.MirrorShield; } },
            ['Hallway Left Invisible Chest']: { isAvailable:  function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.Magic && trackerData.items.Lens; } },
            ['Hallway Right Invisible Chest']: { isAvailable: function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.Magic && trackerData.items.Lens; } },
            ['Boss Key Chest']: { isAvailable: function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && trackerData.items.ZeldasLullaby && trackerData.items.Bow && trackerData.items.Hookshot && (trackerData.items.Bombs || trackerData.items.Hammer) ; } },
            ['Topmost Chest']: { isAvailable:  function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2) && (trackerData.items.Hookshot || trackerData.items.Bow || trackerData.items.Bombs) && trackerData.items.MirrorShield; } },
            ['Twinrova']: { isAvailable:  function () {
                return (((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && trackerData.items.MirrorShield && trackerData.items.Bombs && trackerData.items.Hookshot); } },
        },
        isBeatable: function(){
            if(((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Glove >= 2 && trackerData.items.MirrorShield && trackerData.items.Bombs && trackerData.items.Hookshot) {
                if (this.canGetChest() == 'available')
                    return 'available';
                return 'possible';
            }
            else
                return "unavailable";
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Bottom of the Well",
        x: "68.0%",
        y: "23.0%",
        chestlist: {
            ['Front Left Hidden Wall']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Front Center Bombable']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.Bombs; } },
            ['Right Bottom Hidden Wall']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Center Large Chest']: { isAvailable: function () {
                return trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic ; } },
            ['Center Small Chest']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Back Left Bombable']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && (trackerData.items.ZeldasLullaby || trackerData.items.Scale); } },
            ['Coffin Key']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.Bombs; } },
            ['Defeat Boss']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.ZeldasLullaby && trackerData.items.KokiriSword; } },
            ['Invisible Chest']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.ZeldasLullaby && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Underwater Front Chest']: { isAvailable: function () {
                return trackerData.items.SongofStorms && trackerData.items.ZeldasLullaby ; } },
            ['Underwater Left Chest']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.ZeldasLullaby; } },
            ['Basement Chest']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.Bombs; } },
            ['Locked Pits']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic; } },
            ['Behind Right Grate']: { isAvailable:  function () {
                return trackerData.items.SongofStorms && trackerData.items.Lens && trackerData.items.Magic; } },
        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Shadow Temple",
        x: "76.0%",
        y: "21.0%",
        chestlist: {
            ['Map Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && (trackerData.items.HoverBoots || trackerData.items.Hookshot); } },
            ['Hover Boots Chest']: { isAvailable: function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && (trackerData.items.HoverBoots || trackerData.items.Hookshot); } },
            ['Compass Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots; } },
            ['Early Silver Rupee Chest']: { isAvailable: function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots; } },
            ['Invisible Blades Visible Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs; } },
            ['Invisible Blades Invisible Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs; } },
            ['Falling Spikes Lower Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs; } },
            ['Falling Spikes Upper Chest']: { isAvailable:  function () {
                return     trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Glove; } },
            ['Falling Spikes Switch Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Glove; } },
            ['Invisible Spikes Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs; } },
            ['Giant Pot Key']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot; } },
            ['Wind Hint Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot; } },
            ['After Wind Enemy Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot; } },
            ['After Wind Hidden Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot; } },
            ['Spike Walls Left Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby; } },
            ['Boss Key Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby; } },
            ['Hidden Floormaster Chest']: { isAvailable:  function () {
                return trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby; } },
            ['Bongo Bongo']: { isAvailable:  function () {
                return (trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby && trackerData.items.Bow); } },
        },
        isBeatable: function(){
            if(trackerData.items.NocturneofShadow && trackerData.items.Dins && trackerData.items.Magic && trackerData.items.Lens && trackerData.items.HoverBoots && trackerData.items.Bombs && trackerData.items.Hookshot && trackerData.items.Glove && trackerData.items.ZeldasLullaby && trackerData.items.Bow) {
                if (this.canGetChest() == 'available')
                    return 'available';
                return 'possible';
            }
            else
                return "unavailable";
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Dodongo's Cavern",
        x: "59.0%",
        y: "13.5%",
        chestlist: {
            ['Map Chest']: { isAvailable:  function () {
                return trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove  ; } },
            ['Compass Chest']: { isAvailable:  function () {
                return trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove  ; } },
            ['Bomb Flower Platform']: { isAvailable:  function () {
                return trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove  ; } },
            ['Bomb Bag Chest']: { isAvailable:  function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove) && (trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots); } },
            ['End of Bridge Chest']: { isAvailable:  function () {
                return (trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) && (trackerData.items.Bombs || ((trackerData.items.Bow || trackerData.items.HoverBoots) && trackerData.items.Hammer)); } },
            ['Chest Above King Dodongo']: { isAvailable: function () {
                return (trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) && trackerData.items.Bombs ; } },
            ['King Dodongo']: { isAvailable: function () {
                return ((trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) && trackerData.items.Bombs) ; } },
        },
        isBeatable: function(){
            if((trackerData.items.Slingshot || trackerData.items.Bow || trackerData.items.HoverBoots) && trackerData.items.Bombs) {
                if (this.canGetChest() == 'available')
                    return 'available';
                return 'possible';
            }
            else
                return "unavailable";
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Fire Temple",
        x: "68.0%",
        y: "06.5%",
        chestlist: {
            ['Chest Near Boss']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)); } },
            ['Fire Dancer Chest']: { isAvailable: function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Hammer ; } },
            ['Boss Key Chest']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Hammer; } },
            ['Big Lava Room Bombable Chest']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) &&ZeldasLullaby && trackerData.items.Bombs; } },
            ['Big Lava Room Open Chest']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)); } },
            ['Boulder Maze Lower Chest']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot); } },
            ['Boulder Maze Upper Chest']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot); } },
            ['Boulder Maze Side Room']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot); } },
            ['Boulder Maze Bombable Pit']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && trackerData.items.Bombs; } },
            ['Scarecrow Chest']: { isAvailable: function () {
                return trackerData.items.GoronTunic && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) && trackerData.items.Hookshot; } },
            ['Map Chest']: { isAvailable: function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) ; } },
            ['Compass Chest']: { isAvailable: function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot); } },
            ['Highest Goron Chest']: { isAvailable:  function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) && trackerData.items.SongofTime && trackerData.items.Hammer; } },
            ['Megaton Hammer Chest']: { isAvailable: function () {
                return trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Glove && trackerData.items.Bombs; } },
            ['Volvagia']: { isAvailable: function () {
                return (trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Hammer && (trackerData.items.HoverBoots || (trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) && (trackerData.items.SongofTime || trackerData.items.Bombs)))); } },
        },
        isBeatable: function(){
            if(trackerData.items.GoronTunic && (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots || trackerData.items.Hookshot)) && trackerData.items.Hammer && (trackerData.items.HoverBoots || (trackerData.items.Glove && (trackerData.items.Bombs || trackerData.items.Bow || trackerData.items.Hookshot) && (trackerData.items.SongofTime || trackerData.items.Bombs)))) {
                if (this.canGetChest() == 'available')
                    return 'available';
                return 'possible';
            }
            else
                return "unavailable";
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Jabu Jabu's Belly",
        x: "91.5%",
        y: "21.0%",
        chestlist: {
            ['Boomerang Chest']: { isAvailable: function () {
                return ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && (trackerData.items.Slingshot || trackerData.items.Bombs || trackerData.items.Boomerang); } },
            ['Map Chest']: { isAvailable:  function () {
                return ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && trackerData.items.Boomerang; } },
            ['Compass Chest']: { isAvailable:  function () {
                return ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && trackerData.items.Boomerang; } },
            ['Barinade']: { isAvailable:  function () {
                return (((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && trackerData.items.Boomerang); } },
        },
        isBeatable: function(){
            if(((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.Bottle && trackerData.items.Boomerang) {
                if (this.canGetChest() == 'available')
                    return 'available';
                return 'possible';
            }
            else
                return "unavailable";
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Ice Cavern",
        x: "90.5%",
        y: "16.0%",
        chestlist: {
            ['Map Chest']: { isAvailable:  function () {
                return (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle; } },
            ['Compass Chest']: { isAvailable:  function () {
                return (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle; } },
            ['Heart Piece']: { isAvailable:  function () {
                return (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle; } },
            ['Iron Boots Chest']: { isAvailable:  function () {
                return (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle; } },
            ['Sheik in Ice Cavern']: { isAvailable:  function () {
                return (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZoraLetter && trackerData.items.ZeldasLullaby && trackerData.items.Bottle; } },
        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Forest Temple",
        x: "78.5%",
        y: "39.0%",
        chestlist: {
            ['First Chest']: { isAvailable:  function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot; } },
            ['Chest Behind Lobby']: { isAvailable: function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot; } },
            ['Well Chest']: { isAvailable: function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot; } },
            ['Map Chest']: { isAvailable: function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot; } },
            ['Outside Hookshot Chest']: { isAvailable: function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot; },  },
            ['Falling Room Chest']: { isAvailable: function () {
                return ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && (trackerData.items.Bow || (trackerData.items.Dins && trackerData.items.Magic)); } },
            ['Block Push Chest']: { isAvailable: function () {
                return ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && trackerData.items.Bow; } },
            ['Boss Key Chest']: { isAvailable: function () {
                return ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && trackerData.items.Bow; } },
            ['Floormaster Chest']: { isAvailable: function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot; },  },
            ['Bow Chest']: { isAvailable: function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot; },   },
            ['Red Poe Chest']: { isAvailable:  function () {
                return ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && trackerData.items.Bow; } },
            ['Blue Poe Chest']: { isAvailable: function () {
                return ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot) && trackerData.items.Bow; } },
            ['Near Boss Chest']: { isAvailable: function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot && trackerData.items.Bow; } },
            ['Phantom Ganon']: { isAvailable: function () {
                return ((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot && trackerData.items.Bow); } },
        },
        isBeatable: function(){
            if((trackerData.items.SariasSong || trackerData.items.MinuetofForest) && trackerData.items.Hookshot && trackerData.items.Bow) {
                if (this.canGetChest() == 'available')
                    return 'available';
                return 'possible';
            }
            else
                return "unavailable";
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Ganon's Castle",
        x: "52.0%",
        y: "10.0%",
        chestlist: {
            ['Forest Trial Chest']: { isAvailable: function () { 
                return isBridgeOpen(); } },
            ['Water Trial Left Chest']: { isAvailable: function () { 
                return isBridgeOpen(); } },
            ['Water Trial Right Chest']: { isAvailable: function () { 
                return isBridgeOpen(); } },
            ['Shadow Trial First Chest']: { isAvailable:  function () {
                return isBridgeOpen() && ((trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Fire) || trackerData.items.Hookshot >= 2); } },
            ['Shadow Trial Second Chest']: { isAvailable:  function () {
                return isBridgeOpen() && ((trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Fire) || (trackerData.items.Hookshot >= 2 && trackerData.items.HoverBoots)); } },
            ['Spirit Trial First Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Hookshot && (trackerData.items.Magic || trackerData.items.Bombs); } },
            ['Spirit Trial Second Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Hookshot && trackerData.items.Magic && trackerData.items.Bombs && trackerData.items.Lens; } },
            ['Light Trial First Left Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3; } },
            ['Light Trial Second Left Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3; } },
            ['Light Trial Third Left Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3; } },
            ['Light Trial First Right Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3; } },
            ['Light Trial Second Right Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3; } },
            ['Light Trial Third Right Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3; } },
            ['Light Trail Invisible Enemies Chest']: { isAvailable: function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3 && (trackerData.items.Magic && trackerData.items.Lens); } },
            ['Light Trial Lullaby Chest']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3 && trackerData.items.ZeldasLullaby; } },
        },
        trials: {
            ['Forest Trial Clear']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light && (trackerData.items.Fire || (trackerData.items.Hookshot && trackerData.items.Dins)); } },
            ['Fire Trial Clear']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.GoronTunic && trackerData.items.Glove >= 3 && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light && trackerData.items.Hookshot >= 2; } },
            ['Water Trial Clear']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Bottle && trackerData.items.Hammer && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light; } },
            ['Shadow Trial Clear']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light && trackerData.items.Hammer && (trackerData.items.Fire || trackerData.items.Hookshot >= 2) && (trackerData.items.Lens || (trackerData.items.HoverBoots && trackerData.items.Hookshot >= 2)); } },
            ['Spirit Trial Clear']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Light && trackerData.items.MirrorShield && trackerData.items.Bombs && trackerData.items.Hookshot; } },
            ['Light Trial Clear']: { isAvailable:  function () {
                return isBridgeOpen() && trackerData.items.Glove >= 3 && trackerData.items.Magic && trackerData.items.Bow && trackerData.items.Hookshot && trackerData.items.Light; }      },
        },
        isBeatable: function(){
            return generalCanGetChest(this.trials);
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Castle Town",
        x: "52.0%",
        y: "20.0%",
        chestlist: {
            ['Zelda\'s Lullaby']: { isAvailable: function () {
                return (true); } },
            ['Child Shooting Gallery']: { isAvailable: function () {
                return (true); } },
            ['Bombchu Bowling 1']: { isAvailable: function () {
                return (trackerData.items.Bombs); } },
            ['Bombchu Bowling 2']: { isAvailable: function () {
                return (trackerData.items.Bombs); } },
            ['Treasure Chest Game']: { isAvailable: function () {
                return (trackerData.items.Lens && trackerData.items.Magic); } },
            ['Dog Lady']: { isAvailable: function () {
                return (true); } },
            ['10 Big Poes']: { isAvailable: function () {
                return (trackerData.items.Bow && trackerData.items.EponasSong && trackerData.items.Bottle); } },
            ['Hyrule Castle Fairy']: { isAvailable: function () {
                return (trackerData.items.Bombs && trackerData.items.ZeldasLullaby); } },
            ['Ganon\'s Castle Fairy']: { isAvailable: function () {
                return (trackerData.items.Glove >= 3 && trackerData.items.ZeldasLullaby); } },
            ['Prelude of Light']: { isAvailable: function () {
                return (trackerData.items.ForestMedallion); } },
            ['Light Arrows']: { isAvailable: function () {
                return (trackerData.items.ShadowMedallion && trackerData.items.SpiritMedallion); } },

        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Kakariko Village",
        x: "65.0%",
        y: "24.0%",
        chestlist: {
            ['Anju as Adult']: { isAvailable: function () {
                return (true); } },
            ['Anju\'s Chickens']: { isAvailable: function () {
                return (true); } },
            ['Kakariko Grotto Chest']: { isAvailable: function () {
                return (true); } },
            ['Kakariko Redead Grotto Chest']: { isAvailable: function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer); } },
            ['Cow Heart Piece']: { isAvailable: function () {
                return (true); } },
            ['Man on Roof']: { isAvailable: function () {
                return (trackerData.items.Hookshot); } },
            ['Adult Shooting Gallery']: { isAvailable: function () {
                return (trackerData.items.Bow); } },
            ['Song of Storms']: { isAvailable: function () {
                return (true); } },
            ['Windmill Heart Piece']: { isAvailable: function () {
                return (trackerData.items.SongofTime || trackerData.items.Boomerang); } },
            ['Dampe Race 1']: { isAvailable: function () {
                return (true); } },
            ['Dampe Race 2']: { isAvailable: function () {
                return (true); } },
            ['Dampe Digging']: { isAvailable: function () {
                return (true); } },
            ['Shield Grave Chest']: { isAvailable: function () {
                return (true); } },
            ['Redead Grave Chest']: { isAvailable: function () {
                return (trackerData.items.SunsSong); } },
            ['Sun\'s Song']: { isAvailable: function () {
                return (trackerData.items.ZeldasLullaby); } },
            ['Sun\'s Song Chest']: { isAvailable: function () {
                return (trackerData.items.ZeldasLullaby && ((trackerData.items.Dins || (trackerData.items.Fire && trackerData.items.Bow)) && trackerData.items.Magic)); } },
            ['Magic Bean Heart Piece']: { isAvailable: function () {
                return (trackerData.items.Scale || trackerData.items.Bombs || trackerData.items.Hookshot >= 2); } },
            ['Nocturne of Shadow']: { isAvailable: function () {
                return (trackerData.items.ForestMedallion && trackerData.items.FireMedallion && trackerData.items.WaterMedallion); } },
            ['Skulltula House 10']: { isAvailable: function () {
                return (trackerData.items.Skulltula >= 1); } },
            ['Skulltula House 20']: { isAvailable: function () {
                return (trackerData.items.Skulltula >= 2); } },
            ['Skulltula House 30']: { isAvailable: function () {
                return (trackerData.items.Skulltula >= 3); } },
            ['Skulltula House 40']: { isAvailable: function () {
                return (trackerData.items.Skulltula >= 4); } },
            ['Skulltula House 50']: { isAvailable: function () {
                return (trackerData.items.Skulltula >= 5); } },
        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Goron City",
        x: "60.0%",
        y: "06.5%",
        chestlist: {
            ['Left Boulder Maze Chest']: { isAvailable: function () {
                return (trackerData.items.Glove >= 2 || trackerData.items.Hammer); } },
            ['Center Boulder Maze Chest']: { isAvailable: function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove >= 2); } },
            ['Right Boulder Maze Chest']: { isAvailable: function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer || trackerData.items.Glove >= 2); } },
            ['Hot Rodder Goron']: { isAvailable: function () {
                return (trackerData.items.Bombs); } },
            ['Link the Goron']: { isAvailable: function () {
                return (trackerData.items.Glove || trackerData.items.Bombs || trackerData.items.Bow); } },
            ['Spinning Pot Heart Piece']: { isAvailable: function () {
                return ((trackerData.items.Glove || trackerData.items.Bombs) && (trackerData.items.ZeldasLullaby || (trackerData.items.Magic && trackerData.items.Dins))); } },
            ['Darunia\'s Joy']: { isAvailable: function () {
                return (trackerData.items.ZeldasLullaby && trackerData.items.SariasSong); } },
        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Lost Woods",
        x: "78.0%",
        y: "48.0%",
        chestlist: {
            ['Skull Kid']: { isAvailable: function () {
                return (trackerData.items.SariasSong); } },
            ['Deku Salesman']: { isAvailable: function () {
                return (true); } },
            ['Ocarina Memory Game']: { isAvailable: function () {
                return (true); } },
            ['Target in Woods']: { isAvailable: function () {
                return (trackerData.items.Slingshot); } },
            ['Bomb Grotto Chest']: { isAvailable: function () {
                return (trackerData.items.Bombs || (trackerData.items.Hammer && (item.SariasSong || trackerData.items.MinuetofForest))); } },
            ['Deku Salesman Grotto']: { isAvailable: function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer); } },
            ['Wolfos Grotto Chest']: { isAvailable: function () {
                return (trackerData.items.Bombs || (trackerData.items.Hammer && (item.SariasSong || trackerData.items.MinuetofForest))); } },
            ['Saria\'s Song']: { isAvailable: function () {
                return (true); } },
            ['Minuet of Forest']: { isAvailable: function () {
                return (trackerData.items.SariasSong || trackerData.items.MinuetofForest); } },
            ['Deku Theater Skull Mask']: { isAvailable: function () {
                return (true); } },
            ['Deku Theater Mask of Truth']: { isAvailable: function () {
                return (trackerData.items.SariasSong && trackerData.items.KokiriEmerald && trackerData.items.GoronRuby && trackerData.items.ZoraSapphire); } },
        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Zora\'s Domain",
        x: "93.5%",
        y: "29.0%",
        chestlist: {
            ['Diving Minigame']: { isAvailable: function () {
                return ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale); } },
            ['Zoras Domain Torch Run']: { isAvailable: function () {
                return ((trackerData.items.Bombs && trackerData.items.ZeldasLullaby) || trackerData.items.Scale); } },
            ['Fairy Fountain']: { isAvailable: function () {
                return (trackerData.items.ZoraLetter && trackerData.items.Bombs && trackerData.items.ZeldasLullaby); } },
            ['Iceberg Heart Piece']: { isAvailable: function () {
                return (trackerData.items.ZoraLetter && (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.ZeldasLullaby); } },
            ['Underwater Heart Piece']: { isAvailable: function () {
                return (trackerData.items.ZoraLetter && (trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.IronBoots && trackerData.items.ZeldasLullaby); } },
            ['King Zora Thawed']: { isAvailable: function () {
                return (trackerData.items.ZeldasLullaby && trackerData.items.Bottle && ((trackerData.items.ZoraLetter && (trackerData.items.Bombs || trackerData.items.Scale)) || isBridgeOpen() || trackerData.items.Wallet)); } },
        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
    {
        name: "Death Mountain",
        x: "64.0%",
        y: "09.0%",
        chestlist: {
            ['Heart Piece Above Dodongo Cavern']: { isAvailable: function () {
                return (trackerData.items.Bombs || (trackerData.items.Glove && trackerData.items.Scale)); } },
            ['Outside Goron City Chest']: { isAvailable: function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer); } },
            ['Outside Goron City Grotto']: { isAvailable: function () {
                return (trackerData.items.SongofStorms); } },
            ['Bolero of Fire']: { isAvailable: function () {
                return (trackerData.items.BoleroofFire || (trackerData.items.HoverBoots && (trackerData.items.Hammer || trackerData.items.Bombs || trackerData.items.Glove)) || (trackerData.items.Hookshot && trackerData.items.Glove)); } },
            ['Crater Wall Heart Piece']: { isAvailable: function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer || (trackerData.items.BoleroofFire && (trackerData.items.HoverBoots || trackerData.items.Hookshot)) || trackerData.items.Glove); } },
            ['Crater Magic Bean Heart Piece']: { isAvailable: function () {
                return ((trackerData.items.Bombs || trackerData.items.Scale) && trackerData.items.BoleroofFire); } },
            ['Crater Grotto']: { isAvailable: function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer); } },
            ['Crater Fairy Fountain']: { isAvailable: function () {
                return (trackerData.items.Hammer && trackerData.items.ZeldasLullaby && (trackerData.items.Glove || (trackerData.items.BoleroofFire && trackerData.items.Hookshot) || trackerData.items.HoverBoots)); } },
            ['Summit Fairy Fountain']: { isAvailable: function () {
                return ((trackerData.items.Bombs || trackerData.items.Hammer) && trackerData.items.ZeldasLullaby); } },
            ['Biggoron Sword']: { isAvailable: function () {
                return (trackerData.items.Bombs || trackerData.items.Hammer || (trackerData.items.BoleroofFire && (trackerData.items.HoverBoots || trackerData.items.Hookshot)) || trackerData.items.Glove); } },
        },
        isBeatable: function(){
            return this.canGetChest();
        },
        canGetChest: function(){
            return generalCanGetChest(this.chestlist);
        }
    },
];




//define overworld chests
var chests = [
    {
        name: "Kokiri Sword Chest",
        x: "76.0%",
        y: "63.5%",
        isAvailable: function(){
            return "available";
        }
    },
    {
        name: "Mido's House (4)",
        x: "78.5%",
        y: "58.0%",
        isAvailable: function(){
            return "available";
        }
    },
    {
        name: "Kokiri Song of Storms Grotto",
        x: "77.5%",
        y: "54.5%",
        isAvailable: function(){
            if(trackerData.items.SongofStorms)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Song of Time",
        x: "52.3%",
        y: "30.5%",
        isAvailable: function(){
            if(trackerData.items.KokiriEmerald && trackerData.items.GoronRuby && trackerData.items.ZoraSapphire)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Hyrule Field North Grotto",
        x: "50.0%",
        y: "28.0%",
        isAvailable: function(){
            if(trackerData.items.Bombs || trackerData.items.Hammer)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Hyrule Field Forest Grotto",
        x: "60.0%",
        y: "59.0%",
        isAvailable: function(){
            if(trackerData.items.Bombs || trackerData.items.Hammer)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Hyrule Field South Grotto",
        x: "44.5%",
        y: "64.0%",
        isAvailable: function(){
            return "available";
        }
    },
    {
        name: "Hyrule Field Deku Salesman Grotto",
        x: "42.0%",
        y: "64.0%",
        isAvailable: function(){
            if(trackerData.items.Bombs || trackerData.items.Hammer)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Diving Heart Piece Grotto",
        x: "44.0%",
        y: "32.0%",
        isAvailable: function(){
            if((trackerData.items.Bombs || trackerData.items.Hammer) && (trackerData.items.Scale >= 2 || trackerData.items.IronBoots))
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Talon's Chickens Minigame",
        x: "49.0%",
        y: "38.0%",
        isAvailable: function(){
            return "available";
        }
    },
    {
        name: "Epona's Song",
        x: "47.0%",
        y: "41.5%",
        isAvailable: function(){
            return "available";
        }
    },
    {
        name: "Lon Lon Heart Piece",
        x: "44.0%",
        y: "43.5%",
        isAvailable: function(){
            return "available";
        }
    },
    {
        name: "Underwater Bottle",
        x: "38.6%",
        y: "80.0%",
        isAvailable: function(){
            if(trackerData.items.Scale)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Lake Hylia Sun",
        x: "41.5%",
        y: "91.0%",
        isAvailable: function(){
            if(trackerData.items.Hookshot >= 2 && trackerData.items.Bow)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Diving in the Lab",
        x: "35.2%",
        y: "77.4%",
        isAvailable: function(){
            if(trackerData.items.Scale >= 2)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Lab Roof Heart Piece",
        x: "35.2%",
        y: "74.0%",
        isAvailable: function(){
            if(trackerData.items.Scale || trackerData.items.Bombs || trackerData.items.Hookshot)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Child Fishing",
        x: "45.0%",
        y: "78.0%",
        isAvailable: function(){
            if(trackerData.items.KokiriSword)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Adult Fishing",
        x: "46.9%",
        y: "78.0%",
        isAvailable: function(){
            if(trackerData.items.Hookshot || trackerData.items.Scale || trackerData.items.Bombs)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Gerudo Valley Hammer Rocks Chest",
        x: "22.0%",
        y: "38.0%",
        isAvailable: function(){
            if((trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.Hammer)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Gerudo Valley Crate Heart Piece",
        x: "24.0%",
        y: "41.5%",
        isAvailable: function(){
            return "available";
        }
    },
    {
        name: "Gerudo Valley Waterfall Heart Piece",
        x: "25.5%",
        y: "32.0%",
        isAvailable: function(){
            return "available";
        }
    },
    {
        name: "Gerudo Fortress Rooftop Chest",
        x: "18.8%",
        y: "23.0%",
        isAvailable: function(){
            if((trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.HoverBoots || trackerData.items.Hookshot >= 2)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Horseback Archery Game 1000pts",
        x: "21.7%",
        y: "28.0%",
        isAvailable: function(){
            if((trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.EponasSong && trackerData.items.Bow)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Horseback Archery Game 1500pts",
        x: "23.5%",
        y: "28.0%",
        isAvailable: function(){
            if((trackerData.items.EponasSong || trackerData.items.Hookshot >= 2) && trackerData.items.EponasSong && trackerData.items.Bow)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Haunted Wasteland Chest",
        x: "14.0%",
        y: "25.0%",
        isAvailable: function(){
            if(((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && ((trackerData.items.Dins || (trackerData.items.Fire && trackerData.items.Bow)) && trackerData.items.Magic))
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Requiem of Spirit",
        x: "04.5%",
        y: "21.5%",
        isAvailable: function(){
            if( (((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Desert Colossus Fairy",
        x: "08.0%",
        y: "19.0%",
        isAvailable: function(){
            if( ((((trackerData.items.EponasSong && trackerData.items.HoverBoots) || trackerData.items.Hookshot >= 2) && trackerData.items.Lens && trackerData.items.Magic) || trackerData.items.RequiemofSpirit) && trackerData.items.Bombs && trackerData.items.ZeldasLullaby)
                return "available";
            return "unavailable";
        }
    },    
    {
        name: "Desert Colossus Heart Piece",
        x: "06.4%",
        y: "23.5%",
        isAvailable: function(){
            if(trackerData.items.RequiemofSpirit && (trackerData.items.Bombs || trackerData.items.Scale))
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Frog Ocarina Game",
        x: "79.8%",
        y: "32.0%",
        isAvailable: function(){
            if((trackerData.items.Scale || trackerData.items.Bombs) && trackerData.items.ZeldasLullaby && trackerData.items.SariasSong && trackerData.items.SunsSong && trackerData.items.EponasSong && trackerData.items.SongofTime && trackerData.items.SongofStorms)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Frogs in the Rain",
        x: "78.0%",
        y: "32.0%",
        isAvailable: function(){
            if((trackerData.items.Scale || trackerData.items.Bombs) && trackerData.items.SongofStorms)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Zora River Heart Piece 1",
        x: "75.0%",
        y: "30.0%",
        isAvailable: function(){
            if(trackerData.items.Scale || trackerData.items.Bombs || trackerData.items.HoverBoots)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Zora River Heart Piece 2",
        x: "86.0%",
        y: "29.2%",
        isAvailable: function(){
            if(trackerData.items.Scale || trackerData.items.Bombs || trackerData.items.HoverBoots)
                return "available";
            return "unavailable";
        }
    },
    {
        name: "Zora River Grotto",
        x: "75.5%",
        y: "34.5%",
        isAvailable: function(){
            return "available";
        }
    },
]

