from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from backend.mcp.client import get_mcp_tools
from backend.agent import agent as agent_module

router = APIRouter()



@router.post("/research")
async def research(query: str):

    async def generate():

        async for chunk in agent_module.agent.astream(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": query,
                    }
                ]
            },
            stream_mode="messages"
        ):

            message_chunk, metadata = chunk

            if message_chunk.content:
                yield message_chunk.content

    return StreamingResponse(
        generate(),
        media_type="text/plain"
    )