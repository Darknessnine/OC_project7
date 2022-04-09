<template>
  <div>
    <form @submit.prevent="handleSubmit" class="backdrop">
      <h1>LOG IN</h1>
      <p>Sign in to continue</p>
      <label>Email:</label>
      <input type="email"  v-model="email" />

      <label>Password:</label>
      <input type="password" required v-model="password" />

      <div class="submit">

          <button v-if="email && password" class="login_button" @click="loginRequest">
            Log in
          </button>

        <p class="centerText">
          Click here to <router-link to="signup">Sign up</router-link>
        </p>
        <p class="message">{{ message }}</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      parseRes: "",
      loggingIn: false,
      message:''
    };
  },
  methods: {
      loginRequest() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      
      fetch("http://localhost:3000/api/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => response.json())
        .then((parsedRes) => {
          if(parsedRes.status === '200'){
          let postRes = parsedRes;
          this.loggingIn = true
          sessionStorage.setItem("token", postRes.data.token);
          sessionStorage.setItem("userId", postRes.data.userId);
          sessionStorage.setItem("username", postRes.data.username);
          sessionStorage.setItem("email", postRes.data.email);
          sessionStorage.setItem("isLogedIn", true);
          this.$router.push('/forum')
          } else {
            this.message = "Login failed - " + parsedRes.message+ ""
            console.log("Could not sign in:", parsedRes);
          } 
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 






  },
};
</script>

<style>
a {
  text-decoration: none;
  color: rgb(47, 170, 207);
  font-weight: bold;
}
label {
  text-align: left;
}

.login_button {
  text-align: center;
  display: block;
  margin: 20px auto;
}

p,
h1 {
  text-align: left;
}

.centerText {
  text-align: center;
}

.message{
  text-align: center;
  color: rgb(220, 93, 20);
}
</style>

