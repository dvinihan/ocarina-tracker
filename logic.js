let ganonlogic = 'Open';

function isBridgeOpen() {
    switch (ganonlogic) {
        case "Open":
            return true;
        case "Vanilla":
            return (trackerData.items['ShadowMedallion'] && trackerData.items['SpiritMedallion']);
        case "Medallions":
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