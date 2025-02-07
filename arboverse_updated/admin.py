from django.contrib import admin
import logging
logger = logging.getLogger(__name__)


from arboverse_updated.models import BloodMeal, \
                                     Borning, \
                                     Country, \
                                     DataUpload, \
                                     Disease, \
                                     FeedingPeriod,\
                                     Habitat, \
                                     Landscape, \
                                     Location, \
                                     VectorFamily, \
                                     VectorGenus, \
                                     VectorOrder, \
                                     VectorSpecies, \
                                     VectorSubFamily, \
                                     Virus, \
                                     VirusFamily, \
                                     VirusGenus, \
                                     VirusVector

# Register your models here.

class DataUploadAdmin(admin.ModelAdmin):

    list_display = ["datafile", "notes"]

    @admin.action(description="Reload application data file")
    def reload_data(self, request, queryset):

        logger.info(f"/admin/arboverse_updated/dataupload/ action: process {repr(queryset[0].datafile)}")
        
    actions = ["reload_data"]


admin.site.register(BloodMeal)
admin.site.register(Borning)
admin.site.register(Country)
admin.site.register(DataUpload,DataUploadAdmin)
admin.site.register(Disease)
admin.site.register(VirusGenus)
admin.site.register(VirusVector)

