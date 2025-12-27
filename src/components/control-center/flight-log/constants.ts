export type TimePeriod = "1month" | "6months" | "1year" | "5years" | "alltime";

export const TIME_PERIODS: { value: TimePeriod; label: string; monthsPast: number; monthsFuture: number }[] = [
  { value: "1month", label: "1 Month", monthsPast: 1, monthsFuture: 1 },
  { value: "6months", label: "6 Months", monthsPast: 6, monthsFuture: 6 },
  { value: "1year", label: "1 Year", monthsPast: 12, monthsFuture: 12 },
  { value: "5years", label: "5 Years", monthsPast: 60, monthsFuture: 60 },
  { value: "alltime", label: "All Time", monthsPast: 120, monthsFuture: 120 },
];

export const MONTHLY_CONTRIBUTION = 500;
export const PORTFOLIO_BASE_GROWTH_RATE = 0.01; // 1% base (increases exponentially)
export const SP500_MONTHLY_GROWTH_RATE = 0.005; // 0.5% constant monthly growth

