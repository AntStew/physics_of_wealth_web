import { useMemo } from "react";
import { ETFEngine } from "@/lib/types";
import { generatePortfolioValueTimeline } from "@/lib/calculations";
import { calculatePortfolioData } from "@/lib/dataTransform";
import { TimePeriod, TIME_PERIODS, MONTHLY_CONTRIBUTION, PORTFOLIO_BASE_GROWTH_RATE, SP500_MONTHLY_GROWTH_RATE } from "../constants";

export function useFlightLogCalculations(engines: ETFEngine[], timePeriod: TimePeriod) {
  const portfolio = useMemo(() => calculatePortfolioData(engines), [engines]);
  const selectedPeriod = TIME_PERIODS.find(p => p.value === timePeriod) || TIME_PERIODS[2];
  
  // Generate timeline
  const timeline = useMemo(
    () => generatePortfolioValueTimeline(engines, selectedPeriod.monthsPast, selectedPeriod.monthsFuture),
    [engines, selectedPeriod.monthsPast, selectedPeriod.monthsFuture]
  );
  
  const currentIndex = selectedPeriod.monthsPast;
  
  // Calculate metrics
  const metrics = useMemo(() => {
    const totalInvested = selectedPeriod.monthsPast * MONTHLY_CONTRIBUTION;
    
    // Calculate growth percentages
    const portfolioGrowthPercent = PORTFOLIO_BASE_GROWTH_RATE * Math.exp(selectedPeriod.monthsPast / 12);
    const sp500GrowthPercent = SP500_MONTHLY_GROWTH_RATE * selectedPeriod.monthsPast;
    
    // Calculate current values: money invested * (1 + growth %)
    const currentValue = totalInvested * (1 + portfolioGrowthPercent);
    const currentSp500Value = totalInvested * (1 + sp500GrowthPercent);
    
    // Start values (at month 0)
    const startInvested = MONTHLY_CONTRIBUTION;
    const startValue = startInvested;
    const startSp500Value = startInvested;
    
    // Total money gained
    const totalGained = currentValue - totalInvested;
    const totalGainedPercent = totalInvested > 0 ? (totalGained / totalInvested) * 100 : 0;
    
    // Growth values (include invested + growth)
    const portfolioGrowth = currentValue;
    const portfolioGrowthPercentDisplay = selectedPeriod.monthsPast > 0 
      ? (portfolioGrowthPercent * 100) 
      : 0;
    
    const sp500Growth = currentSp500Value;
    const sp500GrowthPercentDisplay = selectedPeriod.monthsPast > 0
      ? (sp500GrowthPercent * 100)
      : 0;
    
    return {
      totalInvested,
      totalGained,
      totalGainedPercent,
      portfolioGrowth,
      portfolioGrowthPercentDisplay,
      sp500Growth,
      sp500GrowthPercentDisplay,
    };
  }, [selectedPeriod.monthsPast]);
  
  // Calculate chart data
  const chartData = useMemo(() => {
    const pastData = timeline.filter((_, index) => index <= currentIndex);
    const filteredData = pastData.length > 2 ? pastData.slice(0, -1) : pastData;
    
    return filteredData.map((entry, index) => {
      const date = new Date(entry.date);
      const monthsFromStart = index + 1;
      const moneyInvested = MONTHLY_CONTRIBUTION * monthsFromStart;
      
      const portfolioGrowthPercent = PORTFOLIO_BASE_GROWTH_RATE * Math.exp(monthsFromStart / 12);
      const sp500GrowthPercent = SP500_MONTHLY_GROWTH_RATE * monthsFromStart;
      
      const portfolioValue = moneyInvested * (1 + portfolioGrowthPercent);
      const sp500Value = moneyInvested * (1 + sp500GrowthPercent);
      
      return {
        date: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        "Portfolio Value": Math.round(portfolioValue * 100) / 100,
        "S&P 500 Value": Math.round(sp500Value * 100) / 100,
        "Money Invested": moneyInvested,
      };
    });
  }, [timeline, currentIndex]);
  
  return {
    portfolio,
    selectedPeriod,
    metrics,
    chartData,
  };
}

