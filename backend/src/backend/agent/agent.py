from langgraph.graph import StateGraph, START, END

from backend.agent.state import ResearchState
from backend.agent.router import router
from backend.agent.planner import planner
from backend.agent.researcher import researcher
from backend.agent.synthesizer import synthesizer
from backend.agent.casual import casual


agent = None


def route_after_router(state: ResearchState):
    if state["needs_research"]:
        return "planner"

    return "casual"


async def initialize_agent():
    global agent

    graph = StateGraph(ResearchState)

    graph.add_node("router", router)
    graph.add_node("planner", planner)
    graph.add_node("researcher", researcher)
    graph.add_node("synthesizer", synthesizer)
    graph.add_node("casual", casual)

    graph.add_edge(START, "router")

    graph.add_conditional_edges(
        "router",
        route_after_router,
    )

    graph.add_edge("planner", "researcher")
    graph.add_edge("researcher", "synthesizer")

    graph.add_edge("synthesizer", END)
    graph.add_edge("casual", END)

    agent = graph.compile()