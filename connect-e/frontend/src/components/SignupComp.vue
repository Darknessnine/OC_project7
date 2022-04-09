<template>
  <div>
    
    <form @submit.prevent="handleSubmit" class="backdrop">
      <h1>Sign Up</h1>
      <p>Fill out information below</p>
      <label>Username:</label>
      <input type="text" required v-model="username" />
      <label>Email:</label>
      <input type="email" required v-model="email" />
      <label>Password:</label>
      <input type="password" required v-model="password" />
      <div class="submit">
        <button class="signupButton" @click="signupRequest" v-if=" username && email && password">Create Account</button>
        <p class="centerText">Already have an account? <router-link to="/">Click Here</router-link></p>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
      
    }
  },
  methods: {
    signupRequest() {
      const signup ={
        username: this.username,
        email: this.email,
        password: this.password,
        }
      console.log(signup)
      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.$router.push('/')
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};

</script>

<style>
.signupButton{
  display: block;
  margin: 30px auto;
}

</style>