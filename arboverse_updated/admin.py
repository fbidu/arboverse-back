from django.contrib import admin
import logging
logger = logging.getLogger(__name__)


from arboverse_updated.models import BloodMeal, \
                                     Borning, \
                                     Country, \
                                     DataReload, \
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

from arboverse_updated.management.commands.import_data import Command

# Register your models here.

class DataReloadAdmin(admin.ModelAdmin):

    list_display = ["uploaded", "virusfile", "vectorfile", "notes"]

    @admin.action(description="Reload application data file")
    def reload_data(self, request, queryset):

        data_reload_value = queryset[0]
        logger.info(f"/admin/arboverse_updated/dataupload/ action: process virus file:  {repr(data_reload_value)}")
        logger.info(f"/admin/arboverse_updated/dataupload/ action: process virus file:  {repr(queryset[0].virusfile.path)}")
        logger.info(f"/admin/arboverse_updated/dataupload/ action: process vector file: {repr(queryset[0].vectorfile.path)}")

        # delete all existing ojects from database
        # VirusVector.objects.all().delete()
        # VectorSpecies.objects.all().delete()
        # Virus.objects.all().delete()
        # BloodMeal.objects.all().delete()
        # Borning.objects.all().delete()
        # Country.objects.all().delete()
        # Disease.objects.all().delete()
        # FeedingPeriod.objects.all().delete()
        # Habitat.objects.all().delete()
        # Landscape.objects.all().delete()
        # Location.objects.all().delete()
        # VectorFamily.objects.all().delete()
        # VectorGenus.objects.all().delete()
        # VectorOrder.objects.all().delete()
        # VectorSubFamily.objects.all().delete()
        # VirusFamily.objects.all().delete()
        # VirusGenus.objects.all().delete()

        logger.info(f"/admin/arboverse_updated/dataupload/ action: removed existing db data")

        reload_cmd = Command()
        reload_cmd.handle(virus_excel= queryset[0].virusfile.path,
                          vector_csv = queryset[0].vectorfile.path,
                          sheet_name =  'main_arbovirus',
                          verbosity  =   '3',
                          list_sheets = None
                         )
        logger.info(f"/admin/arboverse_updated/dataupload/ action: updated")
        

    actions = ["reload_data"]


admin.site.register(BloodMeal)
admin.site.register(Borning)
admin.site.register(Country)
admin.site.register(DataReload,DataReloadAdmin)
admin.site.register(Disease)
admin.site.register(VirusGenus)
admin.site.register(VirusVector)
