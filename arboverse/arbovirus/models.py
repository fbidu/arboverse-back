from django.db import models

# Create your models here.


class VirusGenus(models.Model):
    name = models.TextField()


class Virus(models.Model):
    """
    Model an arbovirus
    """

    name = models.TextField(default="")

    specie = models.TextField(default="")
    family = models.TextField(default="")
    genus = models.ForeignKey(
        VirusGenus, on_delete=models.RESTRICT, default=None, null=True
    )

    abbreviation = models.TextField(default="")
    collection_date = models.TextField(default="")
    genome_type = models.TextField(default="")
    enveloped = models.BooleanField(blank=True, null=True)
    reference_strain = models.TextField(default="")
    genome_length_nt = models.IntegerField(blank=True, null=True)
    borning = models.TextField(default="")
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
