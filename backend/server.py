from backend.setup import setup
from backend.database.connection import get_connection

conn = get_connection()

# SETUP DATABASE
setup(conn)