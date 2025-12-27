/**
 * Formats a currency value with appropriate units (k, M)
 * If value >= 1,000,000 (1M), displays as 1.0M
 * If value >= 1,000, displays as 1.5k
 * Otherwise displays the full number
 */
export function formatCurrency(value: number, decimals: number = 1): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue >= 1000000) {
    // 1M and above
    return `${sign}$${(absValue / 1000000).toFixed(decimals)}M`;
  } else if (absValue >= 1000) {
    // 1k to 999k
    return `${sign}$${(absValue / 1000).toFixed(decimals)}k`;
  } else {
    // Less than 1k - show with 2 decimal places
    return `${sign}$${absValue.toFixed(2)}`;
  }
}

/**
 * Formats a currency value for display in tables (no decimals for k/M, 2 decimals for small values)
 */
export function formatCurrencyTable(value: number): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue >= 1000000) {
    return `${sign}$${(absValue / 1000000).toFixed(1)}M`;
  } else if (absValue >= 1000) {
    return `${sign}$${(absValue / 1000).toFixed(0)}k`;
  } else {
    return `${sign}$${absValue.toFixed(2)}`;
  }
}

/**
 * Formats a currency value for chart tooltips and axes
 */
export function formatCurrencyChart(value: number): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (absValue >= 1000000) {
    return `${sign}$${(absValue / 1000000).toFixed(1)}M`;
  } else if (absValue >= 1000) {
    return `${sign}$${(absValue / 1000).toFixed(0)}k`;
  } else {
    return `${sign}$${absValue.toFixed(0)}`;
  }
}

