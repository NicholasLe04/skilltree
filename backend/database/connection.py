import psycopg
from psycopg.rows import namedtuple_row

from config import Settings

connection = psycopg.connect(
                            Settings.DATABASE_URL, 
                            application_name="$ skilltree", 
                            row_factory=namedtuple_row
                        )

def get_connection():
    return connection