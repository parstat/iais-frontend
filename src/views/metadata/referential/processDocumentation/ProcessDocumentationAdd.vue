<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardHeader class="bg-white">
          <CCardTitle>
            <CIcon name="cil-description" />

            Process Documentation
          </CCardTitle>
          <CCardSubtitle>
            (survey: {{ statisticalProgram ? statisticalProgram.name : "" }},
            sub-phase: {{ businessFunction ? businessFunction.localId : "" }}
            {{ businessFunction ? businessFunction.name : "" }})
          </CCardSubtitle>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <CRow>
              <CCol class="col-3 mr-2">
                <CNav class="flex-column" variant="pills" role="tab">
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" active>
                      Basic
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      Divisions
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      StatisticalStandards
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      Process Methods
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      Business Service/Software
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      Process Input
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      Process Output
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      Process Quality
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      Comments/Notes
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
                          <div class="form-group">
                            <label for="statisticalProgram"
                              >Statistical Process*</label
                            >
                            <v-select
                              label="name"
                              :options="statisticalPrograms"
                              v-model="statisticalProgram"
                              :class="{
                                'is-invalid': v$.statisticalProgram.$error,
                              }"
                              placeholder="Select a Statistical Proccess"
                              :filtrable="false"
                              @search="searchStatisticalPrograms"
                            >
                              <template
                                v-slot:no-options="{ search, searching }"
                              >
                                <template v-if="searching">
                                  No results found for <em>{{ search }}</em
                                  >.
                                </template>
                                <em style="opacity: 0.5" v-else>
                                  Start typing to search for a statistical
                                  program.
                                </em>
                              </template>
                              <template v-slot:content="option">
                                <div class="d-center">
                                  <span>
                                    <strong
                                      >{{ option.name }}
                                      {{ option.version }}</strong
                                    >
                                  </span>
                                  <p>
                                    {{
                                      $filters.truncateString(
                                        option.description
                                      )
                                    }}
                                  </p>
                                </div>
                              </template>
                            </v-select>
                            <span
                              class="text-danger"
                              v-if="v$.statisticalProgram.$error"
                              >Please select a Statisitcal Process.</span
                            >
                          </div>
                          <div class="form-group" v-if="businessFunctions">
                            <label for="statisticalProgram"
                              >GSBPM Sub-phase*</label
                            >
                            <v-select
                              label="name"
                              :options="businessFunctions"
                              v-model="businessFunction"
                              :class="{
                                'is-invalid': v$.businessFunction.$error,
                              }"
                              placeholder="Select a GSBPM sub-phase"
                              :filtrable="false"
                              @search="searchBusinessFunctions"
                            >
                              <template
                                v-slot:no-options="{ search, searching }"
                              >
                                <template v-if="searching">
                                  No results found for <em>{{ search }}</em
                                  >.
                                </template>
                                <em style="opacity: 0.5" v-else>
                                  Start typing to search for a GSBPM sub-phase.
                                </em>
                              </template>
                              <template v-slot:content="option">
                                <div class="d-center">
                                  <span>
                                    <strong
                                      >{{ option.localId }}
                                      {{ option.name }} v{{
                                        option.version
                                      }}</strong
                                    >
                                  </span>
                                  <p>
                                    {{
                                      $filters.truncateString(
                                        option.description
                                      )
                                    }}
                                  </p>
                                </div>
                              </template>
                            </v-select>
                            <span
                              class="text-danger"
                              v-if="v$.businessFunction.$error"
                              >Please select a GSBPM sub-phase.</span
                            >
                          </div>
                          <div class="form-group">
                            <CFormLabel for="name"
                              >Documentation name*</CFormLabel
                            >
                            <CFormInput
                              id="name"
                              placeholder="Documentation name"
                              class="form-control"
                              :class="{
                                'is-invalid': v$.name.$error,
                              }"
                              v-model="name"
                            />
                          </div>

                          <div class="form-group">
                            <label for="description"
                              >Documentation description*</label
                            >
                            <textarea
                              rows="5"
                              id="description"
                              type="text"
                              class="form-control"
                              :class="{ 'is-invalid': v$.description.$error }"
                              placeholder="Doumentation description"
                              v-model.trim="description"
                            />
                            <span
                              class="text-danger"
                              v-if="v$.description.$error"
                              >Please enter survey description.</span
                            >
                          </div>
                          <div class="form-group">
                            <label for="frequency">Frequency*</label>
                            <v-select
                              label="frequency"
                              :options="frequencies"
                              v-model="frequency"
                              :class="{ 'is-invalid': v$.frequency.$error }"
                              placeholder="Select a Frequence"
                            ></v-select>
                            <span class="text-danger" v-if="v$.frequency.$error"
                              >Please frequency a type.</span
                            >
                          </div>
                          <div class="form-group" v-if="businessFunctions">
                            <label for="nextBusinessFunction"
                              >Next GSBPM Sub-phase*</label
                            >
                            <v-select
                              label="name"
                              :options="businessFunctions"
                              v-model="nextBusinessFunction"
                              :class="{
                                'is-invalid': v$.nextBusinessFunction.$error,
                              }"
                              placeholder="Select a GSBPM sub-phase"
                              :filtrable="false"
                              @search="searchBusinessFunctions"
                            >
                              <template
                                v-slot:no-options="{ search, searching }"
                              >
                                <template v-if="searching">
                                  No results found for <em>{{ search }}</em
                                  >.
                                </template>
                                <em style="opacity: 0.5" v-else>
                                  Start typing to search for a GSBPM sub-phase.
                                </em>
                              </template>
                              <template v-slot:content="option">
                                <div class="d-center">
                                  <span>
                                    <strong
                                      >{{ option.localId }}
                                      {{ option.name }} v{{
                                        option.version
                                      }}</strong
                                    >
                                  </span>
                                  <p v-if="option.description">
                                    {{
                                      $filters.truncateString(
                                        option.description
                                      )
                                    }}
                                  </p>
                                </div>
                              </template>
                            </v-select>
                            <span
                              class="text-danger"
                              v-if="v$.nextBusinessFunction.$error"
                              >Please select the next GSBPM sub-phase.</span
                            >
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              value="Last"
                              v-model="lastProcess"
                            />
                            Last process
                          </div>
                          <div class="form-mandatory">*Mandatory fields</div>
                        </CCardText>

                        <CButton
                          color="primary"
                          size="sm"
                          style="margin-right: 0.3rem"
                          @click.prevent="handleSubmit()"
                          :disabled="disabled"
                          >Next
                        </CButton>
                      </CCardBody>
                    </CCard>
                  </CTabPane>
                </CTabContent>
              </CCol>
            </CRow>
          </CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { requiredIf } from "@vuelidate/validators";
