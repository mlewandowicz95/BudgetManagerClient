<template>
  <div class="saving-goals-list">
    <h3>Cele oszczędnościowe</h3>
    <ul v-if="filteredGoals.length > 0">
      <li v-for="(goal, index) in filteredGoals" :key="index">
        <div class="goal-details">
          <h4>{{ goal.name }}</h4>
          <p><strong>Do zebrania:</strong> {{ formatCurrency(goal.targetAmount) }}</p>
          <p><strong>Zaoszczędzono:</strong> {{ formatCurrency(goal.currentProgress) }}</p>
          <p><strong>Data wygaśnięcia:</strong> {{ formatDate(goal.dueDate) }}</p>
          <p><strong>Progres:</strong> {{ goal.progressPercentage }}%</p>
        </div>
        <progress
          :value="goal.currentProgress"
          :max="goal.targetAmount"
        ></progress>
      </li>
    </ul>
    <p v-else>Brak utworzonych celi.</p>
  </div>
</template>

<script>
export default {
  name: "SavingGoalsList",
  props: {
    goals: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredGoals() {
      // Sortowanie celów według daty wygaśnięcia, a następnie ograniczenie do 3 najbliższych
      return this.goals
        .filter((goal) => goal.dueDate) // Uwzględnij tylko cele z datą
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) // Sortowanie rosnące według daty
        .slice(0, 3); // Pobierz pierwsze 3 cele
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "Brak daty";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}.${month}.${year}`;
    },
    formatCurrency(amount) {
      if (amount == null) return "0 zł";
      return parseFloat(amount).toLocaleString("pl-PL", {
        style: "currency",
        currency: "PLN",
      });
    },
  },
};
</script>

<style scoped>
.saving-goals-list {
  margin-top: 20px;
}

.saving-goals-list ul {
  list-style: none;
  padding: 0;
}

.saving-goals-list li {
  margin-bottom: 15px;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.goal-details h4 {
  margin: 0 0 5px 0;
}

.goal-details p {
  margin: 5px 0;
}

progress {
  width: 100%;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
  appearance: none;
  -webkit-appearance: none;
}

progress::-webkit-progress-bar {
  background-color: #e6e6e6;
  border-radius: 5px;
}

progress::-webkit-progress-value {
  background-color: #4caf50;
  border-radius: 5px;
}

.saving-goals-list p {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>
