from fastapi import FastAPI
from backend.api.routes.research import router as research_router
from backend.agent.model import model

app = FastAPI(title="Research Agent")

@app.get("/test")
async def test_model():
  response = await model.ainvoke("Explain what is an AI agent in one line")
  return {"response": response.content}

app.include_router(research_router)