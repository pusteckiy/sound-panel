from fastapi import APIRouter, Depends, UploadFile, File, Form

from src.account.schemas import User
from src.account.services import get_user
from src.sounds.schemas import Sound, Genre
from src.sounds.services import read_sounds, create_sound, read_genres, create_genres


router = APIRouter(
    prefix='/api/sounds',
    tags=['Sounds']
)


@router.get('/')
async def get_sound(sid: int | None = None):
    return await read_sounds(sid)


@router.post('/')
async def add_sound(
    user: User = Depends(get_user), sound: Sound = Depends(), file: UploadFile = File(...)
):
    return await create_sound(user, sound, file)


@router.get('/genres')
async def get_genre(gid: int | None):
    return await read_genres(gid)


@router.post('/genres')
async def add_genre(
    user: User = Depends(get_user), genre: Genre = Depends(), icon: UploadFile = File(...)
):
    return await create_genres(user, genre, icon)
