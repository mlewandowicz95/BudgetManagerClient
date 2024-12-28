export default class Transaction {
  constructor({ date, amount, categoryName, description, type }) {
    this.date = new Date(date); // Konwersja na obiekt Date
    this.amount = amount;
    this.categoryName = categoryName;
    this.description = description || "Brak opisu"; // Domyślna wartość
    this.type = type; // "Income" lub "Expense"
  }

  get formattedDate() {
    return this.date.toLocaleDateString();
  }

  get formattedAmount() {
    const sign = this.type === "Expense" ? "-" : "+";
    return `${sign}${new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(this.amount)}`;
  }
}
