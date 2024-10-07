from sqlalchemy import create_engine, text
from pandas import *


def main(filename):
    user = 'arboverse'
    pwd = 'postgres'
    host = 'localhost'
    port = 5432
    db = 'arboverse_db'

    engine = create_engine(f'postgresql+psycopg2://{user}:{pwd}@{host}:{int(port)}/{db}')

    df = read_csv(filename)
    df.to_sql('arboverse_search_database', engine, schema='public', if_exists='replace', index=False)

    with engine.connect() as conn:
        result = conn.execute(text("""select * from \"arboverse_search_database\""""))

        for row in result:
            print(row)

    return


if __name__ == '__main__':
    main('../Arbovector_database.csv')
