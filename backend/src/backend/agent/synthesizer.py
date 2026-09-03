from backend.agent.model import model
from backend.agent.state import ResearchState


async def synthesizer(state: ResearchState):

    response = await model.ainvoke(
        f"""
You are a research synthesizer.

Answer the user's question using the research collected
by the research agent.

User question:
{state["query"]}

Research:
{state["research"]}

Requirements:
- Use the research as your source of truth.
- Do not invent facts.
- Clearly explain the answer.
- If the research does not contain enough information,
  say so instead of guessing.
"""
    )

    return {
        "answer": response.content
    }