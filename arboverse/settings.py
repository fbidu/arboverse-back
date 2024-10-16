import os

BASE_DIR = os.path.dirname(__file__)

INSTALLED_APPS = (
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.contenttypes",
    "django.contrib.admin",
    "crispy_forms",
    "arboverse",
    "config"
)

DATABASES = {
    # Raises ImproperlyConfigured Exception
    # if DATABASE_URL Not in os.environ and
    # the "default" argument is not defined.
    # The DATABASE_URL environment variables
    # expect a value in the following format:
    # DATABASE_URL=postgres://user:password@hostname_or_ip:port/database_name
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('PGSQL_DB'),
        'USER': os.getenv('PGSQL_USER'),
        'PASSWORD': os.getenv('PGSQL_PASS'),
        'HOST': os.getenv('PGSQL_HOST'),
        'PORT': os.getenv('PGSQL_PORT'),
    }
}

MIDDLEWARE_CLASSES = (
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
)

ROOT_URLCONF = "crispy_forms.tests.urls"
CRISPY_CLASS_CONVERTERS = {"textinput": "textinput textInput inputtext"}
SECRET_KEY = "secretkey"
SITE_ROOT = os.path.dirname(os.path.abspath(__file__))


TEMPLATE_DEBUG = True
TEMPLATE_DIRS = (os.path.join(BASE_DIR, "templates"),)

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": TEMPLATE_DIRS,
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                # Insert your TEMPLATE_CONTEXT_PROCESSORS here or use this
                # list if you haven't customized them:
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.debug",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
            ],
            "debug": TEMPLATE_DEBUG,
        },
    },
]
