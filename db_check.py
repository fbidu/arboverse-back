import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

engine = create_engine(f'postgresql+psycopg2://{os.getenv("PGSQL_USER")}:{os.getenv("PGSQL_PASS")}@{os.getenv("PGSQL_HOST")}:{int(os.getenv("PGSQL_PORT"))}/{os.getenv("PGSQL_DB")}')
try:
    connection = engine.connect()
    print("Connection successful")
except Exception as e:
    print(f"Error: {e}")
finally:
    connection.close()
