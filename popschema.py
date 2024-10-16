import pandas as pd
from sqlalchemy import create_engine, Table, MetaData
import os
from dotenv import load_dotenv

load_dotenv()

# Load CSV data
df = pd.read_csv('Arbovector_database.csv')

# Database connection setup (PostgreSQL example)
engine = create_engine(f'postgresql+psycopg2://{os.getenv('PGSQL_USER')}:{os.getenv('PGSQL_PASS')}@{os.getenv('PGSQL_HOST')}:{int(os.getenv('PGSQL_PORT'))}/{os.getenv('PGSQL_DB')}')

connection = engine.connect()
metadata = MetaData()

# Define table references (add other tables as needed)
vector_order_table = Table('arboverse_updated_vectororder', metadata, autoload_with=engine)
vector_family_table = Table('arboverse_updated_vectorfamily', metadata, autoload_with=engine)
vector_sub_family_table = Table('arboverse_updated_vectorsubfamily', metadata, autoload_with=engine)
vector_species_table = Table('arboverse_updated_vectorspecies', metadata, autoload_with=engine)
habitat_table = Table('arboverse_updated_habitat', metadata, autoload_with=engine)
landscape_table = Table('arboverse_updated_landscape', metadata, autoload_with=engine)
blood_meal_table = Table('arboverse_updated_bloodmeal', metadata, autoload_with=engine)
feeding_period_table = Table('arboverse_updated_feedingperiod', metadata, autoload_with=engine)
virus_table = Table('arboverse_updated_virus', metadata, autoload_with=engine)
virus_vector_table = Table('arboverse_updated_virusvector', metadata, autoload_with=engine)


# Function to insert into vector_order
def insert_vector_order(order_name):
    existing_order = connection.execute(
        vector_order_table.select().where(vector_order_table.c.name == str(order_name))
    ).fetchone()

    if not existing_order:
        insert_stmt = vector_order_table.insert().values(name=order_name)
        connection.execute(insert_stmt)


# Function to insert into vector_family, linking to vector_order
def insert_vector_family(family_name, order_name):
    order_id = connection.execute(
        vector_order_table.select().where(vector_order_table.c.name == str(order_name))
    ).fetchone()[0]

    existing_family = connection.execute(
        vector_family_table.select().where(vector_family_table.c.name == str(family_name))
    ).fetchone()

    if not existing_family:
        insert_stmt = vector_family_table.insert().values(name=family_name, order_id=order_id)
        connection.execute(insert_stmt)


# Function to insert into vector_sub_family, linking to vector_family
def insert_vector_sub_family(sub_family_name, family_name):
    family_id = connection.execute(
        vector_family_table.select().where(vector_family_table.c.name == str(family_name))
    ).fetchone()[0]

    existing_sub_family = connection.execute(
        vector_sub_family_table.select().where(vector_sub_family_table.c.name == str(sub_family_name))
    ).fetchone()

    if not existing_sub_family:
        insert_stmt = vector_sub_family_table.insert().values(name=sub_family_name, family_id=family_id)
        connection.execute(insert_stmt)


# Function to insert into vector_species, linking to sub_family
def insert_vector_species(species_name, arthropods_type, sub_family_name, genome, reference_genome, genome_size,
                          life_expectancy):
    sub_family_id = connection.execute(
        vector_sub_family_table.select().where(vector_sub_family_table.c.name == str(sub_family_name))
    ).fetchone()[0]

    existing_species = connection.execute(
        vector_species_table.select().where(vector_species_table.c.name == str(species_name))
    ).fetchone()

    if not existing_species:
        insert_stmt = vector_species_table.insert().values(
            name=species_name,
            arthropod_type=arthropods_type,
            genome=False if genome == 'tbc' else genome,
            reference_genome=reference_genome,
            genome_size=0 if genome_size == 'tbc' else genome_size,
            adult_life_expectancy_days=life_expectancy
        )
        connection.execute(insert_stmt)


# Insert data into habitat table
def insert_habitat(habitat_name):
    existing_habitat = connection.execute(
        habitat_table.select().where(habitat_table.c.name == str(habitat_name))
    ).fetchone()

    if not existing_habitat:
        insert_stmt = habitat_table.insert().values(name=habitat_name)
        connection.execute(insert_stmt)


# Insert data into landscape table
def insert_landscape(landscape_name):
    existing_landscape = connection.execute(
        landscape_table.select().where(landscape_table.c.name == str(landscape_name))
    ).fetchone()

    if not existing_landscape:
        insert_stmt = landscape_table.insert().values(name=landscape_name)
        connection.execute(insert_stmt)


# Insert data into blood_meal table
def insert_blood_meal(blood_meal_name):
    existing_blood_meal = connection.execute(
        blood_meal_table.select().where(blood_meal_table.c.name == str(blood_meal_name))
    ).fetchone()

    if not existing_blood_meal:
        insert_stmt = blood_meal_table.insert().values(name=blood_meal_name)
        connection.execute(insert_stmt)


# Insert data into feeding_period table
def insert_feeding_period(feeding_period_name):
    existing_feeding_period = connection.execute(
        feeding_period_table.select().where(feeding_period_table.c.name == str(feeding_period_name))
    ).fetchone()

    if not existing_feeding_period:
        insert_stmt = feeding_period_table.insert().values(name=feeding_period_name)
        connection.execute(insert_stmt)


# Function to insert into virus table
def insert_virus(virus_name, family_name):
    existing_virus = connection.execute(
        virus_table.select().where(virus_table.c.name == str(virus_name))
    ).fetchone()

    if not existing_virus:
        insert_stmt = virus_table.insert().values(name=virus_name, family_name=family_name)
        connection.execute(insert_stmt)


# Function to insert virus-vector relationships
def insert_virus_vector(virus_name, vector_name):
    virus_id = connection.execute(
        virus_table.select().where(virus_table.c.name == str(virus_name))
    ).fetchone()[0]

    vector_id = connection.execute(
        vector_species_table.select().where(vector_species_table.c.name == str(vector_name))
    ).fetchone()[0]

    existing_virus_vector = connection.execute(
        virus_vector_table.select().where(virus_vector_table.c.virus_id == virus_id)
            .where(virus_vector_table.c.vector_id == vector_id)
    ).fetchone()

    if not existing_virus_vector:
        insert_stmt = virus_vector_table.insert().values(virus_id=virus_id, vector_id=vector_id)
        connection.execute(insert_stmt)


# Iterate over rows in the CSV and insert into the appropriate tables
for index, row in df.iterrows():
    print(row['taxonomy_order'])
    # Insert into vector_order, vector_family, vector_sub_family
    insert_vector_order(row['taxonomy_order'])
    insert_vector_family(row['taxonomy_family'], row['taxonomy_order'])
    insert_vector_sub_family(row['taxonomy_sub-family'], row['taxonomy_family'])

    # Insert into vector_species
    insert_vector_species(
        row['binominal_name'],
        row['arthropods_type'],
        row['taxonomy_sub-family'],
        row['genome'],
        row['reference_genome'],
        row['genome_size'],
        row['adult_life_expectancy_(day)']
    )

    # Insert into habitat, landscape, blood_meal, feeding_period
    insert_habitat(row['habitat'])
    insert_landscape(row['natural_landscape'])
    insert_blood_meal(row['blood_meal'])
    insert_feeding_period(row['feeding_period'])

    # Insert into virus table
    insert_virus(row['virus_name'], row['virus_family'])

    # Insert into virus-vector relationship
    insert_virus_vector(row['virus_name'], row['binominal_name'])  # Assuming binominal_name is the vector name

connection.commit()

# Close the database connection
connection.close()
