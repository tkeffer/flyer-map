// Extract data out of the parsed JSON object.
var getInfoDict = function(signalk_obj){
    const values = signalk_obj.updates[0].values;
    const infoDict = {}
    // Search for the paths we know about "navigation.position":
    for (let i in values) {
        if (values[i].path === 'navigation.position') {
            infoDict['latLon'] = values[i].value;
        }
        else if (values[i].path === 'navigation.speedOverGround') {
            infoDict['speedOverGround'] = values[i].value;
        }
        else if (values[i].path === 'navigation.courseOverGroundTrue') {
            // Convert from radians to degrees:
            infoDict['courseOverGroundTrue'] = values[i].value * 57.295779513;
        }
        else if (values[i].path === 'environment.depth.belowTransducer') {
            infoDict['transducerDepth'] = values[i].value;
        }
        else if (values[i].path === 'environment.water.temperature') {
            // Convert from Kelvin to Celsius
            infoDict['waterTemperature'] = values[i].value - 273.15;
        }
    }
    return infoDict;

}