from langchain.agents import create_agent
from backend.agent.model import model
from backend.mcp.client import get_mcp_tools

agent = None

async def initialize_agent():
  global agent
  
  tools = await get_mcp_tools()
  
  agent = create_agent(
    model=model,
    tools=tools,
    system_prompt="""You are a research assistant.
    Answer normal greetings and casual conversation directly without using tools.
    Use the available tools only when the user asks for information that requires research or up-to-date data.
    Never invent facts."""
  )