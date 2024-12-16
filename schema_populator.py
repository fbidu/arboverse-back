import os

import numpy as np
import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Database connection
engine = create_engine(
    f"postgresql+psycopg2://{os.getenv('PGSQL_USER')}:{os.getenv('PGSQL_PASS')}@localhost:{int(os.getenv('PGSQL_PORT'))}/{os.getenv('PGSQL_DB')}")
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


# Define the Borning table
class Borning(Base):
    __tablename__ = 'arboverse_updated_borning'
    id = Column(Integer, primary_key=True, autoincrement=True)
    borne_type = Column(String, unique=True)  # Ensure uniqueness for meaningful data


class Country(Base):
    __tablename__ = 'arboverse_updated_country'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class Disease(Base):
    __tablename__ = 'arboverse_updated_disease'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class Landscape(Base):
    __tablename__ = 'arboverse_updated_landscape'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class Habitat(Base):
    __tablename__ = 'arboverse_updated_habitat'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class Location(Base):
    __tablename__ = 'arboverse_updated_location'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class BloodMeal(Base):
    __tablename__ = 'arboverse_updated_bloodmeal'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class FeedingPeriod(Base):
    __tablename__ = 'arboverse_updated_feedingperiod'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class VirusFamily(Base):
    __tablename__ = 'arboverse_updated_virusfamily'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class VirusGenus(Base):
    __tablename__ = 'arboverse_updated_virusgenus'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


class VectorOrder(Base):
    __tablename__ = 'arboverse_updated_vectororder'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)


# Create all tables
Base.metadata.create_all(engine)

# Load data from Excel and CSV
virus_df = pd.read_excel("The global distribution of arbovirus diversity - OFFICIAL.xlsx", sheet_name='main_arbovirus')
main_vector_df = pd.read_excel("The global distribution of arbovirus diversity - OFFICIAL.xlsx", sheet_name='main_vector')
vector_df = pd.read_csv('Arbovector_database.csv')
vector_df["genus"] = vector_df["binominal_name"].apply(
    lambda x: x.split()[0]
)
vector_df["genome"] = vector_df["genome"].apply(
    lambda x: 0 if x in ["tbc"] else 1
)
vector_df["genome_size"] = vector_df["genome_size"].apply(
    lambda x: 0 if x in ["tbc"] else 1
)
vector_df["anthropophilic_behaviour"] = vector_df["anthropophilic_behaviour"].apply(
    lambda x: 0 if x in ["no", "unk"] else 1
)


def insert_data(table_class, data, column_mapping, unique=False):
    # Create a new list to store the records
    records = []

    # If `unique` is True, remove duplicates based on the specified columns
    if unique:
        # Get the list of columns to check for duplicates (using the keys of the mapping)
        columns_to_check = list(column_mapping.values())
        # Drop duplicates based on these columns
        data = data.drop_duplicates(subset=columns_to_check)

    # Process each row in the DataFrame
    for _, row in data.iterrows():
        # Create a dictionary for the current row, mapping DataFrame columns to table class columns
        row_data = {}
        for table_column, df_column in column_mapping.items():
            value = row[df_column]

            # Handle NaN values (skip or replace)
            if pd.isna(value):
                if table_column == 'name':  # Skip records with NaN in required columns
                    continue  # Skip this row entirely
                row_data[table_column] = None  # or replace with a default value if needed
            else:
                row_data[table_column] = value

        if row_data:  # Only proceed if row_data is valid
            # Check if a record with the same name exists
            existing_record = session.query(table_class).filter_by(name=row_data.get('name')).first()
            if existing_record:
                # Update the existing record's fields
                for key, value in row_data.items():
                    setattr(existing_record, key, value)
            else:
                # Add the row as a new record
                records.append(table_class(**row_data))

    # Bulk save the objects to the session
    if records:  # Insert only if there are new records
        session.bulk_save_objects(records)

    # Commit all changes (both updates and new inserts)
    session.commit()


