<template>
  <div class="c-subheader-nav mfe-2" v-if="isReferential">
    <router-link
      tag="a"
      to="/metadata/referential/gsim"
      class="c-subheader-nav-link"
    >
      <gsim-icon />
      <span class="header-link icon-span">Gsim concepts</span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", ["isReferential"])
  },
  watch: {
    $route(to) {
      if (to.path == "/metadata") {
        this.$store.dispatch("coreui/clearContext");
      }
    }
  }
};
</script>
