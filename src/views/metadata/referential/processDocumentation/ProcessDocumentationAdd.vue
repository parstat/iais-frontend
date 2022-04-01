<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardHeader class="bg-white">
          <CCardTitle>
            <CIcon name="cil-description" />
            <span>&nbsp;{{ $t("referential.process_documentation") }}</span>
          </CCardTitle>
          <CCardSubtitle>
            <span>
              ({{ $t("referential.survey") }}:
              {{ statisticalProgram ? statisticalProgram.name : "" }},
              {{ $t("referential.sub_phase") }}:
              {{ businessFunction ? businessFunction.localId : "" }}
              {{ businessFunction ? businessFunction.name : "" }})
            </span>
          </CCardSubtitle>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <CRow>
              <CCol class="col-3 mr-2">
                <CNav class="flex-column" variant="pills" role="tab">
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" active>
                      <span>{{ $t("referential.basic") }}</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      <span>{{ $t("referential.divisions") }}</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      <span>{{ $t("referential.statistical_standards") }}</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      <span>{{
                        $t("referential.process_methods_header")
                      }}</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      <span>{{
                        $t("referential.business_service/software")
                      }}</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      <span>{{ $t("referential.process_input") }}</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      <span>{{ $t("referential.process_output") }}</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      <span>{{ $t("referential.process_quality") }}</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" disabled>
                      <span>{{ $t("referential.comments/notes") }}</span>
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
                            <CFormLabel for="statisticalProgram">
                              <span
                                >{{
                                  $t("referential.statistical_process")
                                }}*</span
                              >
                            </CFormLabel>
                            <v-select
                              label="name"
                              :options="statisticalPrograms"
                              v-model="statisticalProgram"
                              :class="{
                                'is-invalid': v$.statisticalProgram.$error,
                              }"
                              :placeholder="
                                $t('referential.selection.statistical_process')
                              "
                              :filtrable="false"
                              @search="searchStatisticalPrograms"
                              class="mb-3"
                            >
                              <template
                                v-slot:no-options="{ search, searching }"
                              >
                                <template v-if="searching">
                                  <span
                                    >{{
                                      $t("referential.no_found")
                                    }}&nbsp;</span
                                  >
                                  <em>{{ search }}</em
                                  >.
                                </template>
                                <em style="opacity: 0.5" v-else>
                                  <span>{{
                                    $t(
                                      "referential.search_for_statistical_process"
                                    )
                                  }}</span>
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
                            >
                              {{
                                $t(
                                  "referential.validations.statistical_process"
                                )
                              }}
                            </span>
                          </CForm>
                          <CForm v-if="businessFunctions">
                            <CFormLabel for="statisticalProgram">
                              <span
                                >{{ $t("referential.GSBPM_sub_phase") }}*</span
                              >
                            </CFormLabel>
                            <v-select
                              label="name"
                              :options="businessFunctions"
                              v-model="businessFunction"
                              :class="{
                                'is-invalid': v$.businessFunction.$error,
                              }"
                              :placeholder="
                                $t('referential.selection.GSBPM_sub_phase')
                              "
                              :filtrable="false"
                              @search="searchBusinessFunctions"
                              class="mb-3"
                            >
                              <template
                                v-slot:no-options="{ search, searching }"
                              >
                                <template v-if="searching">
                                  <span
                                    >{{
                                      $t("referential.no_found")
                                    }}&nbsp;</span
                                  >
                                  <em>{{ search }}</em
                                  >.
                                </template>
                                <em style="opacity: 0.5" v-else>
                                  <span>{{
                                    $t("referential.search_for_GSBPM_sub_phase")
                                  }}</span>
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
                            >
                              {{
                                $t("referential.validations.GSBPM_sub_phase")
                              }}
                            </span>
                          </CForm>
                          <CForm class="mb-3">
                            <CFormLabel for="name">
                              <span
                                >{{
                                  $t("referential.documentation_name")
                                }}*</span
                              >
                            </CFormLabel>
                            <CFormInput
                              id="name"
                              :placeholder="
                                $t('referential.documentation_name')
                              "
                              class="form-control"
                              :class="{
                                'is-invalid': v$.name.$error,
                              }"
                              v-model="name"
                            />
                          </CForm>

                          <CForm class="mb-3">
                            <CFormLabel for="description">
                              <span
                                >{{
                                  $t("referential.documentation_description")
                                }}*</span
                              >
                            </CFormLabel>
                            <textarea
                              rows="5"
                              id="description"
                              type="text"
                              class="form-control"
                              :class="{ 'is-invalid': v$.description.$error }"
                              :placeholder="
                                $t('referential.documentation_description')
                              "
                              v-model.trim="description"
                            />
                            <span
                              class="text-danger"
                              v-if="v$.description.$error"
                            >
                              {{
                                $t("referential.validations.survey_description")
                              }}
                            </span>
                          </CForm>
                          <CForm class="mb-3">
                            <CFormLabel for="frequency">
                              <span>{{ $t("referential.frequency") }}*</span>
                            </CFormLabel>
                            <v-select
                              label="frequency"
                              :options="frequencies"
                              v-model="frequency"
                              :class="{ 'is-invalid': v$.frequency.$error }"
                              :placeholder="
                                $t('referential.selection.frequency')
                              "
                            ></v-select>
                            <span
                              class="text-danger"
                              v-if="v$.frequency.$error"
                            >
                              {{ $t("referential.validations.frequency") }}
                            </span>
                          </CForm>
                          <CForm class="mb-3" v-if="businessFunctions">
                            <CFormLabel for="nextBusinessFunction">
                              <span
                                >{{
                                  $t("referential.next_GSBPM_sub_phase")
                                }}*</span
                              >
                            </CFormLabel>
                            <v-select
                              label="name"
                              :options="businessFunctions"
                              v-model="nextBusinessFunction"
                              :class="{
                                'is-invalid': v$.nextBusinessFunction.$error,
                              }"
                              :placeholder="
                                $t('referential.selection.GSBPM_sub_phase')
                              "
                              :filtrable="false"
                              @search="searchBusinessFunctions"
                              class="mb-3"
                            >
                              <template
                                v-slot:no-options="{ search, searching }"
                              >
                                <template v-if="searching">
                                  <span
                                    >{{
                                      $t("referential.no_found")
                                    }}&nbsp;</span
                                  >
                                  <em>{{ search }}</em
                                  >.
                                </template>
                                <em style="opacity: 0.5" v-else>
                                  <span>{{
                                    $t("referential.search_for_GSBPM_sub_phase")
                                  }}</span>
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
                            >
                              {{
                                $t(
                                  "referential.validations.next_GSBPM_sub_phase"
                                )
                              }}
                            </span>
                          </CForm>
                          <div>
                            <CFormSwitch
                              :label="$t('referential.last_process')"
                              id="lastProcess"
                              size="lg"
                              class="mb-3"
                              v-model="lastProcess"
                            />
                          </div>
                          <div class="form-mandatory">
                            <span
                              >*{{ $t("referential.mandatory_fields") }}</span
                            >
                          </div>
                        </CCardText>

                        <CButton
                          color="primary"
                          size="sm"
                          style="margin-right: 0.3rem"
                          @click.prevent="handleSubmit()"
                          :disabled="disabled"
                          ><span>{{ $t("referential.next") }}</span>
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
