import pandas as pd
import numpy as np
from django.core.management.base import BaseCommand
from django.db import transaction
from arboverse_updated.models import (
    Country, Disease, Borning, VirusFamily, VirusGenus, Virus,
    FeedingPeriod, BloodMeal, Landscape, Habitat, Location,
    VectorOrder, VectorFamily, VectorSubFamily, VectorGenus,
    VectorSpecies, VirusVector
)

debug_mode = True

class Command(BaseCommand):
    help = 'Import virus and vector data from Excel and CSV files'

    def add_arguments(self, parser):
        parser.add_argument('virus_excel', type=str, help='Path to virus Excel file')
        parser.add_argument('vector_csv', type=str, help='Path to vector CSV file')
        parser.add_argument(
            '--sheet-name',
            type=str,
            help='Name of the Excel sheet to import (default: first sheet)',
            default=None
        )
        parser.add_argument(
            '--list-sheets',
            action='store_true',
            help='List available sheets in the Excel file and exit'
        )

    def clean_numeric(self, value):
        """Convert value to integer or None if not possible"""
        if pd.isna(value) or value in ['unk', 'unknown', '-', '']:
            return None
        try:
            return int(float(value))
        except (ValueError, TypeError):
            return None

    def clean_boolean(self, value):
        """Convert value to boolean or None if not possible"""
        if pd.isna(value) or value in ['unk', 'unknown', '-', '']:
            return None
        if isinstance(value, bool):
            return value
        if isinstance(value, (int, float)):
            return bool(value)
        if isinstance(value, str):
            value = value.lower().strip()
            if value in ['yes', 'true', '1', 'y', 't']:
                return True
            if value in ['no', 'false', '0', 'n', 'f']:
                return False
        return None

    def clean_text(self, value):
        """Convert value to string or empty string if None"""
        if pd.isna(value) or value in ['unk', 'unknown', '-']:
            return ''
        return str(value).strip()

    def handle(self, *args, **kwargs):
        virus_file = kwargs['virus_excel']
        vector_file = kwargs['vector_csv']
        sheet_name = kwargs['sheet_name']
        list_sheets = kwargs['list_sheets']

        if list_sheets:
            try:
                excel_file = pd.ExcelFile(virus_file)
                self.stdout.write('Available sheets:')
                for sheet in excel_file.sheet_names:
                    self.stdout.write(f'  - {sheet}')
                return
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error reading Excel file: {str(e)}'))
                return

        self.stdout.write('Starting data import...')

        try:
            with transaction.atomic():
                self.import_virus_data(virus_file, sheet_name)
                self.import_vector_data(vector_file)

            self.stdout.write(self.style.SUCCESS('Data import completed successfully'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error during import: {str(e)}'))
            raise  # Re-raise the exception to see the full traceback

    def get_or_create_related(self, model, name):
        """Helper function to get or create related objects"""
        if not name or pd.isna(name):
            return None
        obj, _ = model.objects.get_or_create(name=str(name).strip())
        return obj

    def import_virus_data(self, file_path, sheet_name=None):
        """Import virus data from Excel file"""
        try:
            if sheet_name:
                df = pd.read_excel(file_path, sheet_name=sheet_name)
                self.stdout.write(f'Importing data from sheet: {sheet_name}')
            else:
                excel_file = pd.ExcelFile(file_path)
                sheet_name = excel_file.sheet_names[0]
                df = pd.read_excel(file_path, sheet_name=sheet_name)
                self.stdout.write(f'Importing data from first sheet: {sheet_name}')
        except ValueError as e:
            if 'Sheet' in str(e):
                self.stdout.write(self.style.ERROR(f'Sheet "{sheet_name}" not found in Excel file'))
                excel_file = pd.ExcelFile(file_path)
                self.stdout.write('Available sheets:')
                for sheet in excel_file.sheet_names:
                    self.stdout.write(f'  - {sheet}')
                raise
            raise

        for _, row in df.iterrows():
            # Create or get related objects
            family = self.get_or_create_related(VirusFamily, row.get('family'))
            genus = self.get_or_create_related(VirusGenus, row.get('genus'))
            borning = self.get_or_create_related(Borning, row.get('borne_type'))

            if debug_mode:
                print( "import_virus_data(name,raw):   "+row.get('virus_name'))
                print( "import_virus_data(name,clean): "+self.clean_text(row.get('virus_name')))
                
            # Create virus instance with cleaned data
            virus = Virus.objects.create(
                name=self.clean_text(row.get('virus_name')),
                specie=self.clean_text(row.get('specie')),
                family=family,
                genus=genus,
                borning=borning,
                abbreviation=self.clean_text(row.get('abbreviation')),
                collection_date=self.clean_text(row.get('collection_date')),
                genome_type=self.clean_text(row.get('genome_type')),
                enveloped=self.clean_boolean(row.get('enveloped')),
                reference_strain=self.clean_text(row.get('reference_strain')),
                genome_length_nt=self.clean_numeric(row.get('genome_length_nt')),
                host_amplifier=self.clean_text(row.get('host_amplifier')),
                human_fatal_disease=self.clean_boolean(row.get('human_fatal_disease')),
                veterinary_diseases=self.clean_boolean(row.get('veterinary_diseases')),
                veterinary_fatal_diseases=self.clean_boolean(row.get('veterinary_fatal_diseases')),
                no_cases=self.clean_text(row.get('no_cases')),
                level_of_disease=self.clean_text(row.get('level_of_disease')),
                vaccine=self.clean_text(row.get('vaccine')),
                vero_cells=self.clean_boolean(row.get('vero_cells')),
                C6_36_cells=self.clean_boolean(row.get('C6_36_cells')),
                cpe_vero=self.clean_text(row.get('cpe_vero')),
                plaques_vero=self.clean_text(row.get('plaques_vero')),
                animal_model=self.clean_text(row.get('animal_model')),
                sals_level=self.clean_text(row.get('sals_level'))
            )
            virus.save()

            if debug_mode:
                print( "import_virus_data(virus):  "+repr(virus.name))
                print( "import_virus_data(specie): "+repr(virus.specie))
                
            # Handle many-to-many relationships
            if 'diseases' in row and not pd.isna(row['diseases']):
                diseases = [d.strip() for d in str(row['diseases']).split(',')]
                for disease in diseases:
                    disease_obj, _ = Disease.objects.get_or_create(name=disease)
                    virus.diseases.add(disease_obj)

            if 'countries' in row and not pd.isna(row['countries']):
                countries = [c.strip() for c in str(row['countries']).split(',')]
                for country in countries:
                    country_obj, _ = Country.objects.get_or_create(name=country)
                    virus.country.add(country_obj)

    def import_vector_data(self, file_path):
        """Import vector data from CSV file"""
        df = pd.read_csv(file_path)

        for _, row in df.iterrows():

            if debug_mode:
                print( "import_vector_data(binominal_name,raw):   "+row.get('binominal_name'))
                print( "import_vector_data(binominal_name,clean): "+self.clean_text(row.get('binominal_name')))

            # Create or get taxonomic hierarchy
            order = self.get_or_create_related(VectorOrder, row.get('order'))
            family = None
            if order and row.get('family'):
                family, _ = VectorFamily.objects.get_or_create(
                    name=row['family'],
                    order=order
                )

            subfamily = None
            if family and row.get('subfamily'):
                subfamily, _ = VectorSubFamily.objects.get_or_create(
                    name=row['subfamily'],
                    family=family
                )

            genus = None
            if family and row.get('genus'):
                genus, _ = VectorGenus.objects.get_or_create(
                    name=row['genus'],
                    family=family,
                    sub_family=subfamily
                )

            # Create vector species with cleaned data
            vector = VectorSpecies.objects.create(
                name=self.clean_text(row.get('binominal_name')),
                arthropod_type=self.clean_text(row.get('arthropod_type')),
                genome=self.clean_boolean(row.get('genome')),
                reference_genome=self.clean_text(row.get('reference_genome')),
                genome_size=self.clean_numeric(row.get('genome_size')),
                survival_temperature_ranges=self.clean_text(row.get('survival_temperature_ranges')),
                survival_humidity_percent=self.clean_text(row.get('survival_humidity_percent')),
                distribution=self.clean_text(row.get('distribution')),
                adult_life_expectancy_days=self.clean_text(row.get('adult_life_expectancy_days')),
                anthropophilic_behaviour=self.clean_boolean(row.get('anthropophilic_behaviour')),
                eggs_viability_days=self.clean_text(row.get('eggs_viability_days')),
                lifecycle_time_days=self.clean_text(row.get('lifecycle_time_days')),
                experimental_infection=self.clean_text(row.get('experimental_infection')),
                genus=genus
            )
            vector.save()
            
            if debug_mode:
                print( "import_vector_data(vector): "+vector.name )
                
            # Handle many-to-many relationships
            for field, model in [
                ('feeding_period', FeedingPeriod),
                ('blood_meal', BloodMeal),
                ('landscape', Landscape),
                ('habitat', Habitat),
                ('location', Location)
            ]:
                if field in row and not pd.isna(row[field]):
                    values = [v.strip() for v in str(row[field]).split(',')]
                    for value in values:
                        obj, _ = model.objects.get_or_create(name=value)
                        getattr(vector, field).add(obj)

            # Handle virus relationships
            if 'viruses' in row and not pd.isna(row['viruses']):
                viruses = [v.strip() for v in str(row['viruses']).split(',')]
                for virus_name in viruses:
                    try:
                        virus = Virus.objects.get(name=virus_name)
                        VirusVector.objects.create(
                            virus=virus,
                            vector=vector,
                            main_vector=self.clean_boolean(row.get('main_vector'))
                        )
                    except Virus.DoesNotExist:
                        self.stdout.write(self.style.WARNING(
                            f'Virus not found: {virus_name}'
                        ))
