from typing import TypedDict


class ResearchState(TypedDict):
    query: str
    needs_research: bool
    plan: list[str]
    research: list[str]
    answer: str