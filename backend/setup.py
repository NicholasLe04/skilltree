from backend.database.connection import get_connection

def setup(connection):
    with connection.cursor() as cursor:
        cursor.execute(
            '''
            CREATE TABLE IF NOT EXISTS user (
                username VARCHAR(60) NOT NULL UNIQUE PRIMARY KEY,
                password VARCHAR(128) NOT NULL,
                verified BOOLEAN NOT NULL,
                description VARCHAR
            );

            CREATE TABLE IF NOT EXISTS skilltree (
                skilltree_id SERIAL PRIMARY KEY,
                username VARCHAR(60) REFERENCES user(username),
                skill VARCHAR(128) NOT NULL,
                description VARCHAR,
                tree JSONB
            );
            '''
        )