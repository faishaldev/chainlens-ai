import { WalletActivityInput, Transaction } from './types';

// Simple thresholds for anomalies
const HIGH_GAS_THRESHOLD = 50000; // Arbitrary high gas unit limit for demo
const HIGH_VALUE_THRESHOLD = 1.0; // In native currency (e.g., ETH)

export function analyzeWallet(input: WalletActivityInput) {
  const { transactions } = input;
  
  if (transactions.length === 0) {
    return {
      total_gas: 0,
      average_gas: 0,
      transaction_count: 0,
      category_breakdown: {},
      anomalies: [],
    };
  }

  let totalGas = 0;
  const categoryBreakdown: Record<string, number> = {};
  const anomalies: string[] = [];

  transactions.forEach((tx) => {
    // Gas Stats
    totalGas += tx.gas_used;

    // Category Breakdown
    categoryBreakdown[tx.category] = (categoryBreakdown[tx.category] || 0) + 1;

    // Anomalies
    if (tx.gas_used > HIGH_GAS_THRESHOLD) {
      anomalies.push(`High gas used: ${tx.gas_used} in tx ${tx.hash}`);
    }
    
    // Naïve value check (assuming value is float-parsable)
    const val = parseFloat(tx.value);
    if (!isNaN(val) && val > HIGH_VALUE_THRESHOLD) {
      anomalies.push(`High value transfer: ${tx.value} in tx ${tx.hash}`);
    }
  });

  return {
    total_gas: totalGas,
    average_gas: totalGas / transactions.length,
    transaction_count: transactions.length,
    category_breakdown: categoryBreakdown,
    anomalies,
  };
}
