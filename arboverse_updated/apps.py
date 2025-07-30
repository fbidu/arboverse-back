from django.apps import AppConfig
from django.conf import settings


class ArboverseUpdatedConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'arboverse_updated'


    def ready(self):
        from django.apps import apps

        from .admin import custom
        custom.index_template = 'admin/index.html'

        vectors = []
        viruses = []
        others = []
        users = []
        socialaccount = []

        for model in apps.get_models():
            model_label = f"{model._meta.app_label}.{model.__name__}"
            name_lower = model.__name__.lower()

            if "vector" in name_lower:
                vectors.append(model_label)
            elif "virus" in name_lower:
                viruses.append(model_label)
            elif model._meta.app_label == "auth":
                users.append(model_label)
            elif model._meta.app_label == "account":
                users.append(model_label)
            elif model._meta.app_label == "socialaccount":
                socialaccount.append(model_label)
            elif model._meta.app_label == "sites":
                socialaccount.append(model_label)
            else:
                others.append(model_label)

        # Save this on settings for the reorder module
        settings.ADMIN_REORDER = [
            {
                "app": "arboverse_updated",
                "label": "Vectors",
                "models": vectors,
            },
            {
                "app": "arboverse_updated",
                "label": "Viruses",
                "models": viruses,
            },
            {
                "app": "arboverse_updated",
                "label": "Others",
                "models": others,
            },
            {
                "app": "arboverse_updated",
                "label": "Users",
                "models": users
            },
            {
                "app": "arboverse_updated",
                "label": "Social Accounts",
                "models": socialaccount
            }
        ]

