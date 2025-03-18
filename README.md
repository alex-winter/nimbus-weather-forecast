# nimbus-weather-forecast

## Setup

First add a .env file to the api folder

```text
WEATHER_API_KEY=paste your key here
```


Start the environment by running:

```shell
./start.sh
```

Api: http://localhost:3000

Client: http://localhost:5173


Changes to either api or client will automatically trigger a rebuild


## Tests

```shell
docker-compose exec api npx jest
```
