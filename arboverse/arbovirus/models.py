from django.db import models

# Create your models here.


class Virus(models.Model):
    virus_name = models.TextField(default="")
    specie = models.TextField(default="")
    family = models.TextField(default="")
    abbreviation = models.TextField(default="")
    collection_date = models.TextField(default="")
    genome_type = models.TextField(default="")
    enveloped = models.BooleanField()
    reference_strain = models.TextField(default="")
    genome_length_nt = models.IntegerField(default="")
    borning = models.TextField(default="")
    host_amplifier = models.TextField(default="")
    human_fatal_disease = models.BooleanField(default="")
    veterinary_diseases = models.BooleanField(default="")
    veterinary_fatal_diseases = models.BooleanField(default="")
    no_cases = models.TextField(default="")
    level_of_disease = models.TextField(default="")
    vaccine = models.TextField(default="")
    vero_cells = models.BooleanField(default="")
    C6_36_cells = models.BooleanField(default="")
    cpe_vero = models.TextField(default="")
    plaques_vero = models.TextField(default="")
    animal_model = models.TextField(default="")
    sals_level = models.TextField(default="")
