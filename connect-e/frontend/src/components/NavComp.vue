<template>
  <div class="nav_body">
      <nav>
        <ul>
          <li><router-link to="profile">Profile</router-link> </li>
          <li><router-link to="forum">Forum</router-link></li>
          <li><router-link to="logout">Logout</router-link></li>
        </ul>
      </nav>
  </div>
</template>

<script>
export default {

}
</script>


<style scoped>

.nav_body{
 position: absolute;
  top: 0%;
  width: 100%;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 2px 2px 11px #ced8d8;
  text-align: center;
}

li {
display: inline-block; 
padding: 0px 25px; 
}

li a {
  display: block;
  color: #2c3e50;
  text-align: center;
  padding: 20px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color:  rgb(207, 219, 221);
}

.router-link-active,
.router-link-exact-active {
  color: white;
    background: rgb(53, 176, 192);
    font-weight: bold;
}

@media only screen and (max-width: 500px) {
li a {
  padding: 20px 1px;
}
}
</style>

