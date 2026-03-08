from pydantic import BaseModel, Field


class DealAnalysisRequest(BaseModel):
    purchase_price: float = Field(gt=0)
    annual_gross_rent: float = Field(ge=0)
    annual_operating_expenses: float = Field(ge=0)
    down_payment: float = Field(gt=0)
    annual_debt_service: float = Field(gt=0)
    hold_years: int = Field(ge=1, le=50)
    sale_price: float = Field(gt=0)


class DealAnalysisResponse(BaseModel):
    noi: float
    cap_rate: float
    cash_on_cash_return: float
    irr: float
    dscr: float
