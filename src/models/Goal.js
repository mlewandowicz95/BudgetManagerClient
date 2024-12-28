export default class SavingGoal {
  constructor({ name, targetAmount, currentProgress, progressPercentage, dueDate, isCloseToCompletion }) {
    this.name = name;
    this.targetAmount = targetAmount;
    this.currentProgress = currentProgress;
    this.progressPercentage = progressPercentage;
    this.dueDate = new Date(dueDate);
    this.isCloseToCompletion = isCloseToCompletion;
  }

  get formattedDueDate() {
    return this.dueDate.toLocaleDateString();
  }

  get formattedTargetAmount() {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(this.targetAmount);
  }
  
  get formattedCurrentProgress() {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(this.currentProgress);
  }
}
