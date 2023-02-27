import string
import random
import os

import aiofiles
from datetime import timedelta, datetime
from fastapi import HTTPException, UploadFile
from sqlalchemy.sql import func, and_

from src.account.models import users
from src.account.schemas import User
from src.sounds.models import sounds, genres
from src.sounds.schemas import Sound
from src.db.core import database

max_file_size = 20 * 1024 * 1024


def get_file_path_and_generate_name():
    module_path = os.path.dirname(__file__)
    file_name = ''.join(random.choice(string.ascii_letters) for i in range(16))
    return f"{module_path}\\files\\{file_name}"


async def read_sounds(sid: int = None):
    if sid is None:
        query = sounds.select()
        return await database.fetch_all(query)

    query = sounds.select().where(sounds.c.id == sid)
    return await database.fetch_one(query)


async def save_file(file: UploadFile):
    if not file.filename.endswith(('.mp3', '.wav')):
        raise HTTPException(status_code=400, detail="Wrong file extension.")

    content = await file.read()
    if len(content) > max_file_size:
        raise HTTPException(
            status_code=413, detail="File too large. Max 20 mb.")

    out_file_path = f"{get_file_path_and_generate_name()}.mp3"

    async with aiofiles.open(out_file_path, 'wb') as out_file:
        await out_file.write(content)


async def create_sound(user: User, sound: Sound, file: UploadFile):
    query = sounds.select().where(and_(
        func.levenshtein(sounds.c.title, sound.title) <= 3, 
        func.levenshtein(sounds.c.author, sound.author) <= 3
    ))
    similar_sound = await database.fetch_one(query)
    if similar_sound:
        raise HTTPException(
            status_code=400, 
            detail=f"Similar song is already in the database. Title: {similar_sound.title} Author: {similar_sound.author}"
            )
    
    file_path = await save_file(file)
    query = sounds.insert().values(
        title=sound.title, 
        author=sound.author, 
        genre=sound.genre, 
        owner=user.id, 
        file=file_path
        )
    return await database.execute(query)


async def read_genres(gid: int):
    if gid is None:
        query = genres.select()
        return await database.fetch_all(query)

    query = sounds.select().where(sounds.c.id == gid)
    return await database.fetch_one(query)


async def create_genres(genre, icon):
    pass