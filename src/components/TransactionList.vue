<template>
  <div class="transaction-list">
    <h3>Ostatnie transakcje</h3>
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Kategoria</th>
          <th>Opis</th>
          <th>Kwota</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="transactions.length === 0">
          <td colspan="5" class="no-transactions">Brak ostatnich transakcji</td>
        </tr>
        <tr v-else v-for="(transaction, index) in transactions" :key="index">
          <td class="date">{{ formatDate(transaction.date) }}</td>
          <td class="category">{{ transaction.categoryName }}</td>
          <td class="description">{{ transaction.description }}</td>
          <td class="amount" :class="getAmountClass(transaction.type)">
            {{ formatAmount(transaction.amount, transaction.type) }}
          </td>
          <td class="actions">
            <button @click="editTransaction(transaction)" class="edit-btn">Edytuj</button>
            <button @click="deleteTransaction(transaction.id)" class="delete-btn">Usuń</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TransactionList",
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}.${month}.${year}`;
    },
    getAmountClass(type) {
      return type === "Income" ? "income" : "expense";
    },
    formatAmount(amount, type) {
      const numericAmount = parseFloat(amount);
      const formatted = numericAmount.toLocaleString("pl-PL", {
        style: "currency",
        currency: "PLN",
      });
      return type === "Expense" ? `-${formatted}` : formatted;
    },
    editTransaction(transaction) {
      this.$router.push({ name: "EditExpense", params: { id: transaction.id } });
}
,
    async deleteTransaction(transactionId) {
  try {
    const confirmDelete = confirm("Czy na pewno chcesz usunąć tę transakcję?");
    if (confirmDelete) {
      await this.$emit("deleteTransaction", transactionId); // Emituj event do rodzica
    }
  } catch (error) {
    console.error("Błąd podczas usuwania transakcji:", error.message);
  }
},
  },
};
</script>

<style scoped>
.transaction-list {
  margin-top: 20px;
}

.transaction-list table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.transaction-list th {
  text-align: left;
  padding: 12px 15px;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
  font-size: 14px;
  font-weight: bold;
}

.transaction-list td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.transaction-list tr:nth-child(even) {
  background-color: #f9f9f9;
}

.transaction-list tr:nth-child(odd) {
  background-color: #fff;
}

.transaction-list .amount.income {
  color: #4caf50;
  font-weight: bold;
}

.transaction-list .amount.expense {
  color: #f44336;
  font-weight: bold;
}

.transaction-list .no-transactions {
  text-align: center;
  font-style: italic;
  color: #888;
  padding: 12px 15px;
}

.actions {
  display: flex;
  gap: 5px;
}

.edit-btn {
  padding: 5px 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #1e88e5;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

@media (max-width: 768px) {
  .transaction-list table {
    font-size: 12px;
  }
  .transaction-list td,
  .transaction-list th {
    padding: 8px 10px;
  }
}
</style>
