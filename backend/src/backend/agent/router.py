from backend.agent.model import model


async def router(state):
    response = await model.ainvoke(
        f"""
        Decide whether the user's message requires web research.

        Respond with ONLY:
        true
        or
        false

        Return true if the user needs current information,
        factual research, or information that requires searching the web.

        Return false for casual conversation or simple conversation.

        User message:
        {state["query"]}
        """
    )

    decision = response.content.strip().lower()

    return {
        "needs_research": decision == "true"
    }