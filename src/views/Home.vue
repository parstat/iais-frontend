<template>
  <div class="c-app">
    <app-sidebar></app-sidebar>
    <CWrapper>
      <app-toast></app-toast>
      <app-header />
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <app-footer />
      </div>
    </CWrapper>
  </div>
</template>

<script>
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
