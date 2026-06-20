const Transaction = require("../models/transaction");

// ADD
const addTransaction = async (req, res) => {
  try {
    const data = await Transaction.create({
      ...req.body,
      amount: Number(req.body.amount),
      user: req.user.id,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
};

// ALL
const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// DELETE
const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

// HISTORY
const getHistory = async (req, res) => {
  try {
    const data = await Transaction.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

// SUMMARY
const getSummary = async (req, res) => {
  try {
    const data = await Transaction.find({ user: req.user.id });

    let income = 0;
    let expense = 0;

    data.forEach((t) => {
      const amount = Number(t.amount) || 0;

      if (t.type === "income") income += amount;
      else expense += amount;
    });

    res.json({ income, expense, balance: income - expense });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getHistory,
  getSummary,
};
