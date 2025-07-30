import io
import zipfile

from django.conf import settings
from django.contrib import admin
import csv
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template.response import TemplateResponse

from arboverse_updated.models import *
from django.urls import path, reverse
from django.http import HttpResponse
from django.contrib import admin
from django.utils.html import format_html
from django.apps import apps
from django.utils.translation import gettext_lazy as _
from django.contrib.admin.views.decorators import staff_member_required

from django.contrib.auth.models import User, Group
from allauth.account.models import EmailAddress, EmailConfirmation
from allauth.socialaccount.models import SocialApp, SocialAccount, SocialToken
from django.contrib.sites.models import Site

import csv
from django.contrib.admin import site as default_site

class GroupedAdminSite(admin.AdminSite):
    index_template = "admin/index.html"
    site_header = "Arboverse Admin"
    site_title = "Arboverse Admin Portal"
    index_title = "Welcome to Arboverse DB"

    def has_permission(self, request):
        """
        Required to allow access to the admin site.
        """
        return request.user.is_active and request.user.is_staff

    def get_app_list(self, request, app_label=None):
        """
        Builds the grouped list of models for the admin index.
        """
        app_dict = self._build_app_dict(request)
        admin_reorder = getattr(settings, "ADMIN_REORDER", [])

        ordered = []

        if app_label:
            app_dict = {
                app_label: app_dict.get(app_label)
            }

        for group in admin_reorder:
            title = group.get("label", "")
            model_paths = group.get("models", [])

            group_models = []
            for full_model_path in model_paths:
                try:
                    app_label_part, model_name_part = full_model_path.split(".")
                    model = apps.get_model(app_label_part, model_name_part)
                    if model not in self._registry:
                        continue

                    model_admin = self._registry[model]
                    opts = model._meta
                    model_dict = {
                        "name": opts.verbose_name_plural.title(),
                        "object_name": opts.object_name,
                        "admin_url": reverse(f"admin:{opts.app_label}_{opts.model_name}_changelist"),
                        "perms": model_admin.get_model_perms(request),
                    }

                    if model_dict["perms"].get("change", False):
                        group_models.append(model_dict)
                except Exception:
                    continue

            if group_models:
                first_model = group_models[0]
                first_app_label = first_model['admin_url'].split('/')[2]

                ordered.append({
                    "name": title,
                    "app_label": first_app_label,
                    "app_url": first_model["admin_url"],
                    "models": group_models,
                })

        return ordered if ordered else sorted(app_dict.values(), key=lambda x: x["name"].lower())

    def index(self, request, extra_context=None):
        """
        Renders the main admin index page with the custom grouped app list.
        The authentication check is handled automatically by the admin site's framework.
        """
        context = {
            **self.each_context(request),
            'app_list': self.get_app_list(request),
            **(extra_context or {}),
        }
        return TemplateResponse(request, self.index_template, context)

custom = GroupedAdminSite(name="admin")


def download_all_data(request):
    app_label = 'arboverse_updated'  # your app name here

    all_models = [m for m in apps.get_models() if m._meta.app_label == app_label]

    # Collect all fields from these models
    field_set = set()
    model_field_map = {}

    for model in all_models:
        field_names = [f.name for f in model._meta.fields]
        model_field_map[model] = field_names
        field_set.update(field_names)

    all_fields = sorted(field_set)
    columns = ['app_label', 'model_name'] + all_fields

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=arboverse_all_data.csv'
    writer = csv.writer(response)
    writer.writerow(columns)

    for model in all_models:
        model_name = model._meta.model_name
        app_label = model._meta.app_label
        field_names = model_field_map[model]

        for obj in model.objects.all():
            row = [app_label, model_name]
            for field in all_fields:
                # If model has field, get value, else empty string
                row.append(str(getattr(obj, field, '')) if field in field_names else '')
            writer.writerow(row)

    return response


