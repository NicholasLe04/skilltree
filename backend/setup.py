from backend.database.connection import get_connection

def setup(connection):
    with connection.cursor() as cursor:
        cursor.execute(
            '''
            CREATE TABLE IF NOT EXISTS user (
                user_id SERIAL PRIMARY KEY,
            '''
        )