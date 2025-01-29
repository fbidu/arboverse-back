#!/bin/bash

# This script rebuilds the services from the codebase.
#
# It requires an environment file, .env, to set
# environment variables for the system.  A default
# set of values is contained in the dotenv.dev file.
# Change these for production systems.
#
# First, it rebuilds the Docker service containers from their
# specifications.
#
# It removes the existing database, recreates it from the
# current code, and repopulates it from the Excel data.
#
# Finally, it restarts the web server.
#
# See the comments at the end to enable the administrative
# interface by manually creating the Django superuser.
#

if [ -f .env ]; then
    source .env
else
    read -p "WARNING - failed to find .env to set environment. Continue (Y/n)? "
    if [[ "${#REPLY}" != 0 &&  "${REPLY}" != "y" && "${REPLY}" != "Y" ]];
    then
        exit "Could not source .env";
    fi
fi

# This script removes existing databases in the Postgres container
# and rebuilds everything from scratch.

docker compose down --remove-orphans \
    && docker compose rm -f -s

# Insure we get a clean build
# Remove containers
for image in $( docker ps -a | awk '$2 == "arboverse-back-web" {print $1;}'); do docker image rm "$image"; done

# Remove old images
for image in $( docker image ls -a | awk '$1 == "arboverse-back-web" {print $3;}'); do docker image rm "$image"; done

# Rebuild and start Postgres
docker compose build && \
    docker compose up -d --remove-orphans db 

sleep 5

# Remove old DB instance and recreate

docker compose exec db psql --dbname=postgres --host=${PGHOST} --port=${PGPORT} --username=${PGUSER} -c "DROP DATABASE ${PGDATABASE}"
docker compose exec db psql --dbname=postgres --host=${PGHOST} --port=${PGPORT} --username=${PGUSER} -c "\\l"
docker compose exec db psql --dbname=postgres --host=${PGHOST} --port=${PGPORT} --username=${PGUSER} -c "CREATE DATABASE ${PGDATABASE}"
docker compose exec db psql --dbname=postgres --host=${PGHOST} --port=${PGPORT} --username=${PGUSER} -c "\\l"


# Rebuild database fro scratch

docker compose up -d web
sleep 3
docker compose exec web python manage.py makemigrations \
    && docker compose exec web python manage.py migrate \
    && docker compose exec web python manage.py import_data --verbosity 3 --sheet-name "main_arbovirus" "The global distribution of arbovirus diversity - OFFICIAL.xlsx" Arbovector_database.csv

#    && docker compose exec web python schema_populator.py



# Start web server
# docker compose stop web

if [ "$?" == "0" ]; then
    echo "Starting Arboverse web service"
    docker compose run -d --remove-orphans web python manage.py runserver 0.0.0.0:8000
else
    echo "Error encountered while rebuilding database"
fi

# Run the following command manually 
# to create a super user for administrative purposes.
#
# Once you've created the supersuer, you should be able
# to go to http://localhost:8000/admin/
# to see the administrative interface
#
# $ docker compose exec web python manage.py createsuperuser
# <admin_user>
# <admin_email>
# <admin_password>
# <admin_password>

