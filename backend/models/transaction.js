const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    amount: Number,
    type: String,
    category: String,
    date: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionSchema);
