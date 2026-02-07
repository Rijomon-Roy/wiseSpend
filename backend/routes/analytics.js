router.get("/analytics", async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id });

  res.render("analytics", { expenses });
});
