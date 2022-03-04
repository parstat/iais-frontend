<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <span>{{ $t("referential.agents") }}</span>
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <span>
                <router-link
                  tag="a"
                  to="/metadata/referential/gsim/agent/add"
                  class="text-decoration-none text-primary"
                >
                  <CIcon name="cil-plus" />
                  <span class="icon-span">{{ $t("referential.add") }}</span>
                </router-link>
              </span>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <CCardText>
        <CForm v-if="owners">
          <label for="organization"
            ><span>{{ $t("referential.organization") }}*</span></label
          >
          <v-select
            label="name"
            :options="owners"
            v-model="owner"
            class="mb-3"
            :class="{ 'is-invalid': v$.owner.$error }"
            :placeholder="$t('referential.selection.organization')"
          ></v-select>
          <span class="text-danger" v-if="v$.owner.$error">{{
            $t("referential.validations.organization")
          }}</span>
        </CForm>
        <CForm v-if="maintainers">
          <label for="division"
            ><span>{{ $t("referential.division") }}*</span></label
          >
          <v-select
            label="name"
            :options="maintainers"
            v-model="maintainer"
            class="mb-3"
            :class="{ 'is-invalid': v$.maintainer.$error }"
            :placeholder="$t('referential.selection.division')"
          ></v-select>
          <span class="text-danger" v-if="v$.maintainer.$error">{{
            $t("referential.validations.division")
          }}</span>
        </CForm>
        <CForm v-if="contacts">
          <label for="contact"
            ><span>{{ $t("referential.contact_person") }}*</span></label
          >
          <v-select
            label="name"
            :options="contacts"
            v-model="contact"
            class="mb-3"
            :class="{ 'is-invalid': v$.contact.$error }"
            :placeholder="$t('referential.selection.contact_person')"
          ></v-select>
          <span class="text-danger" v-if="v$.contact.$error">{{
            $t("referential.validations.contact_person")
          }}</span>
        </CForm>
      </CCardText>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="back"
        :disabled="disabled"
        ><span>{{ $t("referential.back") }}</span></CButton
      >
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click.prevent="next"
        :disabled="disabled"
        ><span>{{ $t("referential.next") }}</span></CButton
      >
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import { Agent } from "@/common";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "AgentsAdd",
  data() {
    return {
      v$: useValidate(),
      owner: {
        name: "",
      },
      maintainer: {
        name: "",
      },
      contact: {
        name: "",
      },
      disabled: false,
      activeTab: 0,
    };
  },
  computed: {
    ...mapGetters("agent", ["owners", "maintainers", "contacts"]),
  },
  validations: {
    owner: {
      required,
    },
    maintainer: {
      required,
    },
    contact: {
      required,
    },
  },
  methods: {
    next() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const agents = {
          owner: this.owner,
          maintainer: this.maintainer,
          contact: this.contact,
        };
        this.$emit("next", agents);
        console.log(agents);
      }
    },
    back() {
      this.$emit("back");
    },
  },
  created() {
    this.$store.dispatch("agent/findByType", Agent.Organization);
    this.$store.dispatch("agent/findByType", Agent.Division);
    this.$store.dispatch("agent/findByType", Agent.Individual);
  },
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
</style>
