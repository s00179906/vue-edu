<template>
  <v-container>
    <v-row no-gutters class="pt-3">
      <v-col>
        <p class="d-block font-weight-medium title">MyEdu.</p>
      </v-col>
      <v-col class="d-flex justify-end">
        <Register />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="5" sm="8" xs="8">
        <p class="display-2 font-weight-medium pb-3">Welcome back.</p>

        <v-form>
          <v-text-field
            outlined
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
            outlined
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

          <v-btn class="login-btn" color="red" dark block @click="login"
            >Login</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Register from '../components/Register.vue';

export default {
  components: {
    Register,
  },
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
  methods: {
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
  box-shadow: 0 5px 15px rgba(182, 92, 92, 0.2);
}
</style>
