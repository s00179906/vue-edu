<template>
  <v-container>
    <v-row no-gutters class="pt-3">
      <v-col>
        <p class="d-block font-weight-medium title">MyEdu.</p>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn class="login-btn" large dark @click="login">Login</v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="5" sm="8" xs="8">
        <p class="display-2 font-weight-medium pb-3">Register today.</p>

        <v-form>
          <v-text-field
            class="input"
            dark
            label="Email"
            color="orange"
            autofocus
            clearable
            v-model="email"
          ></v-text-field>

          <v-text-field
            class="input"
            dark
            v-model="password"
            color="orange"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            class="input"
            v-model="confirmPassword"
            dark
            color="orange"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirm Password"
            hint="At least 6 characters"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <v-btn text large dark>Forgot Password?</v-btn>

          <v-btn class="register-btn" dark block @click="register">Let's Go</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The passwords you entered don't match",
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$router.push({ path: 'home' });
    },
    register() {
      axios
        .post('https://localhost:44382/api/account/register', {
          Email: this.email,
          Password: this.password,
          ConfirmPassword: this.confirmPassword,
        })
        .then(response => {
          this.sweetAlert('success', 'Hurray!', response.data);
          //   this.$router.push({ path: 'login' });
        })
        .catch(error => {
          console.log(error.response.data);
          // this.sweetAlert('error', 'Whoops!', error.response.data);
        });
    },
    sweetAlert(icon, title, text) {
      Swal.fire({
        icon,
        title,
        text,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-btn {
  border-radius: 10px;
  background: rgb(42, 46, 51);
  background: linear-gradient(
    90deg,
    rgba(42, 46, 51, 1) 0%,
    rgba(30, 34, 38, 1) 100%
  );
  box-shadow: -17px -17px 34px #111417, 17px 17px 34px #1b1e23;
}
.register-btn {
  background-image: linear-gradient(
    to right,
    #ffb75e 0%,
    #ed8f03 51%,
    #ffb75e 100%
  );

  box-shadow: 0 5px 15px rgba(182, 161, 92, 0.2);
}
.input {
  box-shadow: -22px -22px 44px #101215, 22px 22px 44px #1c2025;
}
</style>
