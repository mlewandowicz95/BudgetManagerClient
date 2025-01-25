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
        </tr>
      </thead>
      <tbody>
        <tr v-if="transactions.length === 0">
          <td colspan="4" class="no-transactions">Brak ostatnich transakcji</td>
        </tr>
        <tr 
          v-else 
          v-for="(transaction, index) in transactions" 
          :key="index"
        >
          <td class="date">{{ formatDate(transaction.date) }}</td>
          <td class="category">{{ transaction.categoryName }}</td>
          <td class="description">{{ transaction.description }}</td>
          <td 
            class="amount" 
            :class="getAmountClass(transaction.type)"
          >
            {{ formatAmount(transaction.amount, transaction.type) }}
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
