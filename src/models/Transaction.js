export default class Transaction {
    constructor({ Date, Amount, CategoryName, Description, Type }) {
      this.date = new Date(Date); // Konwersja na obiekt Date
      this.amount = Amount;
      this.categoryName = CategoryName;
      this.description = Description || "No description provided"; // Domyślna wartość
      this.type = Type; // "Income" lub "Expense"
    }
  
    // Metoda pomocnicza: sformatowana data
    get formattedDate() {
      return this.date.toLocaleDateString();
    }
  
    // Metoda pomocnicza: sformatowana kwota
    get formattedAmount() {
      const sign = this.type === "Expense" ? "-" : "+";
      return `${sign}${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.amount)}`;
    }
  
    // Metoda pomocnicza: Klasa CSS dla typu transakcji
    get typeClass() {
      return this.type === "Expense" ? "transaction-expense" : "transaction-income";
    }

    isIncome() {
      return this.type === "Income";
    }
  
    isExpense() {
      return this.type === "Expense";
    }
  }
  