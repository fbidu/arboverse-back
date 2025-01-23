import geopandas as gpd
import pandas as pd
import json
import datetime
from shapely.geometry import mapping
from shapely.geometry import shape
import numpy as np


def simplify_geometry(geom, tolerance=0.01):
    """Simplify geometry with specified tolerance"""
    return geom.simplify(tolerance, preserve_topology=True)


def round_coordinates(geometry_dict, precision=4):
    """Round coordinates in a geometry dictionary to reduce precision"""
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


# Load the shapefile
shapefile_path = "GeoJSON/ne_50m_admin_0_countries.shp"
gdf = gpd.read_file(shapefile_path)

# Load your spreadsheet data
doc = "Arbovirus_distribution-use-for-layer.xlsx"
sheetname = "Binary ISO alpha 3 - virus"
data = pd.read_excel(doc, sheet_name=sheetname)

# Strip spaces from column names
data.columns = data.columns.str.strip()

# Get the list of virus columns
iso_column = "ISO ALPHA-3"
virus_columns = data.columns.tolist()[2:]

# Create a dictionary for fast ISO lookup
# Simplify geometries before creating the lookup
gdf['geometry'] = gdf['geometry'].apply(lambda x: simplify_geometry(x, tolerance=0.01))
gdf = gdf.set_index("ISO_A3")
geo_lookup = gdf["geometry"].to_dict()

# Build the GeoJSON
features = []
for index, row in data.iterrows():
    iso_code = row[iso_column]
    geometry = geo_lookup.get(iso_code)

    if geometry is not None:
        # Convert geometry to GeoJSON dict and round coordinates
        geom_dict = round_coordinates(mapping(geometry), precision=4)

        for virus in virus_columns:
            presence = row[virus]
            features.append({
                "type": "Feature",
                "properties": {
                    "i": iso_code,  # Shortened property name
                    "v": virus.lower(),  # Shortened property name
                    "p": int(presence) if not pd.isna(presence) else 0  # Ensure correct presence value
                },
                "geometry": geom_dict
            })

geojson = {
    "type": "FeatureCollection",
    "features": features
}

# Save GeoJSON to file
timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
output_path = f"GeoJSON/{timestamp}.geojson"

# Save with minimal whitespace
with open(output_path, "w") as f:
    json.dump(geojson, f, separators=(',', ':'))

# Print file size
import os

file_size = os.path.getsize(output_path) / (1024 * 1024)  # Convert to MB
print(f"GeoJSON saved to {output_path}")
print(f"File size: {file_size:.2f} MB")
