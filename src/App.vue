<template>
  <div id="app" class="c-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    //Manage browser refresh F5
    this.$store.dispatch("reloadCredentials");
    //Clear messages
    this.$store.dispatch("clear");
  }
};
</script>
