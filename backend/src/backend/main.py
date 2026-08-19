from fastapi import FastAPI
from backend.api.routes.research import router as research_router
from backend.agent.agent import agent

app = FastAPI(title="Research Agent")

@app.get("/test")
async def test_model():
  response = await agent.ainvoke({
        "messages": [
            {
                "role": "user",
                "content": "Explain what is AI Agent in one line"
            }
        ]
    })
  return {"response": response["messages"][-1].content}

app.include_router(research_router)