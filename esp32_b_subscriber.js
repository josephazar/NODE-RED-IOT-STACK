const mqtt = require('mqtt');

// Connect to the MQTT broker (replace 'localhost' with the Docker broker IP if needed)
const client = mqtt.connect('mqtt://localhost:1883');  // Use 'mosquitto' if on Docker network with the same service name

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    
    // Subscribe to the LED control topic
    client.subscribe('sensor/esp32/led', (err) => {
        if (!err) {
            console.log('Subscribed to topic: sensor/esp32/led');
        } else {
            console.error('Subscription error:', err);
        }
    });
});

client.on('message', (topic, message) => {
    // Parse the received message as a boolean (assuming message is 'true' or 'false')
    const ledStatus = message.toString() === 'true';
    
    if (ledStatus) {
        console.log("Turn on LED");
    } else {
        console.log("Turn off LED");
    }
});

client.on('error', (err) => {
    console.error('MQTT connection error:', err);
});
