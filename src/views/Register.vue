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
            v-model="email"
            dark
            dense
            label="Email"
            outlined
            color="orange"
            autofocus
            clearable
          ></v-text-field>

          <v-text-field
            v-model="password"
            dense
            dark
            outlined
            color="orange"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="At least 6 characters"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            dense
            dark
            outlined
            color="orange"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.emailMatch]"
            :type="showPassword ? 'text' : 'password'"
            label="Confirm Password"
            hint="At least 6 characters"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn text large dark>Forgot Password?</v-btn>

          <v-btn class="register-btn" dark block @click="register"
            >Let's Go</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$router.push({ path: 'home' });
    },
    register() {
      console.log(this.email, this.password, this.confirmPassword);
      axios
        .post('https://localhost:44382/api/account/register', {
          Email: this.email,
          Password: this.password,
          ConfirmPassword: this.confirmPassword,
        })
        .then(response => console.log(response));
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
</style>
