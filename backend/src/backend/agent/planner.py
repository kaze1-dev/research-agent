from backend.agent.model import model
from backend.schemas.research import ResearchPlan

planner_model = model.with_structured_output(ResearchPlan)


async def planner(state):
   response = await planner_model.ainvoke(
      f"""
        You are a research planner.

        Break the user's question into a small number of
        concrete research tasks.

        Each task should investigate one specific aspect
        required to answer the question accurately.

        User question:
        {state["query"]}
        """
   )

   return {
      "plan": response.tasks
   }
