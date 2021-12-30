<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <CIcon name="cil-description" />
            Statistical Standard
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <span>
                <router-link
                  tag="a"
                  to="/metadata/referential/gsim/standard/add"
                  class="text-decoration-none text-primary"
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
        <CForm v-if="statisticalStandards">
          <label for="statisticalStandard">Statistical Standard</label>
          <v-select
            label="name"
            :options="statisticalStandards"
            placeholder="Select statistical standards"
            :filtrable="false"
            @search="searchStatisticalStandard"
            @input="addStatisticalStandard"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No results found for <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Start typing to search for a standard.</em
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
            v-for="statisticalStandard of processDocumentation.standards"
            :key="statisticalStandard.id"
          >
            <CCard class="card card-border bg-lighter mt-3 mb-3 mr-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    {{ statisticalStandard.name }}
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span
                          v-on:click="
                            removeStatisticalStandard(statisticalStandard)
                          "
                        >
                          <CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody>
                <CCardText>
                  {{ statisticalStandard.description }}
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardText>
      <CCardFooter class="bg-white">
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
      </CCardFooter>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "ProcessDocumentationStandardEdit",

  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("statisticalStandard", ["statisticalStandards"]),
  },
  methods: {
    searchStatisticalStandard(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("statisticalStandard/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),

    addStatisticalStandard(selectedStatisticalStandard) {
      if (typeof selectedStatisticalStandard.id != "undefined") {
        const formData = {
          id: this.processDocumentation.id,
          standard: selectedStatisticalStandard.id,
        };
        this.$store.dispatch(
          "processDocumentation/addStatisticalStandard",
          formData
        );
      }
    },
    removeStatisticalStandard(selectedStatisticalStandard) {
      if (typeof selectedStatisticalStandard.id != "undefined") {
        const formData = {
          id: this.processDocumentation.id,
          standard: selectedStatisticalStandard.id,
        };
        this.$store.dispatch(
          "processDocumentation/removeStatisticalStandard",
          formData
        );
      }
    },
  },
  created() {
    //this.$store.dispatch("statisticalStandard/findAll");
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
  padding-top: 0rem;
}
.card-header {
  padding-top: 1rem;
}
</style>
