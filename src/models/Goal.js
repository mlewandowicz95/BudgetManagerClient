export default class Goal {
    constructor({ Name, TargetAmount, CurrentProgress, DueDate }) {
      this.name = Name;
      this.targetAmount = TargetAmount;
      this.savedAmount = CurrentProgress;
      this.dueDate = new Date(DueDate);
    }
  
    getProgressPercentage() {
      return ((this.currentProgress / this.targetAmount) * 100).toFixed(2); // Procent realizacji
    }
  
    isCompleted() {
      return this.currentProgress >= this.targetAmount;
    }

    // Formatowanie kwoty docelowej
    get formattedTargetAmount() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.targetAmount);
    }
  
    // Formatowanie zaoszczędzonej kwoty
    get formattedSavedAmount() {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.savedAmount);
    }
  
    // Obliczanie procentu postępu
    get progressPercentage() {
      return ((this.savedAmount / this.targetAmount) * 100).toFixed(2);
    }
  
    // Formatowanie daty realizacji
    get formattedDueDate() {
      return this.dueDate.toLocaleDateString();
    }
  }
  