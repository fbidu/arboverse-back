from django.test import TestCase
from arboverse.arbovirus.models import Virus

# Create your tests here.
class VirusModelTest(TestCase):
    def test_saving_and_retrieving_virus(self):

        first_virus = Virus()
        first_virus.virus_name = "Abadina"
        first_virus.specie = "Palyam virus"
        first_virus.family = "Reoviridae"
        first_virus.abbreviation = "ABAV"
        first_virus.collection_date = "11/4/1987"
        first_virus.genome_type = "dsRNA"
        first_virus.enveloped = False
        first_virus.reference_strain = "tbc"
        first_virus.genome_length_nt = 18919
        first_virus.borning = "midge-borne disease"
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

        second_virus = Virus()
        second_virus.virus_name = "Abbey lake"
        second_virus.specie = "Abbey lake virus"
        second_virus.family = "Peribunyaviridae"
        second_virus.abbreviation = "Ab-BUNV"
        second_virus.collection_date = "20/06/2013"
        second_virus.genome_type = "ssRNA(-)"
        second_virus.enveloped = True
        second_virus.reference_strain = "tbc"
        second_virus.genome_length_nt = 12194
        second_virus.borning = "mosquito-borne-virus"
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

        saved_virus = Virus.objects.all()
        self.assertEqual(saved_virus.count(), 2)
