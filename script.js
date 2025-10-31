let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const expenseTable = document.getElementById("expenseTable");
const totalEl = document.getElementById("total");
const addBtn = document.getElementById("addBtn");
const clearAll = document.getElementById("clearAll");

function renderExpenses() {
  expenseTable.innerHTML = "";
  let total = 0;

  expenses.forEach((exp, index) => {
    total += exp.amount;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>₹${exp.amount}</td>
      <td>${exp.desc}</td>
      <td>${exp.category}</td>
      <td>${exp.date}</td>
      <td><button onclick="deleteExpense(${index})">Delete</button></td>
    `;
    expenseTable.appendChild(row);
  });

  totalEl.textContent = total;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

addBtn.addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const desc = document.getElementById("desc").value.trim();
  const category = document.getElementById("category").value;
  const date = new Date().toLocaleDateString();

  if (!amount || !desc) {
    alert("Please enter all fields!");
    return;
  }

  expenses.push({ amount, desc, category, date });
  renderExpenses();

  document.getElementById("amount").value = "";
  document.getElementById("desc").value = "";
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

clearAll.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all expenses?")) {
    expenses = [];
    renderExpenses();
  }
});

renderExpenses();

