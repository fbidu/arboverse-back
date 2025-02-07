# -*- config: utf-8 -*-

from django.shortcuts import render
from .forms import DataUploadForm

def index(request):
 
    return render(request, 'management/index.html', {'form': DataUploadForm()})



# from django.forms import ModelForm
# from arboverse_updated.management.models import DataUploader

# class DataUploadForm(ModelForm):

#    class Meta:
#        model = DataUploader
#        fields = ["datafile","note"]
#    model = data_uploader

#    template   = "management/data_upload.html"


# data_upload_view = DataUploadView.as_view()

