# Node-Red & IOT Stack Project

This project sets up a complete IoT data pipeline using Docker containers. It includes an MQTT broker (Mosquitto), a Node-RED instance for data processing, an InfluxDB database for data storage, and a Grafana instance for data visualization. Additionally, it includes two Node.js scripts to simulate ESP32 devices publishing and subscribing to MQTT topics.

## Project Structure

## Services

- **Mosquitto**: MQTT broker for message passing.
- **Node-RED**: Flow-based development tool for visual programming.
- **InfluxDB**: Time-series database for storing sensor data.
- **Grafana**: Data visualization and monitoring tool.

## Setup

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js and npm installed.

### Steps

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install Node.js dependencies:
    ```sh
    npm install
    ```

3. Start the Docker containers:
    ```sh
    docker-compose up -d
    ```

4. Verify that the services are running:
    - Mosquitto: `localhost:1883`
    - Node-RED: `localhost:1880`
    - InfluxDB: `localhost:8086`
    - Grafana: `localhost:3000` (default login: `admin/admin`)

## Node.js Scripts

### `esp32_a.js`

This script simulates an ESP32 device publishing temperature and humidity data to the MQTT broker.

```js
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
```

### `esp32_b_subscriber.js`

This script simulates an ESP32 device subscribing to an MQTT topic to control an LED.

```js
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
```

### Additional Notes
The mosquitto.conf file allows anonymous connections on port 1883.


