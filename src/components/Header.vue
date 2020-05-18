<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.dispatch('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.dispatch('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <img src="/img/logo.png" height="40" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink v-if="isAuthenticated">
          Admin
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <app-header-dropdown-account />
    </CHeaderNav>
    <CSubheader class="justify-content-between px-3">
      <!--CBreadcrumbRouter class="border-0 mb-0" /-->
      <app-header-breadcrumb></app-header-breadcrumb>
      <!--app-header-back-btn></app-header-back-btn-->
    </CSubheader>
  </CHeader>
</template>

<script>
import { mapGetters } from "vuex";

import HeaderDropdownAccnt from "./HeaderDropdownAccnt";
import BreadCrumb from "./BreadCrumb";

export default {
  computed: {
    ...mapGetters("auth", ["isAuthenticated"])
  },
  components: {
    "app-header-dropdown-account": HeaderDropdownAccnt,
    "app-header-breadcrumb": BreadCrumb
  }
};
</script>
