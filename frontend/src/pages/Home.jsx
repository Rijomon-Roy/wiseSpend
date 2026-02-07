import Summary from "../components/Summary";
import ExpenseChart from "../components/ExpenseChart";
import GoalSetter from "../components/GoalSetter";
import AdviceBox from "../components/AdviceBox";

function Home() {
  const income = 20000;
  const expenses = 12000;
  const goal = Number(localStorage.getItem("goal")) || 5000;

  const savings = income - expenses;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <GoalSetter />

      <Summary
        income={income}
        expenses={expenses}
        savings={savings}
        goal={goal}
      />

      <ExpenseChart income={income} expense={expenses} />

      <AdviceBox savings={savings} goal={goal} />
    </div>
  );
}

export default Home;
