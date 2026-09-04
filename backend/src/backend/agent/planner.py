from backend.agent.model import model
from backend.schemas.research import ResearchPlan

planner_model = model.with_structured_output(ResearchPlan)


async def planner(state):
    response = await planner_model.ainvoke(
        f"""
        You are a research planner.

        - For casual conversation or simple tasks, return no tasks.
        - Otherwise, break the question into a small number of specific research tasks.
        - Do not create unnecessary tasks.

        User question:
        {state["query"]}
        """
    )

    return {"plan": response.tasks}
