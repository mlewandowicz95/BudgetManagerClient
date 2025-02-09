<template>
  <div class="saving-goals-list">
    <h3>Cele oszczędnościowe</h3>
    <ul v-if="filteredGoals.length > 0">
      <li v-for="(goal, index) in filteredGoals" :key="index">
        <div class="goal-details" @click="editGoal(goal)">
          <h4>{{ goal.name }}</h4>
          <p><strong>ID:</strong> {{ goal.id || 'Brak ID' }}</p>
          <p><strong>Do zebrania:</strong> {{ formatCurrency(goal.targetAmount) }}</p>
          <p><strong>Zaoszczędzono:</strong> {{ formatCurrency(goal.currentProgress) }}</p>
          <p><strong>Data wygaśnięcia:</strong> {{ formatDate(goal.dueDate) }}</p>
          <p><strong>Progres:</strong> {{ goal.progressPercentage }}%</p>
          <progress :value="goal.currentProgress" :max="goal.targetAmount"></progress>
        </div>
        <div class="goal-actions">
          <button @click.stop="deleteGoal(goal.id)" class="delete-btn">Usuń</button>
        </div>
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
      return this.goals
        .filter((goal) => goal.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 3);
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
    editGoal(goal) {
      console.log("Edycja celu, ID:", goal.id, typeof goal.id);
      if (!goal.id) {
        console.error("BŁĄD: Brak goal.id!");
        return;
      }
      this.$router.push({ name: "EditGoal", params: { id: Number(goal.id) } });
    },
    async deleteGoal(goalId) {
  console.log("Próba usunięcia celu, ID:", goalId);

  const confirmDelete = confirm("Czy na pewno chcesz usunąć ten cel?");
  if (!confirmDelete) return;

  try {
    console.log("Usuwam...");

    this.$emit("deleteGoal", goalId); // Emituj event tylko po usunięciu
  } catch (error) {
    console.error("Błąd podczas usuwania celu:", error.message);
    alert("Nie udało się usunąć celu. Spróbuj ponownie.");
  }
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
  transition: background 0.3s ease, border 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease; /* Animacja */
}

.saving-goals-list li:hover {
  background: #f9f8e8; /* Delikatne podświetlenie */
  border: 1px solid #ccc; /* Jaśniejsza ramka */
  transform: translateY(-3px); /* Minimalne podniesienie */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Lekki cień dla efektu unoszenia */
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

.delete-btn {
  padding: 5px 10px;
  background-color: #f44336; /* Czerwony jak w transakcjach */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px; 
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
