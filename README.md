# How to use

## General data flow:

Transducer -> NMEA 2000 -> gateway -> SignalK server -> MQTT broker -> client websocket

## MQTT

Install an MQTT broker:

    sudo apt install mosquitto
    # Not essential, but useful:
    sudo apt install mosquitto-clients

Edit the file `/etc/mosquitto/mosquitto.conf` and add the following lines

    listener 1883
    listener 8080
    protocol websockets
    allow_anonymous true

## Start the SignalK server

    signalk-server

or, for demo data

    signalk-server --sample-n2k-data

## Configure SignalK server

Figure out which topics you want to watch. You can discover available data streams under the "Data Browser" tab. For
example, `navigation.position` and `environment.depth.belowTransducer` would give location and depth (below transducer),
respectively.

The plugin [signalk-mqtt-gw](https://github.com/tkurki/signalk-mqtt-gw) should be installed in the SignalK server.

    cd ~/.signalk
    npm install signalk-mqtt-gw

Then configure the plugin in the signalk admin webpage, nominally http://localhost:3000/. Tell the MQTT plugins which
topics you wish to publish to the MQTT broker. Look under "Server", then "Plugin Config", then "Signal K - MQTT Push".
Add any interesting topics.

Double check that the topics are getting published:

    mosquitto_sub -h localhost -t '#'

The `-t '#'` says that you want to listen to all topics. 
