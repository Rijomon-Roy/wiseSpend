export function analyzeTransactions(transactions) {
  let total = 0;
  const categoryMap = {};

  transactions.forEach((t) => {
    total += t.amount;

    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
    }

    categoryMap[t.category] += t.amount;
  });

  return {
    total,
    categoryMap,
  };
}
