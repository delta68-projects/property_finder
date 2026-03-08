from fastapi import FastAPI

from app.bootstrap.settings import get_settings
from app.contexts.deal_analysis.interfaces.api.router import (
    router as deal_analysis_router,
)


settings = get_settings()
app = FastAPI(title=settings.app_name)
app.include_router(deal_analysis_router)


@app.get("/api/v1/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
