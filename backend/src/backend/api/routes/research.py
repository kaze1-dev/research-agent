from fastapi import APIRouter
from sse_starlette.sse import EventSourceResponse

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
            stream_mode="messages",
        ):
            message_chunk, metadata = chunk

            if message_chunk.content:
                yield {
                    "event": "message",
                    "data": message_chunk.content,
                }

    return EventSourceResponse(generate())