<template>
  <div v-if="isAuthenticated">
    <CDropdown
      inNav
      class="c-header-nav-items"
      placement="bottom-end"
      add-menu-classes="pt-0"
    >
      <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
        <div class="c-avatar">
          <img
            src="/img/avatars/user.png"
            height="30"
            width="30"
            class="c-avatar-img"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu class="pt-0">
        <CDropdownHeader tag="div" class="text-center" color="light">
          <strong>Settings</strong>
        </CDropdownHeader>
        <CDropdownItem> <CIcon name="cil-user" />Profile </CDropdownItem>
        <CDropdownItem> <CIcon name="cil-settings" />Settings </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem @click="logout">
          <CIcon name="cil-lock-locked" />Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  </div>
  <div v-else>
    <CHeaderNav>
      <router-link
        tag="a"
        class="text-decoration-none text-primary"
        to="/login"
      >
        <CIcon name="cilUser"></CIcon>
        <span>Login</span>
      </router-link>
    </CHeaderNav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
