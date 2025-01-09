import datetime

import pandas as pd
import json

doc = 'Arbovirus_distribution-use-for-layer.xlsx'  # put the filepath for the file you wish to pull data from here
sheetname = 'Binary ISO alpha 3 - virus'  # if your document has multiple sheets, match the name here so that the right data is gotten
spreadsheet = pd.ExcelFile(doc)

data = pd.read_excel(spreadsheet, sheet_name=sheetname)

iso_column = 'ISO ALPHA-3'  # column containing country label
data.columns = data.columns.str.strip()  # clean extra spaces

# Get a list of the columns containing viruses only, removing country and ISO columns
virus_columns = data.columns
print(virus_columns)
virus_columns.pop(0)
virus_columns.pop(0)

# Create a GeoJSON for uploading to Mapbox
features = []
for index, row in data.iterrows():
    iso_code = row[iso_column]
    # here we need a way to check each column after ISO ALPHA-3 for 0 and 1 values.

    for each in virus_columns:
        feature = {
            "type": "Feature",
            "properties": {
                "iso_code": iso_code,
                "virus_name": each,
                "virus_present": not pd.isna(row[each])
            },
            "geometry": None  # Mapbox has the ISO code above, so we don't actually need this
        }
        features.append(feature)

        geojson = {
            "type": "FeatureCollection",
            "features": features
        }

output_path = 'GeoJSON/' + datetime.datetime.now() + '.geojson'
with open(output_path, 'w') as f:
    json.dump(geojson, f)



