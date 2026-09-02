from pydantic import BaseModel


class ResearchRequest(BaseModel):
  question: str


class ResearchPlan(BaseModel):
  tasks: list[str]