import psycopg
from psycopg.rows import namedtuple_row

from config import Settings

def get_connection():
    return psycopg.connect(
                            Settings.DATABASE_URL, 
                            application_name="$ skilltree", 
                            row_factory=namedtuple_row
                        )