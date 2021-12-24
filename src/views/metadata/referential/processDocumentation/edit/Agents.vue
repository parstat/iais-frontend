<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <CIcon name="cil-user" />
            <strong> Agents </strong>
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <span>
                <router-link
                  tag="a"
                  to="/metadata/referential/gsim/agent/add"
                  class="card-header-action"
                >
                  <CIcon name="cil-plus" />
                  <span class="icon-span">Add</span>
                </router-link>
              </span>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <CCardText>
        <CForm v-if="maintainers">
          <div class="mb-3">
            <CFormLabel for="division">Division*</CFormLabel>
            <v-select
              label="name"
              :options="maintainers"
              @input="addMaintainer"
            ></v-select>
          </div>
          <CRow>
            <CCol
              class="col-lg-4 col-md-6 col-sm-12"
              v-for="maintainer of processDocumentation.maintainers"
              :key="maintainer.id"
            >
              <CCard class="card card-border bg-lighter mb-3 mr-3">
                <CCardHeader>
                  <CRow>
                    <CCol class="col-9">
                      <CCardTitle>
                        {{ maintainer.name }}
                      </CCardTitle>
                    </CCol>
                    <CCol class="col3">
                      <CNav class="justify-content-end">
                        <CNavItem>
                          <router-link
                            tag="a"
                            :to="{
                              name: 'AgentView',
                              params: { id: maintainer.id },
                            }"
                          >
                            <CIcon name="cil-magnifying-glass" />
                          </router-link>
                        </CNavItem>
                        <CNavItem v-on:click="removeMaintainer(maintainer)">
                          <CIcon name="cil-trash" />
                        </CNavItem>
                      </CNav>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <CCardText>
                    {{ maintainer.description }}
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CForm>
      </CCardText>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('back')"
      >
        Back
      </CButton>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('next')"
      >
        Next
      </CButton>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
//import { required } from "vuelidate/lib/validators";
import { Agent } from "@/common";

export default {
  name: "ProcessDocumentationAgentEdit",
  validations: {
    processDocumentation: {},
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("agent", ["maintainers"]),
  },
  created() {
    this.$store.dispatch("agent/findByType", Agent.Division);
  },
  methods: {
    addMaintainer(selectedMaintainer) {
      if (typeof selectedMaintainer.id != "undefined") {
        const formData = {
          id: this.processDocumentation.id,
          maintainer: selectedMaintainer.id,
        };
        this.$store.dispatch("processDocumentation/addMaintainer", formData);
      }
    },

    removeMaintainer(selectedMaintainer) {
      if (typeof selectedMaintainer.id != "undefined") {
        const formData = {
          id: this.processDocumentation.id,
          maintainer: selectedMaintainer.id,
        };
        this.$store.dispatch("processDocumentation/removeMaintainer", formData);
      }
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: none !important;
}
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.card-header {
  padding-top: 1rem;
}
</style>
