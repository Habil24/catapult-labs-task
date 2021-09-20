## The Task Implementation Details

### General
The service interface was completed by queue interface without DB. JSON 
data was used in order to mock the DB. 
Note that, in order to identify data modification on chart easily and for simplicity, the data is created
randomly for last 10 days.

### Data Flow
The inital mocked data is fetched from `/meterReadings` endpoint(for mocked db). Then
in each 10 seconds the queue publisher generates a new meter data which was received
by consumer. Finally, the consumer sends it to front-end by socket.

## Tests
Front-End contains two test files in `/gas-consumption-dashboard/src/__test__` that are for App and Dashboard components.
Please execute command `npm run test`, to run tests.

## Setting up

### Dependencies
* RabbitMQ 3.9.5 (Should be up & running)
* NPM 
* Docker

## RabbitMQ Message Broker
Make sure Docker is installed and run the command below, in order to use RabbitMQ 
before setting up back-end and front-end:
`docker run -d --hostname my-rabbit -p 5672:5672 --name some-rabbit rabbitmq`

### Back-end: Meter Reading Service
* CD into the `meter-reading service` directory
* Run `npm install`
* Make sure port `3000` is available on your machine
* Run `npm start`

### Front-end: Gas Consumption dashboard
* CD into the `gas-consumption-dashboard` directory
* Run `npm install`
* Make sure port `3001` is available on your machine    
* Run `npm start`
* Visit `localhost:3001`
