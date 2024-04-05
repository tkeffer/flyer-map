// Extract the position out of the parsed JSON object.
var getPosition = function(signalk_obj){
    const values = signalk_obj.updates[0].values;
    // Search for the path "navigation.position":
    for (let i in values) {
        if (values[i].path === 'navigation.position') {
            const latLon = values[i].value;
            return latLon;
        }
    }
    return null;
}