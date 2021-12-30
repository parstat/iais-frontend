<template>
  <CCard>
    <CCardHeader class="bg-white">
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
              <router-link
                tag="a"
                to="/metadata/referential/gsim/standard/add"
                class="text-decoration-none text-primary"
              >
                <CIcon name="cil-plus" /> Add
              </router-link>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody>
      <CCardText>
        <div class="form-group mb-3" v-if="statisticalStandards">
          <label for="statisticalStandard">Statistical Standard</label>
          <v-select
            label="name"
            :options="statisticalStandards"
            placeholder="Search statistical standards"
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
                <p v-if="option.description">
                  {{ $filters.truncateString(option.description) }}
                </p>
              </div>
            </template>
          </v-select>
        </div>
        <CRow>
          <CCol
            class="col-lg-4 col-md-6 col-sm-12"
            v-for="statisticalStandard of standards"
            :key="statisticalStandard.id"
          >
            <CCard class="card-border bg-lighter mb-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    <CCardTitle component="h6">
                      {{ statisticalStandard.name }}
                    </CCardTitle>
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <router-link
                          tag="a"
                          class="text-dark pr-1"
                          :to="{
                            name: 'StatisticalStandardView',
                            params: { id: statisticalStandard.id },
                          }"
                        >
                          <CIcon name="cil-magnifying-glass" />
                        </router-link>
                      </CNavItem>
                      <CNavItem>
                        <span
                          class="text-dark"
                          @click="
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
                <p class="card-text">{{ statisticalStandard.description }}</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardText>
    </CCardBody>
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
        @click="$emit('next', fieldChanged)"
      >
        Next
      </CButton>
    </CCardFooter>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "StatisticalStandardsEdit",
  props: ["standards"],
  data() {
    return {
      fieldChanged: false,
    };
  },
  computed: {
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
        this.$emit("addStatisticalStandard", selectedStatisticalStandard);
        this.fieldChanged = true;
      }
    },
    removeStatisticalStandard(selectedStatisticalStandard) {
      if (typeof selectedStatisticalStandard.id != "undefined") {
        this.$emit("removeStatisticalStandard", selectedStatisticalStandard);
        this.fieldChanged = true;
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
</style>
