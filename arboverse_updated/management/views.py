# -*- config: utf-8 -*-
from django.forms import modelformset_factory
from django.forms import ModelForm
from django.shortcuts import render
from .forms import DataUploadForm
from .models import DataUploader
import logging
logger = logging.getLogger(__name__)

def index(request):

    DataUploadFormSet = modelformset_factory(DataUploader,
                                             fields=['datafile','notes'])

    if request.method == 'POST':
        formset = DataUploadFormSet(request.POST, request.FILES)
        if formset.is_valid():
            logger.info("management/index.html POST form is valid")
            logger.info(f"request.FILES={{repr(request.FILES)")
        else:
            logger.info("management/index.html POST form is INVALID")
            logger.info("request.FILES="+repr(request.FILES))
        
            
    return render(request, 'management/index.html', {'form': DataUploadForm})



#

#data_upload_view = DataUploadForm.as_view()

