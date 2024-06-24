import sqlite3


db = sqlite3.connect("test.db")
cur = db.cursor()

def insert_name_email(name,email):
    query_string ="INSERT INTO email (name,email) VALUES (?,?)" 
    cur.execute(query_string,(name,email))
    db.commit()


