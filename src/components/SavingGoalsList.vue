<template>
    <div class="saving-goals-list">
      <h3>Cele oszczędnościowe</h3>
      <ul v-if="goals.length > 0">
        <li v-for="(goal, index) in goals" :key="index">
          <div class="goal-details">
            <h4>{{ goal.name }}</h4>
            <p><strong>Do zebrania:</strong> {{ goal.formattedTargetAmount }}</p>
            <p><strong>Zaoszczędzono:</strong> {{ goal.formattedCurrentProgress }}</p>
            <p><strong>Data wygaśnięcia:</strong> {{ goal.formattedDueDate }}</p>
            <p><strong>Progres:</strong> {{ goal.progressPercentage }}%</p>
          </div>
          <progress
            :value="goal.savedAmount"
            :max="goal.targetAmount"
          ></progress>
        </li>
      </ul>
      <p v-else>Brak utworzonych celi.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SavingGoalsList',
    props: {
      goals: {
        type: Array,
        required: true,
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
  </style>
  