# nimbus-weather-forecast

## Setup
Start the environment by running:

Create a .env file with the following inside:

```text
WEATHER_API_KEY=put-your-key-here
```

Then:

```shell
./start.sh
```

Api:

http://localhost:3000

Client web app:

http://localhost:5173


Changes to either api or client will automatically trigger a rebuild


## Tests

```shell
docker-compose exec api npx jest
```
