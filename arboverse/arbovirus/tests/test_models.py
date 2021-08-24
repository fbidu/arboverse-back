from django.test import TestCase
from arboverse.arbovirus.models import (
    BloodMeal,
    Borning,
    Country,
    Disease,
    FeedingPeriod,
    Habitat,
    Landscape,
    Location,
    VectorFamily,
    VectorGenus,
    VectorOrder,
    VectorSpecies,
    Virus,
    VirusFamily,
    VirusGenus,
    VirusVector,
)

# Create your tests here.
class VirusModelTest(TestCase):
    def test_saving_and_retrieving_virus(self):

        first_virus = Virus()

        first_family = VirusFamily()
        first_family.name = "Reoviridae"
        first_family.save()

        first_genus = VirusGenus()
        first_genus.name = "Orbivirus"
        first_genus.save()

        first_borne = Borning()
        first_borne.name = "midge-borne disease"
        first_borne.save()

        first_virus.name = "Abadina"
        first_virus.specie = "Palyam virus"
        first_virus.genus = first_genus
        first_virus.family = first_family
        first_virus.abbreviation = "ABAV"
        first_virus.collection_date = "11/4/1987"
        first_virus.genome_type = "dsRNA"
        first_virus.enveloped = False
        first_virus.reference_strain = "tbc"
        first_virus.genome_length_nt = 18919
        first_virus.borning = first_borne
        first_virus.host_amplifier = "tbc"
        first_virus.human_fatal_disease = False
        first_virus.veterinary_diseases = False
        first_virus.veterinary_fatal_diseases = False
        first_virus.no_cases = "unk"
        first_virus.level_of_disease = "unk"
        first_virus.vaccine = "tbc"
        first_virus.vero_cells = False
        first_virus.C6_36_cells = False
        first_virus.cpe_vero = "?"
        first_virus.plaques_vero = "?"
        first_virus.animal_model = "tbc"
        first_virus.sals_level = "unk"
        first_virus.save()

        first_disease = Disease()
        first_disease.name = "unk"
        first_disease.save()
        first_virus.diseases.add(first_disease)

        self.assertEqual(first_disease.virus_set.all().count(), 1)

        first_country = Country()
        first_country.name = "Nigeria"
        first_country.save()
        first_virus.country.add(first_country)

        self.assertEqual(first_country.virus_set.all().count(), 1)

        second_virus = Virus()

        second_family = VirusFamily()
        second_family.name = "Peribunyaviridae"
        second_family.save()

        second_genus = VirusGenus()
        second_genus.name = "Orthobunyavirus"
        second_genus.save()

        second_borne = Borning()
        second_borne.name = "mosquito-borne-virus"
        second_borne.save()

        second_virus.name = "Abbey lake"
        second_virus.specie = "Abbey lake virus"
        second_virus.genus = second_genus
        second_virus.family = second_family
        second_virus.abbreviation = "Ab-BUNV"
        second_virus.collection_date = "20/06/2013"
        second_virus.genome_type = "ssRNA(-)"
        second_virus.enveloped = True
        second_virus.reference_strain = "tbc"
        second_virus.genome_length_nt = 12194
        second_virus.borning = second_borne
        second_virus.host_amplifier = "tbc"
        second_virus.human_fatal_disease = False
        second_virus.veterinary_diseases = False
        second_virus.veterinary_fatal_diseases = False
        second_virus.no_cases = "unk"
        second_virus.level_of_disease = "unk"
        second_virus.vaccine = "tbc"
        second_virus.vero_cells = False
        second_virus.C6_36_cells = False
        second_virus.cpe_vero = "?"
        second_virus.plaques_vero = "?"
        second_virus.animal_model = "tbc"
        second_virus.sals_level = "unk"
        second_virus.save()

        second_disease = Disease()
        second_disease.name = "unk"
        second_disease.save()
        second_virus.diseases.add(second_disease)

        self.assertEqual(second_disease.virus_set.all().count(), 1)

        second_country = Country()
        second_country.name = "Brazil"
        second_country.save()
        second_virus.country.add(second_country)

        self.assertEqual(second_country.virus_set.all().count(), 1)

        assert repr(second_virus) == f"<Virus: {second_virus.name} #{second_virus.id}>"

        saved_virus = Virus.objects.all()
        self.assertEqual(saved_virus.count(), 2)

    def test_saving_and_retrieving_family(self):
        first_family = VirusFamily()
        first_family.name = "Reoviridae"
        first_family.save()

        second_family = VirusFamily()
        second_family.name = "Peribunyaviridae"
        second_family.save()

        saved_families = VirusFamily.objects.all()
        self.assertEqual(saved_families.count(), 2)

    def test_saving_and_retrieving_genus(self):
        first_genus = VirusGenus()
        first_genus.name = "Orbivirus"
        first_genus.save()

        second_genus = VirusGenus()
        second_genus.name = "Orthobunyavirus"
        second_genus.save()

        saved_genus = VirusGenus.objects.all()
        self.assertEqual(saved_genus.count(), 2)

    def test_saving_and_retrieving_borning(self):
        first_borne = Borning()
        first_borne.name = "midge-borne disease"
        first_borne.save()

        second_borne = Borning()
        second_borne.name = "mosquito-borne-virus"
        second_borne.save()

        saved_borne = Borning.objects.all()
        self.assertEqual(saved_borne.count(), 2)

    def test_saving_and_retrieving_disease(self):
        first_disease = Disease()
        first_disease.name = "unk"
        first_disease.save()

        second_disease = Disease()
        second_disease.name = "unk"
        second_disease.save()

        saved_disease = Disease.objects.all()
        self.assertEqual(saved_disease.count(), 2)

    def test_saving_and_retrieving_country(self):
        first_country = Country()
        first_country.name = "unk"
        first_country.save()

        second_country = Country()
        second_country.name = "unk"
        second_country.save()

        saved_country = Country.objects.all()
        self.assertEqual(saved_country.count(), 2)