import { Frequency } from "@/common";
import _ from "lodash";

export default {
  name: "ProcessDocumentationAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      frequency: "",
      disabled: false,
      activeTab: 0,
      nextBusinessFunction: "",
      lastProcess: false,
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", [
      "statisticalProgram",
      "statisticalPrograms",
    ]),
    ...mapGetters("businessFunction", [
      "businessFunction",
      "businessFunctions",
    ]),

    frequencies() {
      var frequencies = [];
      for (const key of Object.keys(Frequency)) {
        frequencies.push(Frequency[key]);
      }
      return frequencies;
    },
  },
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
    statisticalProgram: {
      required,
    },
    businessFunction: {
      required,
    },
    frequency: {
      required,
    },
    nextBusinessFunction: {
      requiredIf: requiredIf(function () {
        return !this.lastProcess;
      }),
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$validate(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          statisticalProgram: this.statisticalProgram.id,
          businessFunction: this.businessFunction.id,
          local_id: this.genLocalId(), //local id will be used also as order variable
          frequency: this.frequency,
          nextSubPhase: this.nextBusinessFunction
            ? this.nextBusinessFunction.localId
            : "",
        };
        this.$store.dispatch("processDocumentation/save", formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.statisticalProgram = "";
      this.businessFunction = "";
      this.v$.$reset();
    },

    searchStatisticalPrograms(name, loading) {
      loading(true);
      this.searchSP(name, loading, this);
    },

    searchSP: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("statisticalProgram/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),

    searchBusinessFunctions(name, loading) {
      loading(true);
      this.searchBF(name, loading, this);
    },

    searchBF: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("businessFunction/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),

    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
    updateStep(active) {
      this.activeTab = active;
    },
    genLocalId() {
      var today = new Date();
      var utcYear = String(today.getUTCFullYear());
      var utcMonth = String(today.getUTCMonth() + 1).padStart(2, "0");
      var utcDay = String(today.getUTCDate()).padStart(2, "0");
      var utcHour = String(today.getUTCHours()).padStart(2, "0");
      var utcMinutes = String(today.getUTCMinutes()).padStart(2, "0");
      var utcSeconds = String(today.getUTCSeconds()).padStart(2, "0");
      return (
        utcYear +
        utcMonth +
        utcDay +
        "T" +
        utcHour +
        ":" +
        utcMinutes +
        ":" +
        utcSeconds
      );
    },
  },
  created() {
    //this.$store.dispatch("legislativeReference/findAll");
    if (this.$route.query.program) {
      this.$store.dispatch(
        "statisticalProgram/findById",
        this.$route.query.program
      );
    }
    if (this.$route.query.business_function) {
      this.$store.dispatch(
        "businessFunction/findByLocalId",
        this.$route.query.business_function
      );
    }
  },
};
</script>

<style>
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
