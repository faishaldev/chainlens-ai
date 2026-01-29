import { describe, it, expect } from 'vitest';
import { processWalletActivity } from '../src/index';

describe('Web3 Wallet Intelligence Agent', () => {
  const validPayload = {
    wallet_address: '0x123',
    chain: 'ethereum',
    transactions: [
      {
        hash: '0xabc',
        to: '0xdef',
        value: '0.5',
        gas_used: 21000,
        timestamp: 1700000000,
        category: 'transfer' as const // Fix strict literal type issue
      }
    ]
  };

  it('should validate and analyze a correct payload', () => {
    const result = processWalletActivity(validPayload);
    expect(result).toHaveProperty('summary');
    expect(result).toHaveProperty('hash');
    expect(result.analysis.transaction_count).toBe(1);
    expect(result.analysis.total_gas).toBe(21000);
  });

  it('should detect anomalies for high gas', () => {
    const highGasPayload = {
      ...validPayload,
      transactions: [
        {
          ...validPayload.transactions[0],
          gas_used: 100000 // > 50000 threshold
        }
      ]
    };
    const result = processWalletActivity(highGasPayload);
    expect(result.analysis.anomalies.length).toBeGreaterThan(0);
    expect(result.summary).toContain('detected 1 anomalie');
  });

  it('should throw error on invalid input', () => {
    const invalidPayload = { ...validPayload, chain: 123 }; // Invalid chain type
    expect(() => processWalletActivity(invalidPayload)).toThrow();
  });

  it('should produce deterministic output hash', () => {
    const result1 = processWalletActivity(validPayload);
    const result2 = processWalletActivity(validPayload);
    expect(result1.hash).toBe(result2.hash);
  });
});
