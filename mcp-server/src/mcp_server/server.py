from mcp.server import MCPServer

from mcp_server.tools.search import search_web


mcp = MCPServer("research-agent")


@mcp.tool()
async def search(query: str) -> str:
    """Search the web for information."""
    return await search_web(query)