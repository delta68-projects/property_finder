from app.contexts.deal_analysis.domain.analyzer import analyze_deal
from app.contexts.deal_analysis.domain.models import (
    DealAnalysisInput,
    DealAnalysisResult,
)


class AnalyzeDealUseCase:
    def execute(self, data: DealAnalysisInput) -> DealAnalysisResult:
        return analyze_deal(data)
