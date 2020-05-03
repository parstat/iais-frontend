<template>
  <div id="app" class="c-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.$store.dispatch("mockLogin");
  }
};
</script>
