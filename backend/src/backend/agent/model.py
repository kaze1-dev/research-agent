from langchain_openai import ChatOpenAI
from backend.core.config import OPENROUTER_API_KEY, OPENROUTER_MODEL

model = ChatOpenAI(
    model=OPENROUTER_MODEL,
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
)