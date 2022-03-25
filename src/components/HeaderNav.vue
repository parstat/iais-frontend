<template>
  <div class="c-subheader-nav mfe-2" v-if="isReferential">
    <router-link
      class="text-decoration-none text-primary"
      tag="a"
      to="/metadata/referential/gsim"
    >
      <CIcon name="cil-puzzle" />
      <span class="header-link icon-span"
        >&nbsp;{{ $t("header.gsim_objects") }}</span
      >
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", ["isReferential"]),
  },
  watch: {
    $route(to) {
      if (to.path == "/metadata") {
        this.$store.dispatch("coreui/clearContext");
      }
    },
  },
};
</script>
