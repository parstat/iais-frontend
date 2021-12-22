<template>
  <div class="card">
    <div class="card-header">
      <CIcon name="cil-description" />
      <strong class="icon-header">Process Documentation Basic Variables</strong>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label for="statisticalProgram">Statistical Process</label>
        <span class="card-slot">{{
          processDocumentation.statisticalProgram.name
        }}</span>
      </div>
      <div class="form-group">
        <label for="businessFunction">GSBPM Sub-phase*</label>
        <span class="card-slot">
          {{ processDocumentation.businessFunction.localId }} -
          {{ processDocumentation.businessFunction.name }}
        </span>
      </div>
      <div class="form-group">
        <label for="description">Documentation description*</label>
        <textarea
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
        <span
          class="help-block"
          :class="{ show: v$.processDocumentation.description.$error }"
          >Please enter survey description.</span
        >
      </div>
      <div class="form-group">
        <label for="frequency">Frequency*</label>
        <v-select
          label="frequency"
          :options="frequencies"
          v-model="processDocumentation.frequency"
          :class="{
            'is-invalid': v$.processDocumentation.frequency.$error,
          }"
          placeholder="Select a Frequence"
        ></v-select>
        <span
          class="help-block"
          :class="{ show: v$.processDocumentation.frequency.$error }"
          >Please frequency a type.</span
        >
      </div>
      <div class="form-group" v-if="businessFunctions">
        <label for="nextBusinessFunction">Next GSBPM Sub-phase</label>
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
        <span class="help-block">Please select the next GSBPM sub-phase.</span>
      </div>
      <div class="form-mandatory">*Mandatory fields</div>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click.prevent="handleSubmit()"
        :disabled="disabled"
      >
        Next
      </CButton>
    </div>
  </div>
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
