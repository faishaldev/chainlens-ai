export interface Transaction {
  hash: string;
  to: string;
  value: string; // Keeping as string to avoid precision loss, or we can use BigInt later
  gas_used: number;
  timestamp: number;
  category: 'swap' | 'transfer' | 'contract_call';
}

export interface WalletActivityInput {
  wallet_address: string;
  chain: string;
  transactions: Transaction[];
}

export interface AgentOutput {
  summary: string;
  analysis: {
    total_gas: number;
    average_gas: number;
    transaction_count: number;
    category_breakdown: Record<string, number>;
    anomalies: string[];
  };
  hash: string; // Deterministic hash of the analysis
}
