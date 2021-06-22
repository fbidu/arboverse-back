from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):

    # First Name and Last Name Do Not Cover Name Patterns
    # Around the Globe.
    name = models.CharField(
        _("Name of User"), blank=True, max_length=255
    )

    def get_absolute_url(self):
        return reverse(
            "users:detail", kwargs={"username": self.username}
        )

class Virus(models.Model):
    virus_name = models.TextField(default='')
    specie = models.TextField(default='')
    family = models.TextField(default='')
    abbreviation = models.TextField(default='')
    collection_date = models.TextField(default='')
    genome_type = models.TextField(default='')
    enveloped = models.BooleanField()
    reference_strain = models.TextField(default='')
    genome_length_nt = models.IntegerField(default='')
    borning = models.TextField(default='')
    host_amplifier = models.TextField(default='')
    human_fatal_disease = models.BooleanField(default='')
    veterinary_diseases = models.BooleanField(default='')
    veterinary_fatal_diseases = models.BooleanField(default='')
    no_cases = models.TextField(default='')
    level_of_disease = models.TextField(default='')
    vaccine = models.TextField(default='')
    vero_cells = models.BooleanField(default='')
    C6_36_cells = models.BooleanField(default='')
    cpe_vero = models.TextField(default='')
    plaques_vero = models.TextField(default='')
    animal_model = models.TextField(default='')
    sals_level = models.TextField(default='')