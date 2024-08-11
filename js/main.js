const unitInfo = {
    "navigation.position.latitude": {
        name: "Latitude",
        unit: "º"
    },
    "navigation.position.longitude": {
        name: "Longitude",
        unit: "º"
    },
    "navigation.speedOverGround": {
        name: "Speed over ground",
        unit: " kn"
    },
    "navigation.courseOverGroundTrue": {
        name: "Course over ground",
        unit: "ºT"
    },
    "environment.depth.belowTransducer": {
        name: "Depth",
        unit: " m"
    },
    "environment.water.temperature": {
        name: "Water temperature",
        unit: "ºC"
    }
}

/*
    A SignalK object looks like:
    {
        "context": "vessels.urn:mrn:imo:mmsi:367199590",
        "updates": [{
            "timestamp": "2024-08-07T22:49:02.000Z",
            "$source": "Velocityyd.YD",
            "values": [{"path": "navigation.position", "value": {"longitude": -122.65223, "latitude": 45.601395}}]
        }]

    or like

    {
        "context": "vessels.urn:mrn:imo:mmsi:367199590",
        "updates": [{
            "timestamp": "2024-08-11T20:52:41.018Z",
            "$source": "velocity2000.127",
            "values": [{"path": "navigation.speedOverGround", "value": 0}]
        }]
    }
    }
 */


// Extract data out of the parsed JSON object.
var getInfoDicts = function (signalk_obj) {

    let infoDicts = [];
    for (let update of signalk_obj.updates) {
        const infoDict = {}
        infoDict['timestamp'] = dayjs(update.timestamp)
        console.log("update.values=", update.values)
        for (let value of update.values) {
            // Special treatment for navigation position because it has two values: latitude and longitude
            if (value.path === 'navigation.position') {
                infoDict['navigation.position.latitude'] = {
                    value: value.value.latitude
                }
                infoDict['navigation.position.longitude'] = {
                    value: value.value.longitude
                }
            } else {
                infoDict[value.path] = {
                    value: value.value
                }
            }
        }
        infoDicts.push(infoDict)
    }

    return infoDicts;

}