<template>
  <div>
    <NavComp></NavComp>
    <div class="backdrop">
      <div class="icon_box">
        <span class="icon">?</span>
      </div>
        <button class="logout" @click="logout">Log out</button>
      <p class="centerText">Click here to log out of your account</p>
    </div>
  </div>
</template>

<script>
import NavComp from "../components/NavComp.vue";

export default {
  name: "App",
  components: { NavComp },
  methods: {
      logout() {
      sessionStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style>
.logout{
  background: rgb(53, 176, 192);
  color: rgb(255, 255, 255);
  transition: 500ms;
}

.logout:hover{
  background-color:  rgb(88, 104, 107);

}
</style>