const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getHistory,
  getSummary,
} = require("../controllers/transactionController");

// protect ALL routes
router.use(auth);

router.post("/", addTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.get("/history", getHistory);
router.get("/summary", getSummary);

module.exports = router;
