from langchain.agents import create_agent
from backend.agent.model import model

agent = create_agent(
  model=model,
)