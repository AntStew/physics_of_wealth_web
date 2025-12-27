import { Transaction } from "../utils/transactionGenerator";
import { formatCurrencyTable } from "@/lib/formatCurrency";

interface TransactionLogProps {
  transactions: Transaction[];
}

export function TransactionLog({ transactions }: TransactionLogProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "BUY":
        return "text-green-400";
      case "SELL":
        return "text-red-400";
      case "DIVIDEND":
        return "text-blue-400";
      default:
        return "text-purple-400";
    }
  };

  return (
    <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
      <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">Transaction Log</div>
      <div className="overflow-x-auto overflow-y-auto max-h-[400px] scrollbar-cyan">
          <table className="w-full">
            <thead className="sticky top-0 bg-black/80 backdrop-blur-sm z-10 border-b border-cyan-500/20">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-cyan-300/70 uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left text-xs text-cyan-300/70 uppercase tracking-wide">Type</th>
                <th className="px-4 py-3 text-left text-xs text-cyan-300/70 uppercase tracking-wide">Ticker</th>
                <th className="px-4 py-3 text-right text-xs text-cyan-300/70 uppercase tracking-wide">Shares</th>
                <th className="px-4 py-3 text-right text-xs text-cyan-300/70 uppercase tracking-wide">Price</th>
                <th className="px-4 py-3 text-right text-xs text-cyan-300/70 uppercase tracking-wide">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                const date = new Date(transaction.date);
                const typeColor = getTypeColor(transaction.type);
                
                return (
                  <tr
                    key={index}
                    className={`border-b border-cyan-500/10 ${
                      index % 2 === 1 ? "bg-black/20" : "bg-transparent"
                    } hover:bg-cyan-500/5 transition-colors`}
                  >
                    <td className="px-4 py-3 text-cyan-300/80 font-mono text-sm">
                      {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className={`px-4 py-3 font-mono text-sm font-bold ${typeColor}`}>
                      {transaction.type}
                    </td>
                    <td className="px-4 py-3 text-cyan-400 font-mono text-sm font-bold">
                      {transaction.ticker}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono text-sm text-right">
                      {transaction.shares !== null ? transaction.shares.toFixed(3) : "—"}
                    </td>
                    <td className="px-4 py-3 text-cyan-300/80 font-mono text-sm text-right">
                      {transaction.price !== null ? formatCurrencyTable(transaction.price) : "—"}
                    </td>
                    <td className={`px-4 py-3 font-mono text-sm text-right font-bold ${
                      transaction.type === "BUY" ? "text-red-400" : "text-green-400"
                    }`}>
                      {transaction.type === "BUY" ? "-" : "+"}{formatCurrencyTable(transaction.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
  );
}

