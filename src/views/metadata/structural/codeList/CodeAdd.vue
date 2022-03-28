<template>
  <CRow class="col-12">
    <CCard>
      <CCardHeader class="bg-white">
        <span>Code</span>
      </CCardHeader>
      <CCardBody>
        <CCardText>
          <CRow>
            <CCol class="col-3 mr-2">
              <CNav class="flex-column" variant="pills" role="tab">
                <CNavItem>
                  <CNavLink href="javascript:void(0);" active>
                    <span>Basic</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="javascript:void(0);" disabled>
                    <span>Code Items</span>
                  </CNavLink>
                </CNavItem>
              </CNav>
            </CCol>

            <CCol class="col-9">
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="true"
                >
                  <CCard>
                    <CCardBody>
                      <CCardText>
                        <CForm>
                          <label for="name">Name*</label>
                          <input
                            id="name"
                            type="text"
                            class="form-control"
                            :class="{
                              'is-invalid': v$.name.$error,
                              'mb-3': !v$.name.$error,
                            }"
                            placeholder="Unit type name"
                            v-model.trim="name"
                          />
                          <div class="text-danger mb-3" v-if="v$.name.$error">
                            Please enter a name for the code.
                          </div>
                        </CForm>
                        <CForm>
                          <label for="description">Description*</label>
                          <textarea
                            rows="5"
                            id="description"
                            type="text"
                            class="form-control"
                            :class="{
                              'is-invalid': v$.description.$error,
                              'mb-3': !v$.description.$error,
                            }"
                            placeholder="Unit type description"
                            v-model.trim="description"
                          />
                          <div
                            class="text-danger mb-3"
                            v-if="v$.description.$error"
                          >
                            Please enter a description.
                          </div>
                        </CForm>
                        <CForm>
                          <label for="name">Language*</label>
                          <input
                            id="name"
                            type="text"
                            class="form-control"
                            :class="{
                              'is-invalid': v$.language.$error,
                              'mb-3': !v$.language.$error,
                            }"
                            placeholder="Unit type name"
                            v-model.trim="language"
                          />
                          <div
                            class="text-danger mb-3"
                            v-if="v$.language.$error"
                          >
                            Please enter a language.
                          </div>
                        </CForm>
                        <CForm>
                          <label for="localId">Local id*</label>
                          <input
                            id="localId"
                            type="text"
                            class="form-control"
                            :class="{
                              'is-invalid': v$.localId.$error,
                              'mb-3': !v$.localId.$error,
                            }"
                            placeholder="Local id"
                            v-model.trim="localId"
                          />
                          <div
                            class="text-danger mb-3"
                            v-if="v$.localId.$error"
                          >
                            Please specify the local id.
                          </div>
                        </CForm>
                        <div class="form-mandatory">
                          <span>*Mandatory fields</span>
                        </div>
                      </CCardText>
                    </CCardBody>
                    <CCardFooter class="bg-white">
                      <CButton
                        color="primary"
                        size="sm"
                        style="margin-right: 0.3rem"
                        @click.prevent="handleSubmit()"
                        :disabled="disabled"
                        ><span>Next</span>
                      </CButton>
                    </CCardFooter>
                  </CCard>
                </CTabPane>
              </CTabContent>
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
    </CCard>
  </CRow>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "CodeAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      language: "",
      localId: "",
      disabled: false,
    };
  },
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
    language: {
      required,
    },
    localId: {
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          language: this.language,
          localId: this.localId,
        };
        this.$store.dispatch("code/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.form.name = "";
      this.form.description = "";
      this.form.language = "";
      this.form.localId = "";
      this.v$.$reset();
    },
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: uppercase;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  border-left-width: 4px;
  border-left-style: solid;
  background-color: #f8f8f8;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-left-color: #321fdb;
  color: #321fdb;
  border-radius: unset;
  padding-left: 0.8rem;
}
</style>
