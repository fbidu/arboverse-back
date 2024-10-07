import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

load_dotenv()


# Creates a DB engine for use in other functions
def get_engine():
    return create_engine(
        f'postgresql+psycopg2://{os.getenv('PGSQL_USER')}:{os.getenv('PGSQL_PASS')}@{os.getenv('PGSQL_HOST')}:{int(os.getenv('PGSQL_PORT'))}/{os.getenv('PGSQL_DB')}')


# This runs when docker-compose is run to build the initial search DB.
def initial_upload(engine, csv_file_path, table_name):
    df = pd.read_csv(csv_file_path)
    try:
        df.to_sql(table_name, con=engine)
        print(f'Table {table_name} was successfully created. Printing contents')
    except ValueError as ve:
        print(f'Error: {ve}. Printing database contents.')
    with engine.connect() as conn:
        result = conn.execute(text(f"""select * from \"{table_name}\""""))

        for row in result:
            print(row)

    conn.close()
    return


def update_database(engine, csv_file_path):
    return


def main():
    engine = get_engine()
    initial_upload(engine, 'Arbovector_database.csv', 'vector_search')  # upload vectors

    return


if __name__ == '__main__':
    main()

