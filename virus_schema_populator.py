import os
import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

load_dotenv()

# Database connection
engine = create_engine(
    f"postgresql+psycopg2://{os.getenv('PGSQL_USER')}:{os.getenv('PGSQL_PASS')}@{os.getenv('PGSQL_HOST')}:{int(os.getenv('PGSQL_PORT'))}/{os.getenv('PGSQL_DB')}")
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


class VectorGenus(Base):
    __tablename__ = 'arboverse_updated_vectorgenus'
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
vector_df = pd.read_csv('Arbovector_database.csv')


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

        if row_data:  # Only add rows where data is valid
            # Check for existing records in the database if unique is True
            if unique:
                exists = session.query(table_class).filter_by(**row_data).first() is not None
                if not exists:
                    records.append(table_class(**row_data))
            else:
                records.append(table_class(**row_data))

    # Bulk save the objects to the session and commit
    if records:  # Only commit if there are records to insert
        session.bulk_save_objects(records)
        session.commit()


# Build all dependency tables first, this is any table which only has and ID and a name value
insert_data(Country, virus_df, {'name': 'country'}, True)
insert_data(VirusGenus, virus_df, {'name': 'genus'}, True)
insert_data(VirusFamily, virus_df, {'name': 'family'}, True)
insert_data(Borning, virus_df, {'borne_type': 'borne-virus'}, True)
insert_data(VectorOrder, vector_df, {'name': 'taxonomy_order'}, True)
insert_data(VectorGenus, vector_df, {'name': 'genome'}, True)
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
    vector_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    landscape_id = Column(ForeignKey('arboverse_updated_landscape.id'), primary_key=True)


class VectorBloodmeal(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_blood_meal'
    vector_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    blood_meal_id = Column(ForeignKey('arboverse_updated_bloodmeal.id'), primary_key=True)


class VectorFeedingPeriod(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_feeding_period'
    vector_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    blood_meal_id = Column(ForeignKey('arboverse_updated_feedingperiod.id'), primary_key=True)


class VectorLocation(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_location'
    vector_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    location_id = Column(ForeignKey('arboverse_updated_location.id'), primary_key=True)


class VectorHabitat(Base):
    __tablename__ = 'arboverse_updated_vectorspecies_habitat'
    vector_id = Column(ForeignKey('arboverse_updated_vectorspecies.id'), primary_key=True)
    habitat_id = Column(ForeignKey('arboverse_updated_habitat.id'), primary_key=True)


class VectorFamily(Base):
    __tablename__ = 'arboverse_updated_vectorfamily'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    order = Column(Integer, ForeignKey('arboverse_updated_vectororder.id'))
    genus = Column(String, ForeignKey('arboverse_updated_vectorgenus.name'))


class VectorSubFamily(Base):
    __tablename__ = 'arboverse_updated_vectorsubfamily'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True)
    family_id = Column(Integer, ForeignKey('arboverse_updated_vectorfamily.id'))
    genus = Column(String, ForeignKey('arboverse_updated_vectorgenus.id'))


class VirusVector(Base):
    __tablename__ = 'arboverse_updated_virusvector'
    id = Column(Integer, primary_key=True, autoincrement=True)
    main_vector = Column(Boolean)
    vector_id = Column(Integer, ForeignKey('arboverse_updated_vectorspecies.id'))
    virus_id = Column(Integer, ForeignKey('arboverse_updated_virus.id'))


class VirusCountry(Base):
    __tablename__ = 'arboverse_updated_virus_country'
    virus_id = Column(Integer, ForeignKey('arboverse_updated_virus.id'))
    country_id = Column(Integer, ForeignKey('arboverse_updated_country.id'))


class VirusDiseases(Base):
    __tablename__ = 'arboverse_updated_virus_diseases'
    virus_id = Column(Integer, ForeignKey('arboverse_updated_virus.id'))
    country_id = Column(Integer, ForeignKey('arboverse_updated_disease.id'))


# Define the tables with 3rd step dependencies (dependent on the second set of classes above)
class Virus(Base):
    __tablename__ = 'arboverse_updated_virus'
    id = Column(Integer, primary_key=True, autoincrement=True)
    virus_name = Column(String)
    genus = Column(Integer, ForeignKey("arboverse_updated_virusgenus.id"))  # Update to actual table and column
    species = Column(String)
    family = Column(Integer, ForeignKey("arboverse_updated_virusfamily.id"))  # Update to actual table and column
    abbreviation = Column(String)
    collection_date = Column(String)
    genome_type = Column(String)
    envelope = Column(Boolean)
    reference_strain = Column(String)
    genome_length_nt = Column(Integer)
    borning = Column(Integer, ForeignKey("arboverse_updated_borning.id"))  # Update to actual table and column
    host_amplifier = Column(String)
    human_fatal_disease = Column(Boolean)
    veterinary_diseases = Column(Boolean)
    veterinary_fatal_diseases = Column(Boolean)
    no_cases = Column(String)
    level_of_disease__autocolour = Column(String)
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
    arthropods_type = Column(String)
    genus = Column(Integer, ForeignKey('arboverse_updated_vectorgenus.id'))
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


# Close session
session.close()
