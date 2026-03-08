from fastapi import APIRouter

from app.contexts.deal_analysis.application.use_cases import AnalyzeDealUseCase
from app.contexts.deal_analysis.domain.models import DealAnalysisInput
from app.contexts.deal_analysis.interfaces.api.schemas import (
    DealAnalysisRequest,
    DealAnalysisResponse,
)


router = APIRouter(prefix="/api/v1/deal-analysis", tags=["deal-analysis"])


@router.post("/analyze", response_model=DealAnalysisResponse)
def analyze(payload: DealAnalysisRequest) -> DealAnalysisResponse:
    use_case = AnalyzeDealUseCase()
    result = use_case.execute(
        DealAnalysisInput(
            purchase_price=payload.purchase_price,
            annual_gross_rent=payload.annual_gross_rent,
            annual_operating_expenses=payload.annual_operating_expenses,
            down_payment=payload.down_payment,
            annual_debt_service=payload.annual_debt_service,
            hold_years=payload.hold_years,
            sale_price=payload.sale_price,
        )
    )

    return DealAnalysisResponse(
        noi=result.noi,
        cap_rate=result.cap_rate,
        cash_on_cash_return=result.cash_on_cash_return,
        irr=result.irr,
        dscr=result.dscr,
    )
