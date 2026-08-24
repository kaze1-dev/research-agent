from langchain_mcp_adapters.client import MultiServerMCPClient


mcp_client = MultiServerMCPClient(
  {
    "research": {
      "transport": "streamable_http",
        "url": "http://127.0.0.1:8001/mcp",
    }
  }
)

async def get_mcp_tools():
  return await mcp_client.get_tools()