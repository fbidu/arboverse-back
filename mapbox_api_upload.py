import requests
import os
import json
import time
from datetime import datetime
import boto3
from botocore.config import Config


def upload_to_mapbox(mbtiles_path, mapbox_access_token, username, tileset_name):
    """
    Upload an .mbtiles file to Mapbox

    Args:
        mbtiles_path (str): Path to .mbtiles file
        mapbox_access_token (str): Your Mapbox access token
        username (str): Your Mapbox username
        tileset_name (str): Name for the tileset (username.tileset_id)
    """

    # Step 1: Request upload credentials
    credentials_url = f"https://api.mapbox.com/uploads/v1/{username}/credentials?access_token={mapbox_access_token}"
    credentials_response = requests.post(credentials_url)

    if credentials_response.status_code != 200:
        raise Exception(f"Failed to get credentials: {credentials_response.text}")

    credentials = credentials_response.json()

    # Print credentials structure for debugging (remove sensitive info)
    print("Credential keys received:", list(credentials.keys()))

    # Step 2: Configure AWS client with temporary credentials
    s3_client = boto3.client(
        's3',
        aws_access_key_id=credentials['accessKeyId'],
        aws_secret_access_key=credentials['secretAccessKey'],
        aws_session_token=credentials['sessionToken'],
        region_name='us-east-1',
        config=Config(signature_version='s3v4')
    )

    # Step 3: Upload file to S3
    print(f"Uploading {mbtiles_path} to S3...")
    file_name = os.path.basename(mbtiles_path)
    try:
        s3_client.upload_file(
            mbtiles_path,
            credentials['bucket'],
            credentials['key'],
            Callback=ProgressPercentage(mbtiles_path)
        )
    except Exception as e:
        raise Exception(f"Failed to upload to S3: {str(e)}")

    # Step 4: Create Mapbox upload
    s3_url = credentials['url']  # Use the URL provided in credentials
    upload_url = f"https://api.mapbox.com/uploads/v1/{username}?access_token={mapbox_access_token}"

    upload_params = {
        'url': s3_url,
        'tileset': tileset_name,
        'name': file_name
    }

    upload_response = requests.post(upload_url, json=upload_params)
    if upload_response.status_code != 201:
        raise Exception(f"Failed to create upload: {upload_response.text}")

    upload_id = upload_response.json()['id']

    # Step 5: Monitor upload progress
    while True:
        status_url = f"https://api.mapbox.com/uploads/v1/{username}/{upload_id}?access_token={mapbox_access_token}"
        status_response = requests.get(status_url)

        if status_response.status_code != 200:
            raise Exception(f"Failed to get upload status: {status_response.text}")

        status = status_response.json()

        if 'error' in status and status['error']:
            raise Exception(f"Upload failed: {status['error']}")

        if status.get('complete'):
            print("\nUpload completed successfully!")
            break

        print(f"\rProgress: {status.get('progress', 0) * 100:.1f}%", end="")
        time.sleep(10)


class ProgressPercentage:
    def __init__(self, filename):
        self._filename = filename
        self._size = float(os.path.getsize(filename))
        self._seen_so_far = 0
        self._start_time = datetime.now()

    def __call__(self, bytes_amount):
        self._seen_so_far += bytes_amount
        percentage = (self._seen_so_far / self._size) * 100
        elapsed_time = (datetime.now() - self._start_time).seconds
        speed = self._seen_so_far / (1024 * 1024 * max(elapsed_time, 1))  # MB/s

        print(f"\rProgress: {percentage:.2f}% ({speed:.2f} MB/s)", end="")


if __name__ == "__main__":
    # Replace these with your values
    MAPBOX_ACCESS_TOKEN = "sk.eyJ1IjoiYXJib3ZlcnNlIiwiYSI6ImNtNjZrcWUyczAxYnoyanE0enE5djd3MzcifQ.fbqMrvc8-_3lfH3Vx1_mkQ"
    MBTILES_PATH = "GeoJSON/virus_overlay_110m.mbtiles"
    TILESET_NAME = "arboverse.virusdiscovery"  # e.g., "username.my-custom-tileset"
    USERNAME = "arboverse"

    upload_to_mapbox(MBTILES_PATH, MAPBOX_ACCESS_TOKEN, USERNAME, TILESET_NAME)

    #curl -X POST "https://api.mapbox.com/uploads/v1/arboverse/credentials?access_token=sk.eyJ1IjoiYXJib3ZlcnNlIiwiYSI6ImNtNjZrcWUyczAxYnoyanE0enE5djd3MzcifQ.fbqMrvc8-_3lfH3Vx1_mkQ"
