import { processWalletActivity } from './src/index';

const samplePayload = {
  wallet_address: '0x1234567890abcdef1234567890abcdef12345678',
  chain: 'ethereum',
  transactions: [
    {
      hash: '0xabc123',
      to: '0xdef456',
      value: '1.5',
      gas_used: 21000,
      timestamp: 1700000000,
      category: 'transfer'
    },
    {
      hash: '0xdef789',
      to: '0xcontract',
      value: '0.0',
      gas_used: 150000,
      timestamp: 1700000500,
      category: 'contract_call'
    }
  ]
};

console.log('Running ChainGuard Agent with sample payload...');
try {
  const result = processWalletActivity(samplePayload);
  console.log('\n--- Agent Output ---');
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Error running agent:', error);
}
