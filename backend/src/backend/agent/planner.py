from backend.agent.model import model
from backend.schemas.research import ResearchPlan

planner_model = model.with_structured_output(ResearchPlan)

async def planner(state):
    response = await planner_model.ainvoke(
        f"""
You are a research planner.

Break the user's question into a small number of specific,
independent research tasks.

Each task should be something that can be answered by searching
the web.

Avoid unnecessary or redundant tasks.

User question:
{state["query"]}
"""
    )

    return {"plan": response.tasks}
