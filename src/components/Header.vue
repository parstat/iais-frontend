<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler
        class="ps-1"
        @click="$store.dispatch('coreui/toggleSidebar')"
        ><CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <img src="/img/logo.png" height="40" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <!--CDropdown
        inNav
        class="c-header-nav-items"
        placement="bottom"
        add-menu-classes="dropdown-menu-right pt-0"
      >
        <template #toggler>
          <CHeaderNavLink>
            <div class="c-header-nav-first">Artifacts</div>
          </CHeaderNavLink>
        </template>

        <CDropdownHeader tag="div" class="text-center" color="light">
          <strong>Referential</strong>
        </CDropdownHeader>
        <CDropdownItem> <CIcon name="cil-user" />Agent </CDropdownItem>
        <CDropdownItem> <CIcon name="cil-terminal" />Software </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-terminal" />Methodology
        </CDropdownItem>
      </CDropdown-->
      </CHeaderNav>
      <CHeaderNav class="mr-4">
        <app-language-selection />
      </CHeaderNav>
      <CHeaderNav class="mr-4">
        <app-header-dropdown-account />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <!--CBreadcrumbRouter class="border-0 mb-0" /-->
      <app-header-breadcrumb></app-header-breadcrumb>
      <app-header-nav></app-header-nav>
    </CContainer>
  </CHeader>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderDropdownAccnt from "./HeaderDropdownAccnt";
import BreadCrumb from "./BreadCrumb";
import HeaderNav from "./HeaderNav";
import LanguageSelection from "./LanguageSelection";

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  components: {
    "app-header-dropdown-account": HeaderDropdownAccnt,
    "app-header-breadcrumb": BreadCrumb,
    "app-header-nav": HeaderNav,
    "app-language-selection": LanguageSelection,
  },
};
</script>
