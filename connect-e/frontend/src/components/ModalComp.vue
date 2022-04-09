<template>
  <div class="backdrop">
    <div class="modal" :class="{ sale: theme === 'sale'}">
      <h1>{{header}}</h1>
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['header', 'text', 'theme']
}
</script>



<style scoped>
body {
  background-color: rgb(192, 226, 240);
}
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
  text-align: center;
}

.backdrop{
  top: 5%;
  position: fixed;
  background: rgba(53, 77, 75, 0.5);
  width: 100%;
  height: 100%;
}

h1{
  color: rgb(0, 73, 73);
}

.modal.sale {
  background: crimson;
  color: white;
}

.modal.sale h1 {
color: white;
}


</style>