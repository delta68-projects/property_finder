from fastapi.testclient import TestClient

from app.main import app


def test_deal_analysis_endpoint_returns_metrics() -> None:
    client = TestClient(app)

    payload = {
        "purchase_price": 100000,
        "annual_gross_rent": 18000,
        "annual_operating_expenses": 6000,
        "down_payment": 25000,
        "annual_debt_service": 7000,
        "hold_years": 5,
        "sale_price": 120000,
    }

    response = client.post("/api/v1/deal-analysis/analyze", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["noi"] == 12000
    assert data["cap_rate"] == 0.12
    assert data["cash_on_cash_return"] == 0.2
    assert data["dscr"] == 1.7143
    assert data["irr"] == 0.4923
