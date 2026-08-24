from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.api.routes.research import router as research_router
from backend.agent.agent import initialize_agent


@asynccontextmanager
async def lifespan(app: FastAPI):
    await initialize_agent()

    yield


app = FastAPI(lifespan=lifespan)

app.include_router(research_router)