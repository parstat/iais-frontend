<template>
  <CCard>
    <CCardBody>
      <CCardTile>
        <CIcon name="cil-description" />
        <strong class="icon-header"
          >Process Documentation Basic Variables</strong
        >
      </CCardTile>
      <CCForm>
        <fieldset disabled>
          <div class="mb-3">
            <CFormLabel for="statisticalProgram"
              >Statistical Process</CFormLabel
            >
            <CFormInput
              id="statisticalProgram"
              :placeholder="processDocumentation.statisticalProgram.name"
            />
          </div>
          <div class="mb-3">
            <CFormLabel for="businessFunction">GSBPM Sub-phase*</CFormLabel>
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
          <CFormLabel for="description">Documentation description*</CFormLabel>
          <CFormTextarea
            rows="5"
            id="description"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': v$.processDocumentation.description.$error,
            }"
            placeholder="Survey description"
            v-model.trim="processDocumentation.description"
          />
        </div>
        <div class="mb-3">
          <CFormLabel for="frequency">Documentation description*</CFormLabel>
          <v-select
            label="frequency"
            :options="frequencies"
            v-model="processDocumentation.frequency"
            :class="{
              'is-invalid': v$.processDocumentation.frequency.$error,
            }"
            placeholder="Select a Frequency"
          ></v-select>
        </div>
        <div class="mb-3" v-if="businessFunctions">
          <CFormLabel for="nextBusinessFunction"
            >Next GSBPM Sub-phase</CFormLabel
          >
          <v-select
            label="name"
            :options="businessFunctions"
            v-model="processDocumentation.nextSubPhase"
            placeholder="Select a GSBPM sub-phase"
            :filtrable="false"
            @search="searchBusinessFunctions"
          >
            <template v-slot:no-options="{ search, searching }">
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
                    >{{ option.localId }} {{ option.name }} v.{{
                      option.version
                    }}</strong
                  >
                </span>
                <p>{{ $filters.truncateString(option.description) }}</p>
              </div>
            </template>
          </v-select>
        </div>
        <div class="form-mandatory">*Mandatory fields</div>
      </CCForm>
    </CCardBody>
    <CCardFooter>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click.prevent="handleSubmit()"
        :disabled="disabled"
      >
        Next
      </CButton>
    </CCardFooter>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Frequency } from "@/common";
import _ from "lodash";

export default {
  name: "ProcessDocumentationEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
      activeTab: 0,
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
      description: {
        required,
      },
      frequency: {
        required,
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
          nextSubPhase: this.processDocumentation.nextSubPhase.localId,
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