def download_all_csvs(request):
    memory_file = io.BytesIO()
    with zipfile.ZipFile(memory_file, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for model in apps.get_models():
            model_name = model._meta.label.replace('.', '_') + '.csv'
            buffer = io.StringIO()
            writer = csv.writer(buffer)

            fields = [field.name for field in model._meta.fields]
            writer.writerow(fields)

            for obj in model.objects.all().values_list(*fields):
                writer.writerow(obj)

            zip_file.writestr(model_name, buffer.getvalue())
            buffer.close()

    memory_file.seek(0)
    response = HttpResponse(memory_file.getvalue(), content_type='application/zip')
    response['Content-Disposition'] = 'attachment; filename=all_models.zip'
    return response


# This method is for the ability to download on a row by row basis.
def export_as_csv(modeladmin, request, queryset):
    """
    Generic CSV export admin action.
    """
    meta = modeladmin.model._meta
    field_names = [field.name for field in meta.fields]

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename={meta.app_label}_{meta.model_name}.csv'
    writer = csv.writer(response)

    writer.writerow(field_names)
    for obj in queryset:
        writer.writerow([getattr(obj, field) for field in field_names])

    return response


export_as_csv.short_description = "Export selected as CSV"


class ExportCsvAdmin(admin.ModelAdmin):
    actions = [export_as_csv]
    change_list_template = "admin/change_list.html"

# Import records. The second in the register allows you to do record downloading.
custom.register(BloodMeal, ExportCsvAdmin)
custom.register(Borning, ExportCsvAdmin)
custom.register(Country, ExportCsvAdmin)
custom.register(Disease, ExportCsvAdmin)
custom.register(FeedingPeriod, ExportCsvAdmin)
custom.register(Habitat, ExportCsvAdmin)
custom.register(Landscape, ExportCsvAdmin)
custom.register(Location, ExportCsvAdmin)
custom.register(VectorFamily, ExportCsvAdmin)
custom.register(VectorGenus, ExportCsvAdmin)
custom.register(VectorOrder, ExportCsvAdmin)
custom.register(VectorSpecies, ExportCsvAdmin)
custom.register(VectorSpeciesHabitat, ExportCsvAdmin)
custom.register(VectorSpeciesLocation, ExportCsvAdmin)
custom.register(VectorSpeciesLandscape, ExportCsvAdmin)
custom.register(VectorSpeciesBloodMeal, ExportCsvAdmin)
custom.register(VectorSpeciesFeedingPeriod, ExportCsvAdmin)
custom.register(VectorSubFamily, ExportCsvAdmin)
custom.register(Virus, ExportCsvAdmin)
custom.register(VirusFamily, ExportCsvAdmin)
custom.register(VirusGenus, ExportCsvAdmin)
custom.register(VirusVector, ExportCsvAdmin)

custom.register(User, admin.ModelAdmin)  # or your own custom admin
custom.register(Group, admin.ModelAdmin)
custom.register(Site, admin.ModelAdmin)
custom.register(EmailAddress, admin.ModelAdmin)
custom.register(EmailConfirmation, admin.ModelAdmin)

custom.register(SocialAccount, admin.ModelAdmin)
custom.register(SocialApp, admin.ModelAdmin)
custom.register(SocialToken, admin.ModelAdmin)

admin.site.register(BloodMeal, ExportCsvAdmin)
admin.site.register(Borning, ExportCsvAdmin)
admin.site.register(Country, ExportCsvAdmin)
admin.site.register(Disease, ExportCsvAdmin)
admin.site.register(FeedingPeriod, ExportCsvAdmin)
admin.site.register(Habitat, ExportCsvAdmin)
admin.site.register(Landscape, ExportCsvAdmin)
admin.site.register(Location, ExportCsvAdmin)
admin.site.register(VectorFamily, ExportCsvAdmin)
admin.site.register(VectorGenus, ExportCsvAdmin)
admin.site.register(VectorOrder, ExportCsvAdmin)
admin.site.register(VectorSpecies, ExportCsvAdmin)
admin.site.register(VectorSpeciesHabitat, ExportCsvAdmin)
admin.site.register(VectorSpeciesLocation, ExportCsvAdmin)
admin.site.register(VectorSpeciesLandscape, ExportCsvAdmin)
admin.site.register(VectorSpeciesBloodMeal, ExportCsvAdmin)
admin.site.register(VectorSpeciesFeedingPeriod, ExportCsvAdmin)
admin.site.register(VectorSubFamily, ExportCsvAdmin)
admin.site.register(Virus, ExportCsvAdmin)
admin.site.register(VirusFamily, ExportCsvAdmin)
admin.site.register(VirusGenus, ExportCsvAdmin)
admin.site.register(VirusVector, ExportCsvAdmin)
