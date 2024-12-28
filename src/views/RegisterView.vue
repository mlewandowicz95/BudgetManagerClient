<template>
  <div class="register">
    <form>
      <div>
        <input class="input-register" id="username" v-model="username" type="text" required placeholder="Adres e-mail" />
      </div>
      <div>
        <input class="input-register" id="password" v-model="password" type="password" required placeholder="Hasło" />
      </div>
      <div>
        <input class="input-register" id="confirmPassword" v-model="confirmPassword" type="password" required placeholder="Powtórz hasło" />
      </div>
      <button class="button-register" type="submit">Zarejestruj się</button> 
    </form>
  </div>
</template>

<script>
export default {
  name: 'MenuView',
};
</script>


<style scoped>
.input-register {
  width: 50%;
  padding: 10px 20px;
  margin: 8px 0px;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid black;
  background-color: #deeef6;
}


.button-register {
  padding: 10px 20px;
  font-size: 27px;
  font-weight: bold;
  color: white;
  background-color: #004aad;
  border-radius: 30px;
}
</style>