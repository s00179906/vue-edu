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
        <v-form>
          <v-text-field
            outlined
            dark
            label="Email"
            color="purple"
            autofocus
            :rules="[rules.required]"
            clearable
            v-model="email"
          ></v-text-field>

          <v-text-field
            outlined
            dark
            v-model="password"
            color="purple"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, passwordMatcher]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="Must include special characters, capital letters & numbers"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            outlined
            v-model="confirmPassword"
            dark
            color="purple"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, passwordMatcher]"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="Confirm Password"
            hint="Must include special characters, capital letters & numbers"
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>

          <v-btn
            color="red"
            dark
            block
            @click="register"
            :disabled="!validateForm"
            >Register 🚀</v-btn
          >
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
        min: v => v.length >= 6 || 'Must be atleast 6 characters',
      },
    };
  },
  computed: {
    validateForm() {
      let valid = true;
      return valid
        ? this.password && this.email && this.confirmPassword
        : (valid = false);
    },
    passwordMatcher() {
      return this.password != this.confirmPassword
        ? "The password's you have entered don't match"
        : '';
    },
  },
  methods: {
    register() {
      const hostedUrl =
        'https://edu20200515000357.azurewebsites.net/api/account/register';
      axios
        .post(hostedUrl, {
          Email: this.email,
          Password: this.password,
          ConfirmPassword: this.confirmPassword,
        })
        .then(response => {
          this.sweetAlert('success', 'Hurray!', response.data);
          this.$router.push({ name: 'Login' });
        })
        .catch(error => {
          console.log(error.response.data.ModelState);
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
