const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
    console.log("Connected to MQTT broker!");
    setInterval(()=>{
        const temperature = 
            Math.floor(Math.random() * (30-20)+20).toFixed(2);
        const humidity = (Math.floor(Math.random() * (80-50)+50)).toFixed(2);
        const payload = JSON.stringify({temperature, humidity});
        client.publish('sensor/esp32/a', payload);
        console.log('Published: ', payload);
    },10000);
});

client.on('error', (error) => {
    console.log('MQTTT connection error: ', error);
});