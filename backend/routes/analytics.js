router.get("/analytics", async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).sort({
    date: -1,
  });

  res.render("analytics", { expenses });
});
