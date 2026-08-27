from tavily import TavilyClient

from mcp_server.config import TAVILY_API_KEY


tavily = TavilyClient(api_key=TAVILY_API_KEY)


async def search_web(query: str) -> str:
    """Search the web using Tavily."""
    response = tavily.search(query=query)

    return str(response)