from pydantic import BaseModel
from fastapi import UploadFile


class Sound(BaseModel):
    title: str
    author: str
    genre: int


class Genre(BaseModel):
    title: str
