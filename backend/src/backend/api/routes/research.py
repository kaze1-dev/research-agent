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
                "answer": "",
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

                elif "synthesizer" in chunk:

                    answer = chunk["synthesizer"]["answer"]

                    yield {
                        "event": "synthesis_started",
                        "data": "Synthesizing...",
                    }

                    yield {
                        "event": "final_answer",
                        "data": answer,
                    }

                elif "casual" in chunk:
                    answer = chunk["casual"]["answer"]

                    yield {
                        "event": "final_answer",
                        "data": answer,
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