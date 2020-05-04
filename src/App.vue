<template>
  <div id="app" class="c-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    //TEST: Simulate user auto-login
    this.$store.dispatch("mockLogin");
  }
};
</script>
