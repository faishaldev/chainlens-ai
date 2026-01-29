import stringify from 'fast-json-stable-stringify';
import crypto from 'crypto';
import { AgentOutput } from './types';

export function formatOutput(analysis: any): AgentOutput {
  // 1. Generate Human Readable Summary
  const { total_gas, average_gas, transaction_count, anomalies } = analysis;
  
  let summary = `Analyzed ${transaction_count} transaction(s). `;
  summary += `Total gas used: ${total_gas} (avg: ${average_gas.toFixed(0)} per tx). `;
  
  if (anomalies.length > 0) {
    summary += `detected ${anomalies.length} anomalie(s).`;
  } else {
    summary += `No anomalies detected.`;
  }

  // 2. Create Object to Hash (Determinism is key here)
  const outputObj = {
    summary,
    analysis
  };

  // 3. Stable Stringify + Hash
  const canonicalString = stringify(outputObj);
  const hash = crypto.createHash('sha256').update(canonicalString).digest('hex');

  return {
    ...outputObj,
    hash
  };
}
