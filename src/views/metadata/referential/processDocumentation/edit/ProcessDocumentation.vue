<template>
  <CCard>
    <CCardBody>
      <CCardTitle>
        <CIcon name="cil-description" />
        <span
          >&nbsp;{{
            $t("referential.process_documentation_basic_variables")
          }}</span
        >
      </CCardTitle>
      <CCardText>
        <CForm>
          <fieldset disabled>
            <div class="mb-3">
              <CFormLabel for="statisticalProgram">
                <span>{{ $t("referential.statistical_process") }}</span>
              </CFormLabel>
              <CFormInput
                id="statisticalProgram"
                :placeholder="processDocumentation.statisticalProgram.name"
              />
            </div>
            <div class="mb-3">
              <CFormLabel for="businessFunction">
                <span>{{ $t("referential.GSBPM_sub_phase") }}*</span>
              </CFormLabel>
              <CFormInput
                id="businessFunction"
                :placeholder="
                  processDocumentation.businessFunction.localId +
                  ' - ' +
                  processDocumentation.businessFunction.name
                "
              />
            </div>
          </fieldset>
          <div class="mb-3">
            <CFormLabel for="name">
              <span>{{ $t("referential.documentation_name") }}*</span>
            </CFormLabel>
            <CFormInput
              id="name"
              :placeholder="$t('referential.documentation_name')"
              class="form-control"
              :class="{
                'is-invalid': v$.processDocumentation.name.$error,
              }"
              v-model="processDocumentation.name"
            />
          </div>
          <div class="mb-3">
            <CFormLabel for="description">
              <span>{{ $t("referential.documentation_description") }}*</span>
            </CFormLabel>
            <CFormTextarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': v$.processDocumentation.description.$error,
              }"
              :placeholder="$t('referential.documentation_description')"
              v-model.trim="processDocumentation.description"
            />
          </div>
          <div class="mb-3">
            <CFormLabel for="frequency">
              <span>{{ $t("referential.frequency") }}*</span>
            </CFormLabel>
            <v-select
              label="frequency"
              :options="frequencies"
              v-model="processDocumentation.frequency"
              :class="{
                'is-invalid': v$.processDocumentation.frequency.$error,
              }"
              required
              :placeholder="$t('referential.selection.frequency')"
            ></v-select>
            <span
              class="text-danger"
              v-if="v$.processDocumentation.frequency.$error"
            >
              {{ $t("referential.validations.frequency") }}
            </span>
          </div>
          <div class="mb-3" v-if="businessFunctions">
            <CFormLabel for="nextBusinessFunction">
              <span>{{ $t("referential.next_GSBPM_sub_phase") }}*</span>
            </CFormLabel>
            <v-select
              label="name"
              :options="businessFunctions"
              v-model="processDocumentation.nextSubPhase"
              :placeholder="$t('referential.selection.GSBPM_sub_phase')"
              :filterable="false"
              @search="searchBusinessFunctions"
              :class="{
                'is-invalid': v$.processDocumentation.nextSubPhase.$error,
              }"
              class="mb-3"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  <span>{{ $t("referential.no_found") }}&nbsp;</span>
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
                      >{{ option.localId }} {{ option.name }} v.{{
                        option.version
                      }}</strong
                    >
                  </span>
                  <p>{{ $filters.truncateString(option.description) }}</p>
                </div>
              </template>
            </v-select>
            <span
              class="text-danger mb-3"
              v-if="v$.processDocumentation.nextSubPhase.$error"
            >
              {{ $t("referential.validations.next_GSBPM_sub_phase") }}
            </span>
            <div>
              <CFormSwitch
                :label="$t('referential.last_process')"
                id="lastProcess"
                size="lg"
                class="mb-3"
                v-model="lastProcess"
              />
            </div>
          </div>
          <div class="form-mandatory">
            <span>*{{ $t("referential.mandatory_fields") }}</span>
          </div>
        </CForm>
      </CCardText>
      <CCardFooter class="bg-white">
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click.prevent="handleSubmit()"
          :disabled="disabled"
          ><span>{{ $t("referential.next") }}</span>
        </CButton>
      </CCardFooter>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { requiredIf } from "@vuelidate/validators";
import { Frequency } from "@/common";
import _ from "lodash";

export default {
  name: "ProcessDocumentationEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
      activeTab: 0,
      lastProcess: false,
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("businessFunction", ["businessFunctions"]),

    frequencies() {
      var frequencies = [];
      for (const key of Object.keys(Frequency)) {
        frequencies.push(Frequency[key]);
      }
      return frequencies;
    },
  },
  validations: {
    processDocumentation: {
      name: {
        required,
      },
      description: {
        required,
      },
      frequency: {
        required,
      },
      nextSubPhase: {
        requiredIf: requiredIf(function () {
          return !this.lastProcess;
        }),
      },
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.processDocumentation.id,
          name: this.processDocumentation.name,
          description: this.processDocumentation.description,
          frequency: this.processDocumentation.frequency,
          nextSubPhase: this.processDocumentation.nextSubPhase
            ? this.processDocumentation.nextSubPhase.localId
            : "",
        };
        this.$store
          .dispatch("processDocumentation/update", formData)
          .then(() => {
            this.$emit("next");
          });
      }
    },

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

    setNextBusinessFunction(value) {
      this.nextBusinessFunction = value;
    },
  },
  created() {},
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
.card-header {
  padding-top: 0rem;
}
</style>
