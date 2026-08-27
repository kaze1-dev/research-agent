from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    TAVILY_API_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env"
    )


settings = Settings()

TAVILY_API_KEY = settings.TAVILY_API_KEY