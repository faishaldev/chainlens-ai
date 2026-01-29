import { ethers } from 'ethers';
import { Transaction } from './types';

// Public RPC URL (Cloudflare for stability)
const RPC_URL = 'https://eth.llamarpc.com';

export async function fetchTransaction(txHash: string): Promise<Transaction | null> {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    
    // Fetch transaction and receipt in parallel
    const [tx, receipt] = await Promise.all([
      provider.getTransaction(txHash),
      provider.getTransactionReceipt(txHash)
    ]);

    if (!tx || !receipt) {
      console.error('Transaction or receipt not found');
      return null;
    }

    // Determine category (Naive)
    let category: 'transfer' | 'contract_call' | 'swap' = 'transfer';
    if (tx.data !== '0x') {
        category = 'contract_call';
        // Very basic swap detection (Method ID for Uniswap swap)
        if (tx.data.startsWith('0x38ed1739') || tx.data.startsWith('0x18cbafe5')) {
             category = 'swap';
        }
    }

    const block = await provider.getBlock(tx.blockHash!);
    const timestamp = block ? block.timestamp : Math.floor(Date.now() / 1000);

    return {
      hash: tx.hash as `0x${string}`,
      to: (tx.to || ethers.ZeroAddress) as `0x${string}`,
      value: ethers.formatEther(tx.value),
      gas_used: Number(receipt.gasUsed),
      timestamp: timestamp,
      category: category
    };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return null;
  }
}

// Helper to fix timestamp issue carefully
async function getBlockTimestamp(provider: ethers.JsonRpcProvider, blockNumber: number): Promise<number> {
    const block = await provider.getBlock(blockNumber);
    return block ? block.timestamp : Math.floor(Date.now() / 1000);
}
