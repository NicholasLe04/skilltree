from database.connection import get_connection


def setup():
    with get_connection().cursor() as cur:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS users(username VARCHAR(60) NOT NULL UNIQUE PRIMARY KEY, password VARCHAR(128) NOT NULL, verified BOOLEAN NOT NULL, description VARCHAR);"
        )
        cur.execute(
            "CREATE TABLE IF NOT EXISTS skilltree(skilltree_id SERIAL PRIMARY KEY, username VARCHAR(60) REFERENCES users(username), skill VARCHAR(128) NOT NULL, description VARCHAR, tags VARCHAR(128)[], upvotes INTEGER NOT NULL DEFAULT '0', downvotes INTEGER NOT NULL DEFAULT '0', tree JSON NOT NULL);"
        )
