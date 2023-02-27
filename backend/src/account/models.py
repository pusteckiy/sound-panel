from sqlalchemy import Table, Column, Integer, String

from src.db.core import metadata


users = Table(
    "users",
    metadata,

    Column("id", Integer, primary_key=True),
    Column("username", String(32), unique=True),
    Column("password", String(64)),
    Column("access", Integer)
)
