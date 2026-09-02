from typing import TypedDict


class ResearchState(TypedDict):
   query: str
   plan: list[str]
   research: list[str]
   answers: str