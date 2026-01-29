import { z } from 'zod';
import { WalletActivityInput } from './types';

const TransactionSchema = z.object({
  hash: z.string().startsWith('0x'),
  to: z.string().startsWith('0x'),
  value: z.string().regex(/^\d+(\.\d+)?$/, "Value must be a numeric string"),
  gas_used: z.number().int().nonnegative(),
  timestamp: z.number().int().positive(),
  category: z.enum(['swap', 'transfer', 'contract_call']),
});

export const WalletActivitySchema = z.object({
  wallet_address: z.string().startsWith('0x'),
  chain: z.string().min(1),
  transactions: z.array(TransactionSchema),
});

export function validateInput(input: unknown): WalletActivityInput {
  return WalletActivitySchema.parse(input);
}
