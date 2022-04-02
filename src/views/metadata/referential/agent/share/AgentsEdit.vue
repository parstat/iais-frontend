<template>
  <CCard>
    <CCardHeader class="bg-white">
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <CIcon name="cil-user" />
            <span>&nbsp;{{ $t("referential.agents") }}</span>
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <router-link
                tag="a"
                to="/metadata/referential/gsim/agent/add"
                class="text-decoration-none text-primary"
              >
                <CIcon name="cil-plus" />
                <span class="icon-span">
                  {{ $t("referential.add") }}
                </span>
              </router-link>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody>
      <CCardText>
        <CForm class="mb-3" v-if="localSP">
          <CFormLabel for="description">
            <span>{{ $t("referential.organization") }}*</span>
          </CFormLabel>
          <v-select
            label="name"
            :options="owners"
            v-model="localSP.owner"
            @input="updateOwner"
          ></v-select>
        </CForm>
        <CForm class="mb-3" v-if="localSP">
          <CFormLabel for="description">
            <span>{{ $t("referential.division") }}*</span>
          </CFormLabel>
          <v-select
            label="name"
            :options="maintainers"
            v-model="localSP.maintainer"
            @input="updateMaintainer"
          ></v-select>
        </CForm>
        <CForm class="mb-3" v-if="localSP">
          <CFormLabel for="description">
            <span>{{ $t("referential.contact_person") }}*</span>
          </CFormLabel>
          <v-select
            label="name"
            :options="contacts"
            v-model="localSP.contact"
            @input="updateContact"
          ></v-select>
        </CForm>
      </CCardText>
    </CCardBody>
    <CCardFooter class="bg-white">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('back')"
        ><span>{{ $t("referential.back") }}</span>
      </CButton>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('next', fieldChanged)"
        ><span>{{ $t("referential.next") }}</span>
      </CButton>
    </CCardFooter>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { Agent } from "@/common";

export default {
  name: "AgentsEdit",
  props: {
    sp: {},
  },
  data() {
    return {
      v$: useValidate(),
      localSP: { ...this.sp },
    };
  },
  validations: {},
  computed: {
    ...mapGetters("agent", ["owners", "maintainers", "contacts"]),
  },
  methods: {
    updateOwner: function (owner) {
      if (typeof owner.id != "undefined") {
        const formData = {
          id: this.localSP.id,
          owner: owner.id,
        };
        this.$store.dispatch("statisticalProgram/updateOwner", formData);
        this.fieldChanged = true;
      }
    },
    updateMaintainer: function (maintainer) {
      if (typeof maintainer.id != "undefined") {
        const formData = {
          id: this.localSP.id,
          maintainer: maintainer.id,
        };
        this.$store.dispatch("statisticalProgram/updateMaintainer", formData);
        this.fieldChanged = true;
      }
    },
    updateContact: function (contact) {
      if (typeof contact.id != "undefined") {
        const formData = {
          id: this.localSP.id,
          contact: contact.id,
        };
        this.$store.dispatch("statisticalProgram/updateContact", formData);
        this.fieldChanged = true;
      }
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
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
