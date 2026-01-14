/*
Fields:

Title

Amount

Type (Income / Expense)

Date
*/
function AddExpense() {
  return (
    <div className="page">
      <h1>Add Expense</h1>

      <form className="form">
        <input type="text" placeholder="Title" />
        <input type="number" placeholder="Amount" />
        <select>
          <option>Expense</option>
          <option>Income</option>
        </select>
        <input type="date" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddExpense;
