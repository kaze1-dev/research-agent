from langgraph.graph import StateGraph, START, END

from backend.agent.state import ResearchState
from backend.agent.planner import planner
from backend.agent.researcher import researcher
from backend.agent.synthesizer import synthesizer


agent = None


async def initialize_agent():
    global agent

    graph = StateGraph(ResearchState)

    graph.add_node("planner", planner)
    graph.add_node("researcher", researcher)
    graph.add_node("synthesizer", synthesizer)

    graph.add_edge(START, "planner")
    graph.add_edge("planner", "researcher")
    graph.add_edge("researcher", "synthesizer")
    graph.add_edge("synthesizer", END)

    agent = graph.compile()