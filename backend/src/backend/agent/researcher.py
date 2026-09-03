from langgraph.config import get_stream_writer

from backend.mcp.client import get_mcp_tools
from backend.agent.state import ResearchState


async def researcher(state: ResearchState):
    writer = get_stream_writer()

    tools = await get_mcp_tools()

    search_tool = next(
        tool for tool in tools
        if tool.name == "search"
    )

    research = []

    for task in state["plan"]:

        writer({
            "type": "task_started",
            "task": task,
        })

        result = await search_tool.ainvoke({
            "query": task
        })

        research.append(result)

        writer({
            "type": "task_completed",
            "task": task,
        })

    return {
        "research": research
    }