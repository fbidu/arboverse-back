# Arboverse

Arboviruses geographic info

## Quick setup
Note: when running commands in docker, your .env needs to have the PGSQL host as db. When running code from the terminal here, you need the .env to reflect the host as localhost.

### Running for the First Time

0. Clone this project
1. Install [Docker and Docker Compose](https://docs.docker.com/compose/install/)
2. Navigate to the project root.
3. Populate the values of `.env.sample` to match your desired configuration, and remove .sample from the filename. 
4. Run `docker-compose up --build -d`.
5. Run the command `py schema_populator.py` once you have verified that the db is running to build out the full database.

With that, your application should be running. You may access it at http://localhost:8000. As long as docker continues 
to run, this service will run in the background. When docker is restarted, the service too should be restarted automatically.
If not, you can rerun the command.

## Seeing the Logs

Got stuck somewhere? You can see the logs with `docker-compose logs`.

If you're only interested in Django's logs, run `docker-compose logs web`.
If you're only interested in database's logs, run `docker-compose logs db`.

## Using the Shell

Our Django  setup comes with a very handy [super shell](https://django-extensions.readthedocs.io/en/latest/shell_plus.html). It is useful to interact with our code in a REPL
shell.

Run it with `docker-compose run --rm web python manage.py shell_plus`

## Running Tests

`docker-compose run --rm web pytest`

## Developing Locally

0. Create a virtual environment `python -m venv env`
1. Activate it `source env/bin/activate`
2. Install the requirements with `pip install -r requirements/requirements.txt`

## Setup pre-commit

0. Install [pre-commit](https://pre-commit.com/)
1. Run `pre-commit install -t pre-commit -t pre-push`
2. Optional: you may run all hooks with `pre-commit run --all`


## Prod Setup
Run `python manage.py collectstatic` and ensure that the resulting folder will be web-accessible.


## Creating a Virus Layer
The `virus_geojson_builder.py` contains code to generate new GeoJSON layers for displaying the presence of viruses in countries around the world.
When run, the program will look for a GeoJSON folder and a shapefile which describes the countries around the world in a way that can be broken down
into geometries. In my implementation, I used free maps from [Natural Earth Data](https://www.naturalearthdata.com/) to source my shapefile.

The script also expects an excel document following the format of `The global distribution of arbovirus diversity - OFFICIAL.xlsx` included in this repo.

Once you have the resulting GeoJSON file, you can go to mapbox and upload the data as a new layer for the map. The script will have associated each virus to the ISO of 
each country which Mapbox can interpret to build a layer for you. From there, you can use the id to render a layer out in `/arboverse_updated/static/js/mapboxutil.js`.
