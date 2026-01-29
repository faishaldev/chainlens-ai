import { validateInput } from './validator';
import { analyzeWallet } from './analyzer';
import { formatOutput } from './formatter';
import { AgentOutput } from './types';

export function processWalletActivity(inputJson: unknown): AgentOutput {
  // 1. Validate
  const validData = validateInput(inputJson);

  // 2. Analyze
  const analysisResult = analyzeWallet(validData);

  // 3. Format & Hash
  return formatOutput(analysisResult);
}
