import csp
import os
from pathlib import Path
from dotenv import load_dotenv
import logging
logger = logging.getLogger(__name__)

load_dotenv()

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
APP_DIR = BASE_DIR / "arboverse_updated"

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# GENERAL
# ------------------------------------------------------------------------------
# Local time zone. Choices are
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# though not all of them may be available with every OS.
# In Windows, this must be set to your system time zone.
TIME_ZONE = "UTC"
# https://docs.djangoproject.com/en/dev/ref/settings/#language-code
LANGUAGE_CODE = "en-us"
# https://docs.djangoproject.com/en/dev/ref/settings/#site-id
SITE_ID = 1
# https://docs.djangoproject.com/en/dev/ref/settings/#use-i18n
USE_I18N = True
# https://docs.djangoproject.com/en/dev/ref/settings/#use-l10n
USE_L10N = True
# https://docs.djangoproject.com/en/dev/ref/settings/#use-tz
USE_TZ = True
# https://docs.djangoproject.com/en/dev/ref/settings/#locale-paths
LOCALE_PATHS = [str(BASE_DIR / "locale")]

DEBUG = os.getenv('DEBUG',False)  # set to false in production, STATIC_ROOT below should be a web-accessible folder for static files

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST':     os.environ['PGSQL_HOST'],
        'NAME':     os.environ['PGSQL_DB'],
        'PASSWORD': os.environ['PGSQL_PASS'],
        'PORT':     os.environ['PGSQL_PORT'],
        'USER':     os.environ['PGSQL_USER'],
    }
}

ALLOWED_HOSTS = ['*', 'localhost', '127.0.0.1']  # probably should not leave this enabled in production

DJANGO_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # "django.contrib.humanize", # Handy template tags
    "django.contrib.admin",
    "django.forms",
    "rest_framework",
]
THIRD_PARTY_APPS = [
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "crispy_forms",
    "csp",
    "fontawesomefree",
]

LOCAL_APPS = [
    'arboverse_updated',  # my app
    #"arboverse.users.apps.UsersConfig",
    #"arboverse.arbovirus.apps.ArbovirusConfig",
    # Your stuff: custom apps go here
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# URLS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#root-urlconf
ROOT_URLCONF = "config.urls"
# https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = "config.wsgi.application"

# ADMIN
# ------------------------------------------------------------------------------
# Django Admin URL.
ADMIN_URL = "admin/"
# https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = [("Noah Perry", "noah.perry@uky.edu"),
          ("Steve Roggenkamp","steve.roggenkamps@uky.edu")]
# https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS

# MIDDLEWARE
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#middleware
MIDDLEWARE = [
    "allauth.account.middleware.AccountMiddleware",
    "csp.middleware.CSPMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.common.BrokenLinkEmailsMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
]

# STATIC
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#static-root
STATIC_ROOT = str(BASE_DIR / "staticfiles")
# https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = "/static/"
# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#std:setting-STATICFILES_DIRS
STATICFILES_DIRS = [str(APP_DIR) + "/static"]
# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
    ]
}


# MEDIA
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = str(APP_DIR / "media")
# https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = "/media/"

# TEMPLATES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES = [
    {
        # https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        # https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
        "DIRS": [str(APP_DIR / "templates")],
        "OPTIONS": {
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-loaders
            # https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types
            "loaders": [
                "django.template.loaders.filesystem.Loader",
                "django.template.loaders.app_directories.Loader",
            ],
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
                "arboverse_updated.utils.context_processors.settings_context",
            ],
        },
    }
]

# LOGGING
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#logging
# See https://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s "
            "%(process)d %(thread)d %(message)s"
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        }
    },
    "root": {"level": "DEBUG", "handlers": ["console"]},
}

# CONTENT SECURITY POLICY
# ------------------------------------------------------------------------------
# https://www.w3.org/TR/CSP/
# CONTENT SECURITY POLICY header settings communicates security policies from
# the server to the user agent to mitigate potential security risks.

# django-csp 3.8

CSP_DEFAULT_SRC               = ["https://ka-f.fontawesome.com/","'self'",]
CSP_FONT_SRC                  = ["https://kit.fontawesome.com/","https://fonts.gstatic.com/","https://fonts.googleapis.com/","'self'",]
CSP_FRAME_ANCESTORS           = ["'self'"]
# CSP_REQUIRE_TRUSTED_TYPES_FOR = ["'script'",]   # not well supported yet by browsers
CSP_SCRIPT_SRC                = ["https://code.jquery.com/","https://kit.fontawesome.com/","'self'",]
CSP_STYLE_SRC                 = ["https://kit.fontawesome.com/","https://fonts.gstatic.com/","https://fonts.googleapis.com/","'self'",]
CSP_UPGRADE_INSECURE_REQUESTS = True

# CSP-4.0 from csp.constants import NONE, SELF
# 
# CONTENT_SECURITY_POLICY = {
#     "EXCLUDE_URL_PREFIXES": [NONE],
#     "DIRECTIVES": {
#         "default-src":     [SELF],
#         "frame-ancestors": [SELF],
#         "form-action":     [SELF],
#         "report-uri":      "/csp-report/",
#     },
# }
# 
# CONTENT_SECURITY_POLICY_REPORT_ONLY = {
#     "EXCLUDE_URL_PREFIXES": ["/excluded-path/"],
#     "DIRECTIVES": {
#         "default-src":               [NONE],
#         "connect-src":               [SELF],
#         "img-src":                   [SELF],
#         "form-action":               [SELF],
#         "frame-ancestors":           [SELF],
#         "script-src":                [SELF],
#         "style-src":                 [SELF],
#         "upgrade-insecure-requests": True,
#         "report-uri":                "/csp-report/",
#     },
# }
# 
#
# logger.warn("config/settings.py read")
# logger.warn(f"DEBUG=${DEBUG}")
# logger.warn(f"DB NAME=${os.environ['PGSQL_DB']}")
# logger.warn(f"DB USER=${os.environ['PGSQL_USER']}")
# logger.warn(f"DB PASS=${os.environ['PGSQL_PASS']}")
