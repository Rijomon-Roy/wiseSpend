import { deleteTransaction } from "../api/transactionApi";

export default function TransactionList({ transactions, refresh }) {
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    refresh();
  };

  return (
    <div>
      {transactions.map((t) => (
        <div key={t._id}>
          {t.title} | ₹{t.amount} | {t.type}
          <button onClick={() => handleDelete(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
