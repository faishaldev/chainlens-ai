import { processWalletActivity } from './src/index';
import { fetchTransaction } from './src/chain-source';

async function main() {
  const args = process.argv.slice(2);
  const txHash = args[0];

  if (txHash && txHash.startsWith('0x')) {
    console.log(`Fetching transaction ${txHash} from public RPC...`);
    
    // Fetch real data
    const tx = await fetchTransaction(txHash);
    
    if (!tx) {
      console.error('Failed to fetch transaction. Check the hash or network connection.');
      process.exit(1);
    }

    const payload = {
      wallet_address: tx.to, // For single tx analysis, we focus on the destination or just the tx itself
      chain: 'ethereum',
      transactions: [tx]
    };

    console.log('Running ChainGuard Agent with REAL transaction data...');
    try {
      const result = processWalletActivity(payload);
      console.log('\n--- Agent Output ---');
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error running agent:', error);
    }

  } else {
    // Original Sample Flow
    console.log('No transaction hash provided. Using SAMPLE data.');
    console.log('Usage: npm start <tx_hash>');
    
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
          category: 'transfer' as const
        },
        {
          hash: '0xdef789',
          to: '0xcontract',
          value: '0.0',
          gas_used: 150000,
          timestamp: 1700000500,
          category: 'contract_call' as const
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
  }
}

main();
