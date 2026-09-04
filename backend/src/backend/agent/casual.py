from backend.agent.model import model


async def casual(state):
    response = await model.ainvoke(
        f"""
        Respond naturally to the user's message.

        User:
        {state["query"]}
        """
    )

    return {
        "answer": response.content
    } 