from django.contrib import admin

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

    @admin.action(description="Save data file")
    def save_data(modeladmin, request, queryset):
        data = request.FILES["datafile"]
        
    actions = [save_data]


admin.site.register(BloodMeal)
admin.site.register(Borning)
admin.site.register(Country)
admin.site.register(DataUpload,DataUploadAdmin)
admin.site.register(Disease)
admin.site.register(VirusGenus)
admin.site.register(VirusVector)

