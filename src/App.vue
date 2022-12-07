<template>
  <div id="app">
    <div id="nav" class="mb-3 text-center">
      <h1><b><i>TODO LIST APP</i></b></h1>
      <router-link to="/" class="btn btn-outline-success">Home</router-link>
      <i style="margin-left: -11px" class=""></i>

      <router-link to="/add" class="btn btn-outline-warning">Tambah Data</router-link>
      <i v-if="$route.name == 'edit-data'"></i>
      <button active to="#" id="edite" v-if="$route.name == 'edit-data'">
        Edit
      </button>
      <i v-if="$route.name == 'detail-data'"></i>
      <button active to="#" id="edite" v-if="$route.name == 'detail-data'">
        Detail
      </button>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>
<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 2rem;
}
#title {
  font-weight: bold;
  color: #2c3e50;
  border: 2px solid rgb(143, 3, 131);
  border-radius: 50px 20px;
  margin: 1rem 1rem 0 1rem;
  padding: 0.25rem 0.75rem;
  width: 175px;
  text-align: center;
}
#tool {
  font-weight: bold;
  color: #2c3e50;
  border: 2px solid rgb(143, 3, 131);
  border-radius: 50px 20px;
  margin: 1rem 1rem 0 1rem;
  padding: 0.25rem 0.75rem;
  width: 175px;
  text-align: center;
}
#actionic, #action {
  font-weight: bold;
  margin: 0.5rem 0 0;
  text-decoration: none;
  padding: 2px;
}

#actionic:hover {
  color: #0428ff;
}

#nav a {
  font-weight: bold;
  margin: 0 1rem 0 0;
  padding: 0.25rem 0.75rem;
}

#nav a.router-link-exact-active {
  color: #0428ff;
}
#edite {
  font-weight: bold;
  color: #0428ff;
  margin: 0 1rem 0 0;
  background: #eee;
  text-decoration: none;
  padding: 0 0.75rem;
  border: 0;
}
input[type="submit"] {
  background: #0028ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  box-shadow: 0 5px 10px #04ff827a;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.25s ease-out;
  cursor: pointer;
}
input[type="submit"]:hover {
  background: #3600ff;
  box-shadow: 0 3px 7px #0428ff7a;
}
input {
  box-sizing: border-box;
  border: 1px solid #aaa;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
}
</style>
