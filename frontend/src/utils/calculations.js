export const totalExpenses = (transactions) =>
  transactions.reduce((a, t) => a + t.amount, 0);

export const totalIncome = (transactions) =>
  transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

export const getSavings = (income, expenses) => income - expenses;

export const getProgress = (savings, goal) =>
  Math.min((savings / goal) * 100, 100);
