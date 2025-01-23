# this file exists as a backup in case you generate a layer which uses
# search functionality and forget to lowercase it before uploading.

import json


# Function to process the GeoJSON file
def process_geojson(input_file, output_file):
    # Load the original GeoJSON data from the input file
    with open(input_file, 'r') as infile:
        geojson_data = json.load(infile)

    # Loop through the features and update "v" values to lowercase
    for feature in geojson_data["features"]:
        feature["properties"]["v"] = feature["properties"]["v"].lower()

    # Save the updated GeoJSON data to the output file
    with open(output_file, 'w') as outfile:
        json.dump(geojson_data, outfile, indent=2)


# Example usage:
input_file = 'GeoJSON/2025-01-17_12-36-35.geojson'  # Replace with your input file path
output_file = 'GeoJSON/2025-01-17_12-36-35_lowercase_viruses.geojson'  # Replace with your output file path

process_geojson(input_file, output_file)

