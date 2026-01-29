import { ethers } from 'ethers';

const RPC_URL = 'https://eth.llamarpc.com';

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const block = await provider.getBlock('latest', true); // true to include transactions
  
  if (block && block.prefetchedTransactions.length > 0) {
      // ethers v6: block.transactions returns strings (hashes) or TransactionResponses depending on prefetch.
      // prefetchTransaction is safer.
      console.log('Latest Block:', block.number);
      console.log('Transaction Hash:', block.prefetchedTransactions[0].hash);
  } else {
      console.log('No transactions found in latest block');
  }
}

main();
