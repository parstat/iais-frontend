<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6" lg="4">
          <CCard class="mx-4 mb-0">
            <CCardHeader align="center">
              <img src="img/logo.png" class="logo" />
              <h3>
                <span>{{ $t("user.register_to_iais") }}</span>
              </h3>
            </CCardHeader>
            <CCardBody class="p-4">
              <CForm>
                <CAlert color="danger" v-if="showGlobalError">
                  <span>{{ $t("user.validations.username_taken") }}</span>
                  <span>
                    {{ $t("common.go_to") }}
                    <router-link tag="a" to="/login">
                      <span>{{ $t("user.login_page") }}</span>
                    </router-link>
                  </span>
                </CAlert>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CIcon name="cilUser" size="xl" />
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.username.$error }"
                    :placeholder="$t('user.username')"
                    v-model.trim="username"
                  />
                  <span
                    class="help-block"
                    :class="{ show: v$.username.$error }"
                  >
                    {{ $t("please_enter_username") }}
                  </span>
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CIcon name="cilAt" size="xl" />
                    </div>
                  </div>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': v$.email.$error }"
                    :placeholder="$t('user.email')"
                    v-model.trim="email"
                  />
                  <span class="help-block" :class="{ show: v$.email.$error }">
                    {{ $t("user.validations.email_invalid") }}
                  </span>
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CIcon name="cilUser" size="xl" />
                    </div>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.fullname.$error }"
                    :placeholder="$t('user.fullname')"
                    v-model.trim="fullname"
                  />
                  <span
                    class="help-block"
                    :class="{ show: v$.fullname.$error }"
                  >
                    {{ $t("user.validations.name_invalid") }}
                  </span>
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CIcon name="cil-lock-locked" size="xl" />
                    </div>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': v$.password.$error }"
                    :placeholder="$t('user.password')"
                    v-model.trim="password"
                  />
                  <span
                    class="help-block"
                    :class="{ show: v$.password.$error }"
                  >
                    {{ $t("user.validations.password_invalid") }}
                  </span>
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CIcon name="cil-lock-locked" size="xl" />
                    </div>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': v$.confirmpassword.$error }"
                    :placeholder="$t('user.confirmpassword')"
                    @input="v$.confirmpassword.$touch()"
                    v-model.trim="confirmpassword"
                  />
                  <span
                    class="help-block"
                    :class="{ show: v$.confirmpassword.$error }"
                  >
                    {{ $t("user.validations.passwords_no_match") }}
                  </span>
                </div>
                <CButton color="success" block @click.prevent="handleSubmit()">
                  <span>{{ $t("user.create_account") }}</span>
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "RegisterPage",
  data() {
    return {
      v$: useValidate(),
      username: "",
      email: "",
      fullname: "",
      password: "",
      confirmpassword: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["status"]),
    showGlobalError() {
      if (status == "USER_EXISTS") {
        return true;
      }
      return false;
    },
  },
  validations() {
    return {
      username: {
        required,
      },
      email: {
        required,
        email,
      },
      fullname: {
        required,
      },
      password: {
        required,
        minLen: minLength(6),
      },
      confirmpassword: {
        sameAsPassword: sameAs(this.password),
      },
    };
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        const formData = {
          username: this.username,
          email: this.email,
          fullname: this.fullname,
          password: this.password,
        };
        console.log(formData);
        this.$store.dispatch("auth/register", formData);
      }
    },
  },
};
</script>

<style scoped>
.c-app:not(.c-legacy-theme):not(.c-dark-theme) .card {
  border: 1px solid #d8dee2;
}

h3 {
  margin-bottom: 0.4rem;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.5px;
}

.logo {
  width: 30%;
  margin-bottom: 0.2rem;
  margin-top: 0.3rem;
}

a {
  color: #e55353;
}

a:hover {
  color: #e55353;
  text-decoration: underline;
}

.btn:focus,
.btn-success:focus {
  box-shadow: none;
}

.btn-success:not(:disabled):not(.disabled):active:focus,
.btn-success:not(:disabled):not(.disabled).active:focus {
  box-shadow: none;
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

.help-block {
  visibility: hidden;
  width: 100%;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 80%;
  color: #e55353;
  font-style: italic;
}

.invalid {
  border-color: #e55353 !important;
}

.show {
  visibility: visible;
}
</style>
