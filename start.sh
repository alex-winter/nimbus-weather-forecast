#!/bin/bash

echo "Clearing previous build"
docker-compose down -v --remove-orphans
docker network prune -f

echo "Making new build"
docker-compose up --build -d

echo "Waiting for database to be ready..."
until docker-compose exec database mysqladmin ping -h "localhost" --silent; do
    echo "MySQL is unavailable - sleeping"
    sleep 2
done

echo "database ready, running migrations"
docker-compose exec api npx knex migrate:latest
