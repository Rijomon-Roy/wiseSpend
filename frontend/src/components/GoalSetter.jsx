function GoalSetter({ goal, setGoal }) {
  return (
    <div className="flex items-center gap-3">
      <label className="font-medium">Monthly Goal ₹</label>

      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(Number(e.target.value))}
        className="border rounded px-3 py-2 w-32"
      />
    </div>
  );
}

export default GoalSetter;
