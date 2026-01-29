# agents.md
## Agent: Web3 Wallet Intelligence Agent (MVP)

---

## 1. Agent Purpose

The Web3 Wallet Intelligence Agent analyzes a user’s on-chain wallet activity and converts raw blockchain transaction data into clear, human-readable insights, while producing a deterministic output that can be hashed and verified on-chain.

The agent operates fully off-chain and does not perform financial advice.

---

## 2. Problem Context

Blockchain transaction data is:
- Noisy
- Highly technical
- Difficult for non-expert users to interpret

Users struggle to understand:
- Gas spending behavior
- Protocol interaction patterns
- Whether activity is unusual or risky

---

## 3. Agent Responsibilities

The agent is responsible for:
- Interpreting normalized on-chain transaction data
- Detecting simple behavioral patterns
- Flagging potential anomalies using explainable heuristics
- Generating concise natural-language summaries
- Producing stable, hashable output text

---

## 4. Input Specification

### Input Payload
```json
{
  "wallet_address": "0x...",
  "chain": "polygon",
  "transactions": [
    {
      "hash": "0x...",
      "to": "0x...",
      "value": "0.25",
      "gas_used": 21000,
      "timestamp": 1700000000,
      "category": "swap | transfer | contract_call"
    }
  ]
}
