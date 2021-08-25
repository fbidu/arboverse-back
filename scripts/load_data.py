import csv
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

def run():
    fhand = open('virus_data.csv')
    reader = csv.reader(fhand)

    Virus.objects.all().delete()
    Borning.objects.all().delete()
    VirusFamily.objects.all().delete()
    VirusGenus.objects.all().delete()
    Disease.objects.all().delete()
    Country.objects.all().delete()
    VectorSpecies.objects.all().delete()
    VirusVector.objects.all().delete()
    FeedingPeriod.objects.all().delete()
    BloodMeal.objects.all().delete()
    Landscape.objects.all().delete()
    Habitat.objects.all().delete()
    Location.objects.all().delete()
    VectorGenus.objects.all().delete()
    VectorFamily.objects.all().delete()
    VectorOrder.objects.all().delete()

    for row in reader:
        print(row)

        vir_family, created = VirusFamily.objects.get_or_create(name=row[3])
        vir_genus, created = VirusGenus.objects.get_or_create(name=row[2])
        vir_borne, created = Borning.objects.get_or_create(name=row[10])

        vir, created = Virus.objects.get_or_create(
            name=row[0], 
            specie=row[1], 
            genus=vir_genus, 
            family=vir_family, 
            abbreviation=row[4], 
            collection_date=row[5], 
            genome_type=row[6], 
            enveloped= True if row[7] == 'yes' else False, 
            reference_strain=row[8], 
            genome_length_nt=row[9] if isinstance(row[9], int) else 0, 
            borning=vir_borne, 
            host_amplifier=row[12], 
            human_fatal_disease= True if row[14] == 'yes' else False,
            veterinary_diseases= True if row[15] == 'yes' else False,
            veterinary_fatal_diseases= True if row[16] == 'yes' else False,
            no_cases=row[17],
            level_of_disease=row[18],
            vaccine=row[20],
            vero_cells= True if row[21] == 'yes' else False,
            C6_36_cells= True if row[22] == 'yes' else False,
            cpe_vero=row[23],
            plaques_vero=row[24],
            animal_model=row[25],
            sals_level=row[26]
        )

        vir_disease, created = Disease.objects.get_or_create(name=row[13])
        vir.diseases.add(vir_disease)

        vir_country, created = Country.objects.get_or_create(name=row[13])
        vir.country.add(vir_country)