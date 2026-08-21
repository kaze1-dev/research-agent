from fastapi import APIRouter
from backend.schemas.research import ResearchRequest

router = APIRouter(prefix="/research", tags=["Research"])

@router.post("")
async def research(request: ResearchRequest):
  """"""