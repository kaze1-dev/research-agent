from langchain_ollama import ChatOllama
from backend.core.config import OLLAMA_MODEL

model = ChatOllama(
  model=OLLAMA_MODEL
)