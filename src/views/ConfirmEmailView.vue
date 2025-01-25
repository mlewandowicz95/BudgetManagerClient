<template>
    <HomeLayout>
        <div class="confirm-email">
      <h1>Potwierdzenie rejestracji</h1>
      <p v-if="isLoading">Proszę czekać, trwa potwierdzanie...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
    </HomeLayout>
  </template>
  
  <script>
import { confirmEmail } from "@/api/api";
import { ErrorCodes } from "@/constants/errorCodes";
import HomeLayout from '@/layouts/HomeLayout.vue';

export default {
    name: "ConfirmEmailView",
    components: {
    HomeLayout,
  },
    data() {
        return {
            isLoading: false,
            success: "",
            error: "",
        };
    },
    async created(){
        const token = this.$route.query.token;

        if(!token){
            this.error = "Brak tokenu aktywacyjnego. Proszę sprawdzić link w e-mailu."; 
            return;
        }

        this.isLoading = true;

        try{
            const response = await confirmEmail(token);
            this.success = response.message || "Twoje konto zostało pomyślnie aktywowane!";
        } catch(error){
            console.error("Błąd w ConfirmEmailView:", error);

            switch (error.errorCode) {
        case ErrorCodes.MissingToken:
          this.error = "Brak tokenu aktywacyjnego. Proszę sprawdzić link w e-mailu.";
          break;
        case ErrorCodes.InvalidToken:
          this.error = "Token aktywacyjny jest nieprawidłowy. Skontaktuj się z pomocą techniczną.";
          break;
        case ErrorCodes.UserAlreadyActive:
          this.error = "Konto zostało już wcześniej aktywowane. Możesz się zalogować.";
          break;
          case ErrorCodes.InternalServerError:
            this.error = "Wystąpił inny błąd serwera.";
            break;
        default:
          this.error = error.message || "Wystąpił nieoczekiwany błąd.";
      }
        }finally {
      this.isLoading = false;
    }
    },
}
</script>

<style scoped>
.confirm-email {
  background-color: #ffffff; /* Ustaw białe tło */
  color: #000000; /* Czarny tekst */
  padding: 20px;
  border-radius: 8px;
  min-height: 300px; /* Zapewnij minimalną wysokość */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>