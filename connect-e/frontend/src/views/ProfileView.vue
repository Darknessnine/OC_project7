<template>
  <div>
    <NavComp></NavComp>
    <div class="backdrop">
      <div class="icon_box">
        <span class="icon">?</span>
      </div>
      <div class="accountDetails">
        <label>ID:</label>
        <div class="accountDetails_box">{{ id }}</div>
        <label>USERNAME:</label>
        <div class="accountDetails_box">{{ username }}</div>
        <label>Email:</label>
        <div class="accountDetails_box">{{ email }}</div>
      </div>

        <button class="delete" @click="deleteAccount">Delete Account</button>

      <p>This action will permanently delete this account. Think wisely</p>
    </div>
  </div>
</template>

<script>
import NavComp from "../components/NavComp.vue";

export default {
  name: "App",
  components: { NavComp },
  data() {
    return {
      id: "",
      username: "",
      email: "",
    };
  },
  methods: {
    deleteAccount() {
      fetch('http://localhost:3000/api/profile/' + this.id, {
        method: "DELETE",
        headers: {
         'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then((response) => {
        if (response.data.status === '200'){
          sessionStorage.clear()
          this.$router.push('/')
        } 
      }).catch((err) => {
        console.log(err)
        sessionStorage.clear()
        this.$router.push('/')
      })
    },
  },
  mounted: function () {
    this.id = sessionStorage.getItem("userId");
    this.email = sessionStorage.getItem("email");
    this.username = sessionStorage.getItem("username");
  },
};
</script>

<style>
.icon_box {
  margin: 0 auto;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  background-color: rgb(207, 219, 221);
  border-radius: 10px;
}

.icon {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  color: white;
  font-size: 50px;
}

.accountDetails {
  margin: 25px 0 15px;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  text-align: left;
}

.accountDetails_box {
  background-color: rgb(207, 219, 221);
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.delete {
  background: crimson;
  transition: 1000ms;
}

.delete:hover {
  background: rgb(0, 0, 0);
}
</style>