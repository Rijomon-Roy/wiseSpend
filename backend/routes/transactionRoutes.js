// backend/routes/transactionRoutes.js

const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getSummary,
} = require("../controllers/transactionController");

// routes
router.post("/", addTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.get("/summary", getSummary);

module.exports = router;
