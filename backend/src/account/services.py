import random
import string

import jwt
import bcrypt
from datetime import timedelta, datetime
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from asyncpg.exceptions import UniqueViolationError

from src.config import settings
from src.account.models import users
from src.db.core import database


def admin_lvl_to_access(lvl: int) -> int:
    if lvl < 4:
        raise HTTPException(status_code=400, detail="Wrong admin level!")
    if 4 <= lvl <= 5:
        return 1
    return 2


def generate_password(length=12) -> str:
    characters = string.ascii_letters + string.digits
    password = ''.join(random.choice(characters) for i in range(length))
    return password


async def create_user_by_jwt(jwt_token: str):
    try:
        payload = jwt.decode(jwt_token, settings.JWT_SECRET,
                             algorithms=[settings.JWT_ALGORITHM])
    except jwt.DecodeError:
        raise HTTPException(
            status_code=400, detail='Error while JWT decoding.')
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail='Token has expired.')

    username = payload.get('username')
    admin_level = payload.get('admin_level')

    password = generate_password()
    hashed_password = hash_password(password)
    access = admin_lvl_to_access(admin_level)

    query = users.insert().values(
        username=username,
        password=hashed_password,
        access=access
    )
    try:
        await database.execute(query)
    except UniqueViolationError:
        raise HTTPException(
            status_code=400, detail='Such a user is already registered.')
    return password


async def auth_user(username: str, password: str) -> str:
    query = users.select().where(users.columns.username == username)
    user = await database.fetch_one(query)
    if not user:
        raise HTTPException(
            status_code=400, detail="There is no user with this nickname.")

    if not verify_password(plain_password=password, hash_password=user.password):
        raise HTTPException(status_code=400, detail="Wrong password.")

    return create_token({'user_id': user.id})


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt(rounds=10)
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(plain_password: str, hash_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hash_password.encode('utf-8'))


def create_token(data: dict, expires_delta: int = settings.JWT_EXPIRES_SEC):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(seconds=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        payload=to_encode, key=settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/account/login")


async def get_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET,
                             algorithms=[settings.JWT_ALGORITHM])
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail='Error while JWT decoding.')
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail='Token has expired.')
    user_id = payload.get('user_id')
    if not user_id:
        raise HTTPException(
            status_code=401, detail='Could not validate credentials.')
    query = users.select().where(users.columns.id == user_id)
    return await database.fetch_one(query)
