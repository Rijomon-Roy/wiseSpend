const Transaction = require("../models/Transaction");

// ADD
const addTransaction = async (req, res) => {
  const data = await Transaction.create({
    ...req.body,
    user: req.user.id,
  });

  res.json(data);
};

// ALL
const getTransactions = async (req, res) => {
  const data = await Transaction.find({ user: req.user.id });
  res.json(data);
};

// DELETE
const deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

// HISTORY
const getHistory = async (req, res) => {
  const data = await Transaction.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(data);
};

// SUMMARY
const getSummary = async (req, res) => {
  const data = await Transaction.find({ user: req.user.id });

  let income = 0;
  let expense = 0;

  data.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  res.json({ income, expense, balance: income - expense });
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getHistory,
  getSummary,
};
