from django.test import TestCase
from arboverse.arbovirus.models import Virus, VirusFamily, VirusGenus, Borning

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
        first_borne.name = "Orbivirus"
        first_borne.save()

        second_borne = Borning()
        second_borne.name = "Orthobunyavirus"
        second_borne.save()

        saved_borne = Borning.objects.all()
        self.assertEqual(saved_borne.count(), 2)