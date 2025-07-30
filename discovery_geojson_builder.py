import geopandas as gpd
import pandas as pd
import json
import datetime
from shapely.geometry import mapping
import numpy as np
import os

# --- Helper Functions (unchanged from your original script) ---

def simplify_geometry(geom, tolerance=0.001):
    """Simplify geometry with specified tolerance. A smaller tolerance preserves more detail."""
    return geom.simplify(tolerance, preserve_topology=True)


def round_coordinates(geometry_dict, precision=4):
    """Round coordinates in a geometry dictionary to reduce precision and file size."""
    if geometry_dict['type'] == 'Polygon':
        geometry_dict['coordinates'] = [[[round(x, precision) for x in point]
                                         for point in linear_ring]
                                        for linear_ring in geometry_dict['coordinates']]
    elif geometry_dict['type'] == 'MultiPolygon':
        geometry_dict['coordinates'] = [[[[round(x, precision) for x in point]
                                          for point in linear_ring]
                                         for linear_ring in polygon]
                                        for polygon in geometry_dict['coordinates']]
    return geometry_dict


# --- Main Script ---

# 1. DEFINE FILE PATHS
# Path to the countries shapefile
shapefile_path = "ne_50m_admin_0_countries.shp"
# Path to your main arbovirus data file (CSV format)
# !!! IMPORTANT: Update this to the correct path for your main arbovirus CSV file.
arbovirus_data_path = "The global distribution of arbovirus diversity - OFFICIAL.xlsx"
# Output directory for the GeoJSON
output_dir = "GeoJSON_Taxonomic"


# 2. LOAD GEOGRAPHIC DATA
# Load the shapefile and handle potential errors
try:
    gdf = gpd.read_file(shapefile_path)
    print("Shapefile loaded successfully.")
except Exception as e:
    print(f"Error loading shapefile at {shapefile_path}: {e}")
    exit()

# Pre-process the GeoDataFrame
# Simplify geometries to reduce file size. Adjust tolerance as needed.
gdf['geometry'] = gdf['geometry'].apply(lambda x: simplify_geometry(x, tolerance=0.001))

# The KeyError indicates the column 'ISO_A3' does not exist in the shapefile.
# We will inspect the columns and find the correct one. Common names are 'ADM0_A3' or 'ISO_A3_EH'.
print("Inspecting shapefile columns to find the correct ISO A3 code column...")
print(f"Available columns: {gdf.columns.tolist()}")

# Find the correct ISO A3 column name from a list of common candidates
iso_col_candidates = ['ADM0_A3', 'ISO_A3_EH', 'ISO_A3']
iso_col_in_gdf = None
for col in iso_col_candidates:
    if col in gdf.columns:
        iso_col_in_gdf = col
        break

if iso_col_in_gdf is None:
    print(f"Error: Could not find a suitable ISO A3 column in the shapefile from candidates: {iso_col_candidates}")
    exit()

print(f"Found ISO A3 column: '{iso_col_in_gdf}'. Using this column to join data.")
# Set the index to the correct ISO A3 code column for easy lookup
gdf = gdf.set_index(iso_col_in_gdf)


# 3. LOAD AND PROCESS ARBOVIRUS TAXONOMIC DATA
# Load your main data spreadsheet and handle potential errors
try:
    tax_data = pd.read_excel(arbovirus_data_path, sheet_name="main_arbovirus")
    print("Arbovirus taxonomic data loaded successfully.")
except Exception as e:
    print(f"Error loading CSV file at {arbovirus_data_path}: {e}")
    exit()

# Clean column names by stripping leading/trailing whitespace
tax_data.columns = tax_data.columns.str.strip()

# Define the columns we need for aggregation
required_cols = ['iso_a3', 'family', 'genus', 'species']
# Check if all required columns exist
if not all(col in tax_data.columns for col in required_cols):
    print(f"Error: The CSV file must contain the following columns: {required_cols}")
    exit()

# Drop rows where essential taxonomic information or the country code is missing
tax_data.dropna(subset=required_cols, inplace=True)

# Group by country (iso_a3) and aggregate the unique families, genera, and species into sorted lists
print("Aggregating taxonomic data by country...")
taxa_by_country = tax_data.groupby('iso_a3').agg({
    'family': lambda x: sorted(list(x.unique())),
    'genus': lambda x: sorted(list(x.unique())),
    'species': lambda x: sorted(list(x.unique()))
}).reset_index()

# Create a lookup dictionary for fast access to taxonomic lists by ISO code
taxa_lookup = taxa_by_country.set_index('iso_a3').to_dict('index')
print("Taxonomic data processing complete.")


# 4. BUILD THE GEOJSON
print("Building GeoJSON features...")
features = []
# Iterate through the ISO codes found in our processed taxonomic data
for iso_code, country_taxa in taxa_lookup.items():
    # Look up the country's data in the GeoDataFrame
    try:
        country_row = gdf.loc[iso_code]
    except KeyError:
        print(f"Warning: ISO code '{iso_code}' from data file not found in shapefile. Skipping.")
        continue

    # Get the geometry and convert it to a dictionary with rounded coordinates
    geometry = country_row.geometry
    if geometry.is_empty:
        continue # Skip countries with no geometry
    geom_dict = round_coordinates(mapping(geometry), precision=4)

    # Append the feature to our list
    features.append({
        "type": "Feature",
        "properties": {
            "iso_a3": iso_code,
            "name": country_row['NAME'],
            "families": country_taxa['family'],
            "genera": country_taxa['genus'],
            "species": country_taxa['species']
        },
        "geometry": geom_dict
    })

# Assemble the final GeoJSON FeatureCollection
geojson_output = {
    "type": "FeatureCollection",
    "features": features
}
print(f"GeoJSON feature construction complete. {len(features)} features created.")


# 5. SAVE THE GEOJSON TO A FILE
# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Generate a timestamp for a unique filename
timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
output_path = os.path.join(output_dir, f"taxonomic_distribution_{timestamp}.geojson")

# Save the GeoJSON with minimal whitespace to reduce file size
print(f"Saving GeoJSON to {output_path}...")
with open(output_path, "w") as f:
    json.dump(geojson_output, f, separators=(',', ':'))

# Print the final file size
file_size_mb = os.path.getsize(output_path) / (1024 * 1024)
print("Script finished successfully!")
print(f"File size: {file_size_mb:.2f} MB")
