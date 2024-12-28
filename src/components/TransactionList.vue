<template>
    <div class="transaction-list">
      <h3>Recent Transactions</h3>
      <ul>
        <li v-for="(transaction, index) in transactions" :key="index" :class="transaction.typeClass">
          <div>
            <p><strong>Date:</strong> {{ transaction.formattedDate }}</p>
            <p><strong>Amount:</strong> {{ transaction.formattedAmount }}</p>
            <p><strong>Category:</strong> {{ transaction.categoryName }}</p>
            <p><strong>Description:</strong> {{ transaction.description }}</p>
          </div>
        </li>
      </ul>
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
  };
  </script>
  
  <style scoped>
  .transaction-list ul {
    list-style: none;
    padding: 0;
  }
  
  .transaction-list li {
    margin-bottom: 15px;
    padding: 10px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .transaction-income {
    border-left: 5px solid #4caf50;
  }
  
  .transaction-expense {
    border-left: 5px solid #f44336;
  }
  </style>
  