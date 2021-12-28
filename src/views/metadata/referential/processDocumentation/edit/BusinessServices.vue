<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <CIcon name="cil-description" />
            <strong> Business Services</strong>
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <span>
                <router-link
                  tag="a"
                  to="/metadata/referential/gsim/service/add"
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
        <CForm>
          <label for="businessService">Business Service</label>
          <v-select
            label="name"
            :options="businessServices"
            placeholder="Select a business service (software)"
            :filtrable="false"
            @search="searchBusinessService"
            @input="addBusinessService"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No results found for <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Start typing to search for a service.</em
              >
            </template>
            <template v-slot:content="option">
              <div class="d-center">
                <span
                  ><strong>{{ option.name }} {{ option.version }}</strong></span
                >
                <p>{{ $filters.truncateString(option.description) }}</p>
              </div>
            </template>
          </v-select>
        </CForm>
        <CRow>
          <CCol
            class="col-md-4 mb-3"
            v-for="businessService of processDocumentation.businessServices"
            :key="businessService.id"
          >
            <CCard class="card card-border bg-lighter mt-3 mb-3 mr-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    {{ businessService.name }}
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span
                          v-on:click="removeBusinessService(businessService)"
                        >
                          <CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CCardText>{{ businessService.description }}</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
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
      </CCardText>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "ProcessDocumentationServicesEdit",

  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("businessService", ["businessServices"]),
  },
  methods: {
    searchBusinessService(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("businessService/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),

    addBusinessService(selectedBusinessService) {
      if (typeof selectedBusinessService.id != "undefined") {
        const formData = {
          id: this.processDocumentation.id,
          service: selectedBusinessService.id,
        };
        this.$store.dispatch(
          "processDocumentation/addBusinessService",
          formData
        );
      }
    },
    removeBusinessService(selectedBusinessService) {
      if (typeof selectedBusinessService.id != "undefined") {
        const formData = {
          id: this.processDocumentation.id,
          service: selectedBusinessService.id,
        };
        this.$store.dispatch(
          "processDocumentation/removeBusinessService",
          formData
        );
      }
    },
  },
  created() {},
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
