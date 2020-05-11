<template>
  <v-container>
    <v-row no-gutters class="pt-3">
      <v-col>
        <p class="d-block font-weight-medium title">MyEdu.</p>
      </v-col>
      <v-col class="d-flex justify-end">
        <Login />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="5" sm="8" xs="8">
        <p class="display-2 font-weight-medium pb-3">Register today.</p>

        <v-text-field
          outlined
          v-model="fullName"
          dark
          color="orange"
          label="Full Name"
        ></v-text-field>

        <v-form>
          <v-text-field
            outlined
            dark
            label="Email"
            color="orange"
            autofocus
            clearable
            v-model="email"
          ></v-text-field>

          <v-text-field
            outlined
            dark
            v-model="password"
            color="orange"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.passwordMatch]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters, must include special characters, capital letters & numbers"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            outlined
            v-model="confirmPassword"
            dark
            color="orange"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.passwordMatch]"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirm Password"
            hint="At least 6 characters, must include special characters, capital letters & numbers"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <v-btn color="red" dark block @click="register">Let's Go</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Login from '../components/Login.vue';

export default {
  components: {
    Login,
  },
  data() {
    return {
      email: '',
      password: '',
      fullName: '',
      showPassword: false,
      confirmPassword: '',
      showConfirmPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        passwordMatch: () =>
          this.password !== this.confirmPassword
            ? "The passwords you entered don't match"
            : null,
      },
    };
  },
  methods: {
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

<style lang="scss" scoped></style>
