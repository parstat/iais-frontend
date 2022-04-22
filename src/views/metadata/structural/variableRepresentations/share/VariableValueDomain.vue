<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CRow>
          <CCol class="col-9">
            <CCardTitle>
              <span>Represented Variable</span>
            </CCardTitle>
          </CCol>
          <CCol class="col-3">
            <!-- <CNav class="justify-content-end">
              <CNavItem>
                <router-link
                  tag="a"
                  :to="{
                    name: 'VariableRepresentationsAdd',
                    params: { id: variable?.id ?? '11' },
                  }"
                  class="text-decoration-none text-primary"
                >
                  <CIcon name="cil-plus" />
                  <span class="icon-span">
                    Add new Variable Representation
                  </span>
                </router-link>
              </CNavItem>
            </CNav> -->
          </CCol>
        </CRow>
        <CForm>
          <CFormLabel for="valueDomain">
            <span>Value Domain{{ isRequired ? "*" : "" }}</span>
          </CFormLabel>
          <v-select
            v-if="valueDomains?.length"
            id="valueDomain"
            class="mb-3"
            label="name"
            :options="valueDomains"
            v-model="selectedDomain"
          >
          </v-select>
          <span class="text-danger" v-if="v$.selectedDomain?.$error">
            <span>Please select a value domain</span>
          </span>
        </CForm>
      </CCardText>
      <CButton
        size="sm"
        style="margin-right: 0.3rem"
        @click="previous"
        :disabled="disabled"
        ><span>Previous</span>
      </CButton>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="next"
        :disabled="disabled"
        ><span>{{
          isLast ? $t("referential.finish") : $t("referential.next")
        }}</span>
      </CButton>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
// import { Context } from "@/common";

export default {
  name: "VariableValueDomain",
  props: ["isEdit", "isRequired", "isLast", "domain"],

  data() {
    return {
      v$: useValidate(),
      selectedDomain: this.domain ?? "",
      disabled: false,
    };
  },
  validations() {
    if (this.isRequired) {
      return {
        selectedDomain: {
          required,
        },
      };
    }
  },
  methods: {
    next() {
      this.v$.$touch();
      if (this.$route.params.id && !this.v$.$invalid) {
        this.disabled = true; //disable buttons
        this.$emit("next", this.selectedDomain);
        this.disabled = this.isLast || false;
      }
    },
    previous() {
      this.$emit("previous");
    },
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("valueDomain", ["valueDomains"]),
  },
  created() {
    this.$store.dispatch("valueDomain/findAll");
  },
};
</script>
