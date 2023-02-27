from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.db.core import database, engine
from src.account.router import router as auth_router
from src.sounds.router import router as music_router
from src.account.models import metadata as account_metadata
from src.sounds.models import metadata as music_metadata


account_metadata.create_all(bind=engine)
music_metadata.create_all(bind=engine)


app = FastAPI(
    title='TicTacToeAPI',
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(music_router)
