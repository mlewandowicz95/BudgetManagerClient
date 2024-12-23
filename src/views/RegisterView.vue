<template>
    <div>
      <h1>Rejestracja</h1>
      <form>
        <!-- Formularz rejestracji -->
        <div>
          <label for="username">Nazwa użytkownika (adres e-mail):</label>
          <input id="username" type="text" required />
        </div>
        <div>
          <label for="password">Hasło:</label>
          <input id="password" type="password" required />
        </div>
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterView',
  };
  </script>
  