from django.contrib import admin
from django.core.files.storage import FileSystemStorage
from django.db import models

dataloc = FileSystemStorage(location="/media")

class DataUploader(models.Model):
    
    datafile = models.FileField(storage=dataloc)
    notes    = models.TextField(blank=True, null=True)

    class Meta:
        ordering=["datafile"]

    def __str__(self):
        return str(self.datafile.name)