class VectorModelTest(TestCase):
    def test_saving_and_retrieving_vector(self):
        first_vector = VectorSpecies()

        first_order = VectorOrder()
        first_order.name = "Diptera"
        first_order.save()

        first_family = VectorFamily()
        first_family.name = "Culicidae"
        first_family.order = first_order
        first_family.save()

        first_genus = VectorGenus()
        first_genus.name = "Aedeomyia"
        first_genus.family = first_family
        first_genus.save()

        first_location = Location()
        first_location.name = "Australasian_Regions"
        first_location.save()

        first_habitat = Habitat()
        first_habitat.name = "forest/rural"
        first_habitat.save()

        first_landscape = Landscape()
        first_landscape.name = "ground_water_habitats"
        first_landscape.save()

        first_blood_meal = BloodMeal()
        first_blood_meal.name = "birds"
        first_blood_meal.save()

        first_feeding_period = FeedingPeriod()
        first_feeding_period.name = "night"
        first_feeding_period.save()

        first_vector.name = "Aedeomyia catasticta"
        first_vector.arthropod_type = "mosquito"
        first_vector.genome = False
        first_vector.reference_genome = "tbc"
        first_vector.genome_size = 0

        first_vector.survival_temperature_ranges = "26-32.5"
        first_vector.survival_humidity_percent = ">70"

        first_vector.anthropophilic_behaviour = True
        first_vector.eggs_viability_days = "unk"
        first_vector.lifecycle_time_days = "unk"
        first_vector.experimental_infection = "tbc"
        first_vector.save()

        first_vector.habitat.add(first_habitat)
        first_vector.landscape.add(first_landscape)
        first_vector.location.add(first_location)
        first_vector.blood_meal.add(first_blood_meal)
        first_vector.feeding_period.add(first_feeding_period)

        saved_vector = VectorSpecies.objects.all()
        self.assertEqual(saved_vector.count(), 1)

    def test_saving_and_retrieving_virus_vector(self):
        first_virus = Virus()
        first_virus.save()
        first_vector = VectorSpecies()
        first_vector.save()

        first_virus_vector = VirusVector()
        first_virus_vector.virus = first_virus
        first_virus_vector.vector = first_vector
        first_virus_vector.main_vector = True
        first_virus_vector.save()

        self.assertEqual(first_vector.virus.all().count(), 1)
