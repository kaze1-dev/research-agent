from fastapi import APIRouter

from backend.mcp.client import get_mcp_tools
from backend.agent import agent as agent_module

router = APIRouter()

@router.post("/research")
async def research(query: str):
  result = await agent_module.agent.ainvoke(
    {
      "messages": [
        {
          "role": "user",
          "content": query,
        }
      ]
    }
  ) 
  
  return result