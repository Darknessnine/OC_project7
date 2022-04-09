<template>
  <div>
    <NavComp></NavComp>
    <div class="post_body">
      <div>
        <h1>title :</h1>
        <p>username :</p>
      </div>
      <div class="content">content</div>
    </div>
  </div>
</template>

<script>
import NavComp from "../components/NavComp.vue";

export default {
  name: "App",
  components: { NavComp },
};
</script>

<style scoped>


.content{
  width: 90%;
  height: 300px;
  background-color: #ced8d8;
  margin: 20px ;
  text-align: left;
}
</style>
