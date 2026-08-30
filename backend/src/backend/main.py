from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

from backend.api.routes.research import router as research_router
from backend.agent.agent import initialize_agent


@asynccontextmanager
async def lifespan(app: FastAPI):
    await initialize_agent()

    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(research_router)