from django.urls import path

from arboverse_updated.management.models import DataUploader
from arboverse_updated.management.views import index # ,data_upload_view

app_name = "management"
urlpatterns = [
    path("", index, name="index"),
#    path("data_upload/", data_upload_view, name="data_upload"),
]
