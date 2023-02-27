from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from src.account.services import auth_user, create_user_by_jwt, get_user
from src.account.schemas import User


router = APIRouter(
    prefix='/api/account',
    tags=['Account']
)


@router.post('/register')
async def register_user_by_JWT(jwt_token: str):
    password = await create_user_by_jwt(jwt_token)
    return {"msg": "Account successfully registered.", "password": password}


@router.post('/login')
async def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    access_token = await auth_user(form_data.username, form_data.password)
    return {"access_token": access_token, "token_type": "bearer"}


@router.get('/')
async def me(user: User = Depends(get_user)):
    return {'username': user.username, 'access': user.access}
