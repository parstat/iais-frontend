<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.dispatch({
          type: 'coreui/updateSidebarVisible',
          value: event,
        })
    "
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon name="cil-terminal" size="lg" />
      <span class="brand">&nbsp;IAIS Meta</span>
    </CSidebarBrand>

    <AppSidebarNav />
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.dispatch('coreui/toggleUnfoldable')"
    />
  </CSidebar>
</template>

<script>
import { mapGetters } from "vuex";
import { AppSidebarNav } from "./SidebarNav";

export default {
  name: "AppSidebar",
  components: {
    AppSidebarNav,
  },
  computed: {
    ...mapGetters("coreui", {
      sidebarVisible: "sidebarVisible",
      sidebarUnfoldable: "sidebarUnfoldable",
      isHome: "isHome",
      isReferential: "isReferential",
      isStructural: "isStructural",
      isProcess: "isProcess",
    }),
  },
};
</script>
