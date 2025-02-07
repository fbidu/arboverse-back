from django import forms
from arboverse_updated.management.models import DataUploader

class DataUploadForm(forms.ModelForm):

    class Meta:
        model = DataUploader
        fields = "__all__"

#    template   = "management/data_upload.html"

