<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="value => $store.commit('set', ['sidebarShow', 'responsive'])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon name="cil-terminal" size="lg"></CIcon
      ><span class="brand"> IAIS Meta </span>
    </CSidebarBrand>

    <ul class="c-sidebar-nav h-100 ps" style="position: relative;">
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'Home' }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isHome }"
        >
          <CIcon name="cil-home" class="c-sidebar-nav-icon" />Home
          <span class="badge badge-primary">Alpha</span>
        </router-link>
      </li>
      <li class="c-sidebar-nav-title">Metadata</li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'StatisticalProgramList' }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isReferential }"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" />
          Referential
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'StructuralComponents' }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isStructural }"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Structural
        </router-link>
      </li>
      <li class="c-sidebar-nav-item">
        <router-link
          tag="a"
          :to="{ name: 'Home' }"
          class="c-sidebar-nav-link"
          :class="{ 'c-active': isProcess }"
        >
          <CIcon name="cil-layers" class="c-sidebar-nav-icon" /> Process
        </router-link>
      </li>
    </ul>
  </CSidebar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("coreui", {
      show: "sidebarShow",
      minimize: "sidebarMinimize",
      isHome: "isHome",
      isReferential: "isReferential",
      isStructural: "isStructural",
      isProcess: "isProcess"
    })
  }
};
</script>
<style scoped>
.brand {
  font-size: 1.2em;
  padding-left: 1rem;
}
</style>
