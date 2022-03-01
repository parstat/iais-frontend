<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol sm="6" md="6" lg="4">
          <CCard class="mx-4 mb-0">
            <CCardHeader align="center">
              <img src="img/logo.png" class="logo" />
              <h3><span>{{ $t("user.signin_to_iais") }}</span></h3>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CAlert color="danger" v-if="errorMsg" class="text-center">
                  <span>{{ errorMsg }}</span>
                </CAlert>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <CIcon name="cilUser" size="xl"></CIcon>
                      </div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      :placeholder="$t('user.username')"
                      v-model.trim="username"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <CIcon name="cil-lock-locked" size="xl"></CIcon>
                      </div>
                    </div>
                    <input
                      type="password"
                      class="form-control"
                      :placeholder="$t('user.password')"
                      v-model="password"
                    />
                  </div>
                </div>
                <CRow>
                  <CCol col="12">
                    <CButton
                      color="primary"
                      class="btn-block"
                      @click.prevent="handleSubmit"
                      >{{ $t("user.signin") }}
                    </CButton>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol col="12" class="register">
                    <span>{{ $t("user.new") }}&nbsp;</span>
                    <router-link tag="a" to="/register">
                      <span>{{ $t("user.register") }}</span>
                    </router-link>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["errorMsg"]),
  },
  methods: {
    handleSubmit() {
      const formData = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch("auth/login", formData);
    },
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 0.4rem;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.5px;
}

.logo {
  width: 30%;
  margin-bottom: 0.4rem;
  margin-top: 0.3rem;
}

.register {
  margin-top: 2rem;
  border-top: 1px solid #d8dbe0;
  padding-top: 0.8rem;
  text-align: center;
}

.btn:focus,
.btn-success:focus {
  box-shadow: none;
}

.btn-success:not(:disabled):not(.disabled):active:focus,
.btn-success:not(:disabled):not(.disabled).active:focus {
  box-shadow: none;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-control:focus {
  outline: 0;
  box-shadow: none;
  color: #768192;
  background-color: #fff;
  border-color: #d8dbe0;
}

.welcome {
  margin-bottom: 0px;
}
</style>
