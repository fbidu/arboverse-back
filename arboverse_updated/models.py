from django.db import models

class Country(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirus_country"
    

class Disease(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirus_disease"

class Borning(models.Model):
    borne_type = models.TextField()

    class Meta:
        db_table = "arbovirus_borning"


class VirusFamily(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirus_virusfamily"


class VirusGenus(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirus_virusgenus"


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

    class Meta:
        db_table = "arbovirus_virus"

    def __repr__(self):
        return f"<Virus: {self.name} #{self.id}>"

    def __str__(self):
        return self.name


class FeedingPeriod(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirus_fedingperiod"


class BloodMeal(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirus_bloodmeal"


class Landscape(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirus_landscape"


class Habitat(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovius_habitat"


class Location(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirs_location"


class VectorOrder(models.Model):
    name = models.TextField()

    class Meta:
        db_table = "arbovirus_vectororder"


class VectorFamily(models.Model):
    name = models.TextField()
    order = models.ForeignKey(
        VectorOrder, on_delete=models.RESTRICT, default=None, null=True
    )

    class Meta:
        db_table = "arbovirus_vectorfamily"


class VectorSubFamily(models.Model):
    name = models.TextField()
    family = models.ForeignKey(
        VectorFamily, on_delete=models.RESTRICT, default=None, null=True
    )

    class Meta:
        db_table = "arbovirus__vecorsubfamily"


class VectorGenus(models.Model):
    name = models.TextField()
    family = models.ForeignKey(
        VectorFamily, on_delete=models.RESTRICT, default=None, null=True
    )
    sub_family = models.ForeignKey(
        VectorSubFamily, on_delete=models.RESTRICT, default=None, null=True
    )

    class Meta:
        db_table = "arbovirus_vectorgenus"


class VectorSpecies(models.Model):
    name = models.TextField(blank=True, null=True)
    arthropod_type = models.TextField(blank=True, null=True)
    genome = models.BooleanField(blank=True, null=True)
    reference_genome = models.TextField(blank=True, null=True)
    genome_size = models.IntegerField(blank=True, null=True)
    survival_temperature_ranges = models.TextField(blank=True, null=True)
    survival_humidity_percent = models.TextField(blank=True, null=True)
    distribution = models.TextField(blank=True, null=True)
    adult_life_expectancy_days = models.TextField(blank=True, null=True)
    anthropophilic_behaviour = models.BooleanField(blank=True, null=True)
    eggs_viability_days = models.TextField(blank=True, null=True)
    lifecycle_time_days = models.TextField(blank=True, null=True)
    experimental_infection = models.TextField(blank=True, null=True)

    feeding_period = models.ManyToManyField(FeedingPeriod)
    blood_meal = models.ManyToManyField(BloodMeal)
    landscape = models.ManyToManyField(Landscape)
    habitat = models.ManyToManyField(Habitat)
    location = models.ManyToManyField(Location)

    genus = models.ForeignKey(
        VectorGenus, on_delete=models.RESTRICT, default=None, null=True
    )
    virus = models.ManyToManyField(Virus, related_name="virus", through="VirusVector")

    class Meta:
        db_table = "arbovirus_vectorspecies"

class VirusVector(models.Model):
    virus = models.ForeignKey(Virus, on_delete=models.RESTRICT, default=None, null=True)
    vector = models.ForeignKey(
        VectorSpecies, on_delete=models.RESTRICT, default=None, null=True
    )
    main_vector = models.BooleanField(blank=True, null=True)

    class Meta:
        db_table = "arbovirus_virusvector"
