import { ETFEngine } from "@/lib/types";
import { TimePeriod } from "../constants";

export interface Transaction {
  date: string;
  type: string;
  ticker: string;
  shares: number | null;
  price: number | null;
  amount: number;
}

export function generateFakeTransactions(
  engines: ETFEngine[],
  monthsPast: number
): Transaction[] {
  const transactions: Transaction[] = [];
  const transactionTypes = ["BUY", "SELL", "DIVIDEND", "REINVEST"];
  const tickers = engines.length > 0 
    ? engines.map(e => e.ticker).slice(0, 10)
    : ["SPY", "VTI", "QQQ", "DIA", "IWM"];
  
  const now = new Date();
  for (let i = 0; i < 20; i++) {
    const daysAgo = Math.floor(Math.random() * monthsPast * 30);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)] || "BUY";
    const tickerIndex = Math.floor(Math.random() * tickers.length);
    const ticker = tickers[tickerIndex] || "SPY";
    
    let shares: number | null = null;
    let price: number | null = null;
    let amount: number;
    
    if (type === "DIVIDEND") {
      amount = parseFloat((Math.random() * 500 + 50).toFixed(2));
    } else {
      shares = parseFloat((Math.random() * 100 + 10).toFixed(3));
      price = parseFloat((Math.random() * 200 + 20).toFixed(2));
      amount = parseFloat((shares * price).toFixed(2));
    }
    
    transactions.push({
      date: date.toISOString().split("T")[0],
      type,
      ticker,
      shares,
      price,
      amount,
    });
  }
  
  // Sort by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

