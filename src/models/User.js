export default class User {
    constructor({ id, email, role }) {
      this.id = id;
      this.email = email;
      this.role = role;
    }
  
    isAdmin() {
      return this.role === "Admin";
    }
  }