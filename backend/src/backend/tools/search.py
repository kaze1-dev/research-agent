from langchain_core.tools import tool
from tavily import TavilyClient

from backend.core.config import TAVILY_API_KEY

@tool
def search_web(query: str) -> str:
  """Search web for up-to-date information"""