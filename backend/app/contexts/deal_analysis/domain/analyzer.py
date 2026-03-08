from app.contexts.deal_analysis.domain.models import (
    DealAnalysisInput,
    DealAnalysisResult,
)


def _npv(rate: float, cashflows: list[float]) -> float:
    total = 0.0
    for period, cashflow in enumerate(cashflows):
        total += cashflow / ((1 + rate) ** period)
    return total


def _compute_irr(cashflows: list[float]) -> float:
    low = -0.9
    high = 10.0
    for _ in range(150):
        mid = (low + high) / 2
        if _npv(mid, cashflows) > 0:
            low = mid
        else:
            high = mid
    return round((low + high) / 2, 4)


def analyze_deal(data: DealAnalysisInput) -> DealAnalysisResult:
    noi = data.annual_gross_rent - data.annual_operating_expenses
    cap_rate = round(noi / data.purchase_price, 4)
    annual_cash_flow = noi - data.annual_debt_service
    cash_on_cash_return = round(annual_cash_flow / data.down_payment, 4)
    dscr = round(noi / data.annual_debt_service, 4)

    cashflows = [-data.down_payment]
    cashflows.extend([annual_cash_flow for _ in range(data.hold_years)])
    cashflows[-1] += data.sale_price
    irr = _compute_irr(cashflows)

    return DealAnalysisResult(
        noi=round(noi, 4),
        cap_rate=cap_rate,
        cash_on_cash_return=cash_on_cash_return,
        irr=irr,
        dscr=dscr,
    )
