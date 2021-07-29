from django.db import models

# Create your models here.
class Country(models.Model):
    name = models.TextField()

class Disease(models.Model):
    name = models.TextField()

class Borning(models.Model):
    borne_type = models.TextField()

class VirusFamily(models.Model):
    name = models.TextField()

class VirusGenus(models.Model):
    name = models.TextField()

class Virus(models.Model):
    """
    Model an arbovirus
    """

    name = models.TextField(default="")

    specie = models.TextField(default="")
    family = models.ForeignKey(
        VirusFamily, on_delete=models.RESTRICT, default=None, null=True
    )
    genus = models.ForeignKey(
        VirusGenus, on_delete=models.RESTRICT, default=None, null=True
    )
    borning = models.ForeignKey(
        Borning, on_delete=models.RESTRICT, default=None, null=True
    )
    diseases = models.ManyToManyField(Disease)
    country = models.ManyToManyField(Country)

    abbreviation = models.TextField(default="")
    collection_date = models.TextField(default="")
    genome_type = models.TextField(default="")
    enveloped = models.BooleanField(blank=True, null=True)
    reference_strain = models.TextField(default="")
    genome_length_nt = models.IntegerField(blank=True, null=True)
    host_amplifier = models.TextField(default="")
    human_fatal_disease = models.BooleanField(blank=True, null=True)
    veterinary_diseases = models.BooleanField(blank=True, null=True)
    veterinary_fatal_diseases = models.BooleanField(blank=True, null=True)
    no_cases = models.TextField(default="")
    level_of_disease = models.TextField(default="")
    vaccine = models.TextField(default="")
    vero_cells = models.BooleanField(blank=True, null=True)
    C6_36_cells = models.BooleanField(blank=True, null=True)
    cpe_vero = models.TextField(default="")
    plaques_vero = models.TextField(default="")
    animal_model = models.TextField(default="")
    sals_level = models.TextField(default="")

    def __repr__(self):
        return f"<Virus: {self.name} #{self.id}>"

    def __str__(self):
        return self.name