def insert_borning_data(table_class, data, column_mapping, unique=False):
    # Create a new list to store the records
    records = []

    # If `unique` is True, remove duplicates based on the specified columns
    if unique:
        # Get the list of columns to check for duplicates (using the keys of the mapping)
        columns_to_check = list(column_mapping.values())
        # Drop duplicates based on these columns
        data = data.drop_duplicates(subset=columns_to_check)

    # Process each row in the DataFrame
    for _, row in data.iterrows():
        # Create a dictionary for the current row, mapping DataFrame columns to table class columns
        row_data = {}
        for table_column, df_column in column_mapping.items():
            value = row[df_column]

            # Handle NaN values (skip or replace)
            if pd.isna(value):
                if table_column == 'borne_type':  # Skip records with NaN in required columns
                    continue  # Skip this row entirely
                row_data[table_column] = None  # or replace with a default value if needed
            else:
                row_data[table_column] = value

        if row_data:  # Only proceed if row_data is valid
            # Check if a record with the same name exists
            existing_record = session.query(table_class).filter_by(borne_type=row_data.get('name')).first()
            if existing_record:
                # Update the existing record's fields
                for key, value in row_data.items():
                    setattr(existing_record, key, value)
            else:
                # Add the row as a new record
                records.append(table_class(**row_data))

    # Bulk save the objects to the session
    if records:  # Insert only if there are new records
        session.bulk_save_objects(records)

    # Commit all changes (both updates and new inserts)
    session.commit()


# Build all dependency tables first, this is any table which only has and ID and a name value
insert_data(Country, virus_df, {'name': 'country'}, True)
insert_data(VirusGenus, virus_df, {'name': 'genus'}, True)
insert_data(VirusFamily, virus_df, {'name': 'family'}, True)
#insert_borning_data(Borning, virus_df, {'borne_type': 'borne-virus'}, True)
insert_data(VectorOrder, vector_df, {'name': 'taxonomy_order'}, True)
insert_data(Disease, virus_df, {'name': 'category-human-disease'}, True)
insert_data(Landscape, vector_df, {'name': 'natural_landscape'}, True)
insert_data(Habitat, vector_df, {'name': 'habitat'}, True)
insert_data(Location, virus_df, {'name': 'continent'}, True)
insert_data(Location, virus_df, {'name': 'state_province'}, True)
insert_data(Location, virus_df, {'name': 'municipality'}, True)
insert_data(BloodMeal, vector_df, {'name': 'blood_meal'}, True)
insert_data(FeedingPeriod, vector_df, {'name': 'feeding_period'}, True)


