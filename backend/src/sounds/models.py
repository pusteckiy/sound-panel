from sqlalchemy import Table, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func

from src.db.core import metadata


sounds = Table(
    "sounds",
    metadata,

    Column("id", Integer, primary_key=True),
    Column("title", String(64)),
    Column("author", String(64)),
    Column("genre", ForeignKey("genres.id")),
    Column("owner", ForeignKey("users.id")),
    Column("load_at", DateTime, server_default=func.now()),
    Column("file", String(255))
)


genres = Table(
    "genres",
    metadata,

    Column("id", Integer, primary_key=True),
    Column("title", String(64), unique=True),
    Column("icon", String(255))
)