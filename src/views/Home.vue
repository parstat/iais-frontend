<template>
  <div class="c-app">
    <app-sidebar></app-sidebar>
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <app-toast></app-toast>
      <app-header />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
              <router-view></router-view>
          </CContainer>
        </main>
        <app-footer />
      </div>
    </div>
  </div>
</template>

<script>
import { CContainer } from '@coreui/vue';
import AppHeader from "@/components/Header";
import AppFooter from "@/components/Footer";
import AppSidebar from "@/components/Sidebar";
import AppToast from "@/components/Toast";

import { Context } from "@/common";

export default {
  name: "app",
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter,
    "app-sidebar": AppSidebar,
    "app-toast": AppToast,
    CContainer
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  },
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "../assets/scss/style";

//Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