# Define classes that have second step dependencies
class VectorLandscape(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_landscape'
    vectorspecies_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    landscape_id = Column(ForeignKey('arboverse_updated_landscape.id'), primary_key=True)


class VectorGenus(Base):
    __tablename__ = 'arboverse_updated_vectorgenus'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    family_id = Column(ForeignKey('arboverse_updated_vectorfamily.id'), primary_key=True)
    sub_family_id = Column(ForeignKey('arboverse_updated_vectorsubfamily.id'), primary_key=True)


class VectorBloodmeal(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_blood_meal'
    vectorspecies_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    bloodmeal_id = Column(ForeignKey('arboverse_updated_bloodmeal.id'), primary_key=True)


class VectorFeedingPeriod(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_feeding_period'
    vectorspecies_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    feedingperiod_id = Column(ForeignKey('arboverse_updated_feedingperiod.id'), primary_key=True)


class VectorLocation(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_location'
    vectorspecies_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    location_id = Column(ForeignKey('arboverse_updated_location.id'), primary_key=True)


class VectorHabitat(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_habitat'
    vectorspecies_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    habitat_id = Column(ForeignKey('arboverse_updated_habitat.id'), primary_key=True)


class VectorFamily(Base):
    __tablename__ = 'arboverse_updated_vectorfamily'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    order_id = Column(Integer, ForeignKey('arboverse_updated_vectororder.id'))


class VectorSubFamily(Base):
    __tablename__ = 'arboverse_updated_vectorsubfamily'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    family_id = Column(Integer, ForeignKey('arboverse_updated_vectorfamily.id'))


class VirusVector(Base):
    __tablename__ = 'arboverse_updated_virusvector'
    id = Column(Integer, primary_key=True, autoincrement=True)
    main_vector = Column(Boolean)
    vector_id = Column(Integer, ForeignKey('arboverse_updated_vectorspecies.id'))
    virus_id = Column(Integer, ForeignKey('arboverse_updated_virus.id'))


class VirusCountry(Base):
    __tablename__ = 'arboverse_updated_virus_country'
    id = Column(Integer, primary_key=True, autoincrement=True)
    virus_id = Column(Integer, ForeignKey('arboverse_updated_virus.id'))
    country_id = Column(Integer, ForeignKey('arboverse_updated_country.id'))


class VirusDiseases(Base):
    __tablename__ = 'arboverse_updated_virus_diseases'
    id = Column(Integer, primary_key=True, autoincrement=True)
    virus_id = Column(Integer, ForeignKey('arboverse_updated_virus.id'))
    country_id = Column(Integer, ForeignKey('arboverse_updated_disease.id'))


# Define the tables with 3rd step dependencies (dependent on the second set of classes above)
class Virus(Base):
    __tablename__ = 'arboverse_updated_virus'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    genus_id = Column(Integer, ForeignKey("arboverse_updated_virusgenus.id"))  # Update to actual table and column
    specie = Column(String)
    family_id = Column(Integer, ForeignKey("arboverse_updated_virusfamily.id"))  # Update to actual table and column
    abbreviation = Column(String)
    collection_date = Column(String)
    genome_type = Column(String)
    enveloped = Column(Boolean)
    reference_strain = Column(String)
    genome_length_nt = Column(Integer)
    borning_id = Column(Integer, ForeignKey("arboverse_updated_borning.id"))  # Update to actual table and column
    host_amplifier = Column(String)
    human_fatal_disease = Column(Boolean)
    veterinary_diseases = Column(Boolean)
    veterinary_fatal_diseases = Column(Boolean)
    no_cases = Column(String)
    level_of_disease = Column(String)
    vaccine = Column(String)
    vero_cells = Column(Boolean)
    C6_36_cells = Column(Boolean)
    cpe_vero = Column(String)
    plaques_vero = Column(String)
    animal_model = Column(String)
    sals_level = Column(String)


class VectorSpecies(Base):
    __tablename__ = 'arboverse_updated_vectorspecies'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    arthropod_type = Column(String)
    genus_id = Column(Integer, ForeignKey('arboverse_updated_vectorgenus.id'))
    genome = Column(Boolean)
    reference_genome = Column(String)
    genome_size = Column(Integer)
    survival_temperature_ranges = Column(String)
    survival_humidity_percent = Column(String)
    distribution = Column(String)
    adult_life_expectancy_days = Column(String)
    anthropophilic_behaviour = Column(Boolean)
    eggs_viability_days = Column(String)
    lifecycle_time_days = Column(String)
    experimental_infection = Column(String)


def insert_compound_data(compound_class, data, column_mappings):
    records = []

    for _, row in data.iterrows():
        row_data = {}
        skip_record = False

        # Process each column mapping
        for compound_column, (ref_table, df_column) in column_mappings.items():
            value = row[df_column]

            # Skip if value is NaN/None
            if pd.isna(value):
                skip_record = True
                break

            # Look up reference record
            ref_record = session.query(ref_table).filter_by(name=value).first()
            if ref_record:
                row_data[compound_column] = ref_record.id
            else:
                skip_record = True
                break

        # Skip this record if any required values were missing
        if skip_record or not row_data:
            continue

        # Check if a conflicting record exists
        try:
            existing_record = session.query(compound_class).filter_by(**row_data).first()
            if existing_record:
                for key, val in row_data.items():
                    if key == 'name' and (val is None or pd.isna(val)):
                        continue  # Ignore updates to 'name' if it's not populated
                    setattr(existing_record, key, val)  # Update fields
            else:
                # Skip adding new records if `name` is missing
                if 'name' in row_data and (row_data['name'] is None or pd.isna(row_data['name'])):
                    continue
                records.append(compound_class(**row_data))
        except Exception as e:
            print(f"Error processing record: {row_data}")
            print(f"Error: {str(e)}")
            continue

    # Commit in batches
    if records:
        try:
            session.bulk_save_objects(records)
            session.commit()
        except Exception as e:
            session.rollback()
            print(f"Error during bulk insert: {str(e)}")
            # Could add more detailed error handling here if needed

    session.commit()  # Commit any remaining updates


def insert_compound_data_borning(compound_class, data, column_mappings):
    records = []

    for _, row in data.iterrows():
        row_data = {}
        skip_record = False

        # Process each column mapping
        for compound_column, (ref_table, df_column) in column_mappings.items():
            value = row[df_column]

            # Skip if value is NaN/None
            if pd.isna(value):
                skip_record = True
                break

            # Look up reference record
            ref_record = session.query(ref_table).filter_by(borne_type=value).first()
            if ref_record:
                row_data[compound_column] = ref_record.id
            else:
                skip_record = True
                break

        # Skip this record if any required values were missing
        if skip_record or not row_data:
            continue

        # Check if a conflicting record exists
        try:
            existing_record = session.query(compound_class).filter_by(**row_data).first()
            if existing_record:
                for key, val in row_data.items():
                    if key == 'name' and (val is None or pd.isna(val)):
                        continue  # Ignore updates to 'name' if it's not populated
                    setattr(existing_record, key, val)  # Update fields
            else:
                records.append(compound_class(**row_data))
        except Exception as e:
            print(f"Error processing record: {row_data}")
            print(f"Error: {str(e)}")
            continue

    # Commit in batches
    if records:
        try:
            session.bulk_save_objects(records)
            session.commit()
        except Exception as e:
            session.rollback()
            print(f"Error during bulk insert: {str(e)}")
            # Could add more detailed error handling here if needed

    session.commit()  # Commit any remaining updates


def update_virus_vector_main_status(data_df):
    """
    Updates the main_vector column in the VirusVector table based on the provided DataFrame.

    Args:
        data_df: DataFrame containing 'vector', 'virus_name', and 'main_vector' columns
    """
    # Keep track of updates for logging
    update_count = 0
    error_count = 0

    try:
        # Process each row in the DataFrame
        for _, row in data_df.iterrows():
            if pd.isna(row['vector']) or pd.isna(row['virus_name']):
                continue

            try:
                # Get the vector_id from VectorSpecies table
                vector_record = session.query(VectorSpecies).filter_by(name=row['vector']).first()
                if not vector_record:
                    continue

                # Get the virus_id from Virus table
                virus_record = session.query(Virus).filter_by(name=row['virus_name']).first()
                if not virus_record:
                    continue

                # Update the VirusVector record
                virus_vector_record = session.query(VirusVector).filter_by(
                    vector_id=vector_record.id,
                    virus_id=virus_record.id
                ).first()

                if virus_vector_record:
                    virus_vector_record.main_vector = bool(row['main_vector'])
                    update_count += 1

            except Exception as e:
                error_count += 1
                print(f"Error processing record - vector: {row['vector']}, virus: {row['virus_name']}")
                print(f"Error: {str(e)}")
                continue

        # Commit all updates
        session.commit()
        print(f"Successfully updated {update_count} records")
        if error_count > 0:
            print(f"Encountered errors in {error_count} records")

    except Exception as e:
        session.rollback()
        print(f"Fatal error during update process: {str(e)}")
    finally:
        session.close()

insert_data(
    VectorSpecies,
    vector_df,
    {
        'name': 'binominal_name',
        'arthropod_type': 'arthropods_type',
        'genome': 'genome',
        'reference_genome': 'reference_genome',
        'genome_size': 'genome_size',
        'survival_temperature_ranges': 'survival_temperature_ranges',
        'survival_humidity_percent': 'survival_humidity_%',
        'distribution': 'distribution',
        'adult_life_expectancy_days': 'adult_life_expectancy_(day)',
        'anthropophilic_behaviour': 'anthropophilic_behaviour',
        'eggs_viability_days': 'eggs_viability_(days)',
        'lifecycle_time_days': 'lifecycle_time_(days)',
        'experimental_infection': 'experimental infection',
    }
)
insert_compound_data(
    VectorHabitat,
    vector_df,
    {
        'vectorspecies_id': (VectorSpecies, 'binominal_name'),
        'habitat_id': (Habitat, 'habitat'),
    }
)
insert_compound_data(
    VectorLandscape,
    vector_df,
    {
        'vectorspecies_id': (VectorSpecies, 'binominal_name'),
        'landscape_id': (Landscape, 'natural_landscape'),
    }
)
insert_compound_data(
    VectorBloodmeal,
    vector_df,
    {
        'vectorspecies_id': (VectorSpecies, 'binominal_name'),
        'bloodmeal_id': (BloodMeal, 'blood_meal'),
    }
)
insert_compound_data(
    VectorFeedingPeriod,
    vector_df,
    {
        'vectorspecies_id': (VectorSpecies, 'binominal_name'),
        'feedingperiod_id': (FeedingPeriod, 'feeding_period'),
    }
)
vector_df['distribution'] = vector_df['distribution'].replace([None], 'NaN')
insert_compound_data(
    VectorLocation,
    vector_df,
    {
        'vectorspecies_id': (VectorSpecies, 'binominal_name'),
        'location_id': (Location, 'distribution'),
    }
)
insert_data(VectorFamily, vector_df, {'name': 'taxonomy_family'}, True)
insert_compound_data(
    VectorFamily,
    vector_df,
    {
        'order_id': (VectorOrder, 'taxonomy_order'),
    }
)
insert_data(VectorSubFamily, vector_df, {'name': 'taxonomy_sub-family'}, True)
insert_compound_data(
    VectorSubFamily,
    vector_df,
    {
        'family_id': (VectorOrder, 'taxonomy_family'),
    }
)
insert_data(VectorGenus, vector_df, {'name': 'genus'}, True)
insert_compound_data(
    VectorGenus,
    vector_df,
    {
        'family_id': (VectorFamily, 'taxonomy_family'),
        'sub_family_id': (VectorSubFamily, 'taxonomy_sub-family'),
    }
)
virus_df['is_enveloped'] = virus_df['envelope'].apply(lambda x: 1 if x == "enveloped" else 0)
virus_df['is_human_fatal'] = virus_df['human-fatal-diseases'].apply(
    lambda x: 1 if x == "yes" else (np.nan if x == "unknown" else 0)
)
virus_df['is_veterinary_disease'] = virus_df['veterinary-diseases'].apply(
    lambda x: 1 if x == "yes" else (np.nan if x == "unknown" else 0)
)
virus_df['is_veterinary_fatal'] = virus_df['veterinary-fatal-diseases'].apply(
    lambda x: 1 if x == "yes" else (np.nan if x == "unknown" else 0)
)
virus_df['vero_cells'] = virus_df['tissue culture'].apply(
    lambda x: np.nan if x == "unk" else (1 if "Vero" in str(x) else 0)
)
virus_df['C6_36_cells'] = virus_df['tissue culture'].apply(
    lambda x: np.nan if x == "unk" else (1 if "C6/36" in str(x) else 0)
)
virus_df['genome_length_nt'] = virus_df['genome_length_nt'].apply(
    lambda x: np.nan if x == 'unk' else (np.nan if x == '?' else int(x))
)

insert_data(Virus,
            virus_df,
            {
                'name': 'virus_name',
                'specie': 'species',
                'abbreviation': 'abbreviation',
                'collection_date': 'collection_date',
                'genome_type': 'genome_type',
                'enveloped': 'is_enveloped',
                'reference_strain': 'Reference',
                'genome_length_nt': 'genome_length_nt',
                'host_amplifier': 'host-discovery',
                'human_fatal_disease': 'is_human_fatal',
                'veterinary_diseases': 'is_veterinary_disease',
                'veterinary_fatal_diseases': 'is_veterinary_fatal',
                'no_cases': 'no._human_cases',
                'level_of_disease': 'level_of_disease',
                'vaccine': 'vaccine',
                'vero_cells': 'vero_cells',
                'C6_36_cells': 'C6_36_cells',
                'cpe_vero': 'CPE_VERO',
                'plaques_vero': 'PLAQUES_VERO',
                'animal_model': 'animal model',
                'sals_level': 'SALS-level'
            }
)
insert_compound_data(
    Virus,
    virus_df,
    {
        'genus_id': (VirusGenus, 'genus'),
        'family_id': (VirusFamily, 'family'),
    }
)
insert_compound_data_borning(
    Virus,
    virus_df,
    {
        'borning_id': (Borning, 'borne-virus')
    }
)
insert_compound_data(
    VirusCountry,
    virus_df,
    {
        'virus_id': (Virus, 'virus_name'),
        'country_id': (Country, 'country'),
    }
)

vector_1 = virus_df[['vector_1']].copy()
vector_2 = virus_df[['vector_2']].copy()

vector_1['main_vector'] = 1
vector_2['main_vector'] = 0

vector_1 = vector_1.rename(columns={'vector_1': 'vector'})
vector_2 = vector_2.rename(columns={'vector_2': 'vector'})

other_columns = virus_df.drop(columns=['vector_1', 'vector_2'])

# Add these other columns to both 'vector_1' and 'vector_2'
vector_1 = pd.concat([vector_1, other_columns], axis=1)
vector_2 = pd.concat([vector_2, other_columns], axis=1)

virusvector_df = pd.concat([vector_1, vector_2], ignore_index=True)

#print(virusvector_df.columns)

insert_compound_data(
    VirusVector,
    virusvector_df,
    {
        'vector_id': (VectorSpecies, 'vector'),
        'virus_id': (Virus, 'virus_name'),
    }
)

update_virus_vector_main_status(virusvector_df)

# Close session
session.close()
