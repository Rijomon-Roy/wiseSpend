import { getAIAdvice } from "./utils/ai.js";
import { analyzeTransactions } from "./utils/analyze.js";

async function test() {
  const transactions = [
    { amount: 500, category: "Food" },
    { amount: 2000, category: "Shopping" },
    { amount: 300, category: "Food" },
    { amount: 1500, category: "Entertainment" },
  ];

  const summary = analyzeTransactions(transactions);

  const prompt = `
You are a smart financial assistant.

User spending:
Total: ₹${summary.total}
Categories: ${JSON.stringify(summary.categoryMap)}

Give response in this format:

1. Overspending category
2. Why it's high
3. 2-3 simple tips to reduce spending

Keep it short and easy to understand.
`;

  const res = await getAIAdvice(prompt);
  console.log(res);
}

test();
