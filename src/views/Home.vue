<template>
  <div>
    <app-sidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <app-toast />
      <app-header />
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view></router-view>
        </CContainer>
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script>
import { CContainer } from "@coreui/vue-pro";
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
    CContainer,
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  },
};
</script>
