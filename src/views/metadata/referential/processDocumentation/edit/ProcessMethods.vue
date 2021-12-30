<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <CIcon name="cil-description" />
            Process Methods
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <span>
                <router-link
                  tag="a"
                  to="/metadata/referential/gsim/method/add"
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
        <CForm v-if="processMethods">
          <label for="processMethod">Process Method</label>
          <v-select
            label="name"
            :options="processMethods"
            placeholder="Select a process method"
            :filtrable="false"
            @search="searchProcessMethod"
            @input="addProcessMethod"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No results found for <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Start typing to search for a method.</em
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
            v-for="processMethod of processDocumentation.processMethods"
            :key="processMethod.id"
          >
            <CCard class="card card-border bg-lighter mt-3 mb-3 mr-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    {{ processMethod.name }}
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span v-on:click="removeProcessMethod(processMethod)">
                          <CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody>
                <CCardText>{{ processMethod.description }}</CCardText>
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
  name: "ProcessDocumentationMethodsEdit",

  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("processMethod", ["processMethods"]),
  },
  methods: {
    searchProcessMethod(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("processMethod/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),

    addProcessMethod(selectedProcessMethod) {
      if (typeof selectedProcessMethod.id != "undefined") {
        const formData = {
          id: this.processDocumentation.id,
          method: selectedProcessMethod.id,
        };
        this.$store.dispatch("processDocumentation/addProcessMethod", formData);
      }
    },
    removeProcessMethod(selectedProcessMethod) {
      if (typeof selectedProcessMethod.id != "undefined") {
        const formData = {
          id: this.processDocumentation.id,
          method: selectedProcessMethod.id,
        };
        this.$store.dispatch(
          "processDocumentation/removeProcessMethod",
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
