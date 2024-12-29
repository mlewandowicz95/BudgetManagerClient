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
        <tr 
          v-for="(transaction, index) in transactions" 
          :key="index" 
        >
          <td class="date">{{ transaction.formattedDate }}</td>
          <td class="category">{{ transaction.categoryName }}</td>
          <td class="description">{{ transaction.description }}</td>
          <td 
            class="amount" 
            :class="{'income': isPositive(transaction.amount), 'expense': isNegative(transaction.amount)}"
          >
            {{ formatAmount(transaction.amount) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script>
export default {
  name: 'TransactionList',
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // Sprawdza, czy kwota jest dodatnia
    isPositive(amount) {
      return parseFloat(amount) > 0;
    },
    // Sprawdza, czy kwota jest ujemna
    isNegative(amount) {
      return parseFloat(amount) < 0;
    },
    // Formatuje kwotę bez znaku "+" przy dodatnich wartościach
    formatAmount(amount) {
      const numericAmount = parseFloat(amount);
      const formatted = numericAmount.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
      });
      return numericAmount > 0 ? formatted.replace('+', '') : formatted;
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
  background-color: #f4f4f4; /* Jasny szary dla nagłówków */
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
  background-color: #f9f9f9; /* Jasnoszary dla lepszej czytelności */
}

.transaction-list tr:nth-child(odd) {
  background-color: #fff; /* Biały dla kontrastu */
}

/* Formatowanie kolorów dla kolumny Kwota */
.transaction-list .amount.income {
  color: #4caf50; /* Zielony dla wpływów */
  font-weight: bold;
}

.transaction-list .amount.expense {
  color: #f44336; /* Czerwony dla wydatków */
  font-weight: bold;
}
</style>

