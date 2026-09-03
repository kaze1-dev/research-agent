from fastapi import APIRouter
from sse_starlette.sse import EventSourceResponse

from backend.agent import agent as agent_module

router = APIRouter()


@router.post("/research")
async def research(query: str):

    async def generate():

        async for mode, chunk in agent_module.agent.astream(
            {
                "query": query,
                "plan": [],
                "research": [],
                "answers": "",
            },
            config={
                "configurable": {
                    "thread_id": "test-thread-123",
                }
            },
            stream_mode=["updates", "custom"],
        ):
            print(mode, chunk)  
            if mode == "updates":

                if "planner" in chunk:

                    plan = chunk["planner"]["plan"]

                    yield {
                        "event": "planning",
                        "data": "Planning...",
                    }

                    for task in plan:
                        yield {
                            "event": "plan",
                            "data": task,
                        }

            elif mode == "custom":

                if chunk["type"] == "task_started":

                    yield {
                        "event": "task_started",
                        "data": chunk["task"],
                    }

                elif chunk["type"] == "task_completed":

                    yield {
                        "event": "task_completed",
                        "data": chunk["task"],
                    }

    return EventSourceResponse(generate())