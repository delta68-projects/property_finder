from dataclasses import dataclass


@dataclass(frozen=True)
class DealAnalysisInput:
    purchase_price: float
    annual_gross_rent: float
    annual_operating_expenses: float
    down_payment: float
    annual_debt_service: float
    hold_years: int
    sale_price: float


@dataclass(frozen=True)
class DealAnalysisResult:
    noi: float
    cap_rate: float
    cash_on_cash_return: float
    irr: float
    dscr: float
