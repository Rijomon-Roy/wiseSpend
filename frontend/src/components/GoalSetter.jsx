function GoalSetter({ goal, setGoal }) {
  const handleChange = (e) => {
    const value = e.target.value;

    // remove leading zeros + convert to number
    const cleanNumber = Number(value);

    setGoal(cleanNumber);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="font-medium">Monthly Goal ₹</label>

      <input
        type="number"
        value={goal === 0 ? "" : goal} // ⭐ important trick
        onChange={handleChange}
        placeholder="Enter goal"
        className="border rounded px-3 py-2 w-32"
      />
    </div>
  );
}

export default GoalSetter;
