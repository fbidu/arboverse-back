# Arboverse

Arboviruses geographic info

## Quick setup

### Running for the First Time

0. Clone this project
1. Install [Docker and Docker Compose](https://docs.docker.com/compose/install/)
2. Once in its root, run `docker-compose build`
3. Start the database with `docker-compose up -d db`
4. Then `docker-compose run --rm web sh -c 'python manage.py sqlcreate && python manage.py migrate'`
5. And finally `docker-compose up -d`. Every other time, this is all you'll need.

### Running every other time

When you're working, just run `docker-compose up -d`. **The system will be
available at [http://127.0.0.1:8000](http://127.0.0.1:8000)**

This will run the project in the background. To stop,
do `docker-compose down`.

If you do not want to run it in the background,
ommit the `-d` flag, `docker-compose up`

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
2. Install the requirements with `pip install -r requirements/local.txt`

## Setup pre-commit

0. Install [pre-commit](https://pre-commit.com/)
1. Run `pre-commit install`
