<template>
  <div class="c-subheader-nav d-md-down-none mfe-2">
    <router-link
      tag="a"
      :to="backButton.url"
      class="c-subheader-nav-link"
      v-if="backButton.show"
    >
      <CIcon name="cilXCircle"></CIcon><span class="header-link">Close</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", ["backButton"])
  },
  watch: {
    $route(to) {
      this.$store.dispatch("coreui/setBackButton", {
        currentRoute: this.$route,
        destinationRoute: to
      });
    }
  },
  created() {
    //page reload
    this.$store.dispatch("coreui/setBackButton", {
      currentRoute: this.$route,
      destinationRoute: this.$route
    });
  }
};
</script>
