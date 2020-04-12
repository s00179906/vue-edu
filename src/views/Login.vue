<template>
  <v-container>
    <v-row no-gutters class="pt-3">
      <v-col>
        <p class="d-block font-weight-medium title">MyEdu.</p>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn class="login-btn" large dark @click="register">Register</v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="5" sm="8" xs="8">
        <p class="display-2 font-weight-medium pb-3">Welcome back.</p>

        <v-form>
          <v-text-field
            class="input"
            dark
            label="Email"
            color="orange"
            autofocus
            clearable
            v-model="email"
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            class="input"
            dark
            v-model="password"
            color="orange"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn text large dark>Forgot Password?</v-btn>

          <v-btn class="register-btn" dark block @click="login">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
// import querystring from 'querystring';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  mounted() {},
  methods: {
    register() {
      this.$router.push({ path: '/' });
    },
    async login() {
      const data = {
        username: this.email,
        password: this.password,
        grant_type: 'password',
      };

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data,
        url: 'https://localhost:44382/token',
      };

      try {
        const response = await axios(options);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
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
  box-shadow: inset 9px 9px 17px #111417, inset -9px -9px 17px #1b1f23;
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
