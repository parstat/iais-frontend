<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <text-icon />
          <strong class="icon-header">Process Documentation</strong>
          <p class="card-subtitle">
            (survey: {{ statisticalProgram ? statisticalProgram.name : "" }},
            sub-phase: {{ businessFunction ? businessFunction.localId : "" }}
            {{ businessFunction ? businessFunction.name : "" }})
          </p>
        </div>
        <div class="card-body">
          <CTabs
            variant="pills"
            :vertical="{ navs: 'col-md-3', content: 'col-md-9' }"
            :active-tab="activeTab"
            @update:activeTab="updateStep"
          >
            <CTab title="Basic">
              <div class="card">
                <header class="card-header">
                  <text-icon />
                  <strong class="icon-header"
                    >Process Documentation Basics</strong
                  >
                </header>
                <div class="card-body">
                  <div class="form-group" v-if="statisticalPrograms">
                    <label for="statisticalProgram">Statistical Process*</label>
                    <v-select
                      label="name"
                      :options="statisticalPrograms"
                      :value="statisticalProgram"
                      :class="{ 'is-invalid': $v.statisticalProgram.$error }"
                      placeholder="Select a Statistical Proccess"
                      :filtrable="false"
                      @search="searchStatisticalProrams"
                      @input="selectStatistialProgram"
                    >
                      <template v-slot:no-options="{ search, searching }">
                        <template v-if="searching">
                          No results found for <em>{{ search }}</em
                          >.
                        </template>
                        <em style="opacity: 0.5" v-else>
                          Start typing to search for a statistical program.
                        </em>
                      </template>
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          <span>
                            <strong
                              >{{ option.name }} {{ option.version }}</strong
                            >
                          </span>
                          <p>{{ option.description | subStr }}</p>
                        </div>
                      </template>
                    </v-select>
                    <span
                      class="help-block"
                      :class="{ show: $v.statisticalProgram.$error }"
                      >Please select a Statisitcal Process.</span
                    >
                  </div>
                  <div class="form-group" v-if="businessFunctions">
                    <label for="statisticalProgram">GSBPM Sub-phase*</label>
                    <v-select
                      label="name"
                      :options="businessFunctions"
                      :value="businessFunction"
                      :class="{ 'is-invalid': $v.businessFunction.$error }"
                      placeholder="Select a GSBPM sub-phase"
                      :filtrable="false"
                      @search="searchBusinessFunctions"
                      @input="selectBusinessFunction"
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
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          <span>
                            <strong
                              >{{ option.localId }} {{ option.name }} v{{
                                option.version
                              }}</strong
                            >
                          </span>
                          <p>{{ option.description | subStr }}</p>
                        </div>
                      </template>
                    </v-select>
                    <span
                      class="help-block"
                      :class="{ show: $v.businessFunction.$error }"
                      >Please select a GSBPM sub-phase.</span
                    >
                  </div>
                  <div class="form-group">
                    <label for="description">Documentation description*</label>
                    <textarea
                      rows="5"
                      id="description"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': $v.description.$error }"
                      placeholder="Survey description"
                      v-model.trim="description"
                    />
                    <span
                      class="help-block"
                      :class="{ show: $v.description.$error }"
                      >Please enter survey description.</span
                    >
                  </div>
                  <div class="form-group">
                    <label for="frequency">Frequency*</label>
                    <v-select
                      label="frequency"
                      :options="frequencies"
                      v-model="frequency"
                      :class="{ 'is-invalid': $v.frequency.$error }"
                      placeholder="Select a Frequence"
                    ></v-select>
                    <span
                      class="help-block"
                      :class="{ show: $v.frequency.$error }"
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
                      :class="{ 'is-invalid': $v.nextBusinessFunction.$error }"
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
                      <template slot="option" slot-scope="option">
                        <div class="d-center">
                          <span>
                            <strong
                              >{{ option.localId }} {{ option.name }} v{{
                                option.version
                              }}</strong
                            >
                          </span>
                          <p v-if="option.description">
                            {{ $filters.truncateString(option.description) }}
                          </p>
                        </div>
                      </template>
                    </v-select>
                    <span
                      class="help-block"
                      :class="{ show: $v.nextBusinessFunction.$error }"
                      >Please select the next GSBPM sub-phase.</span
                    >
                  </div>
                  <div>
                    <input type="checkbox" value="Last" v-model="lastProcess" />
                    Last process
                  </div>
                  <div class="form-mandatory">*Mandatory fields</div>
                </div>
                <div class="card-footer">
                  <CButton
                    color="primary"
                    shape="square"
                    size="sm"
                    style="margin-right: 0.3rem"
                    @click.prevent="handleSubmit()"
                    :disabled="disabled"
                    >Next
                  </CButton>
                </div>
              </div>
            </CTab>

            <CTab title="Divisions" disabled></CTab>
            <CTab title="Statistical Standards" disabled> </CTab>
            <CTab title="Process Methods" disabled></CTab>
            <CTab title="Business Services/Software" disabled> </CTab>
            <CTab title="Process Inputs" disabled> </CTab>
            <CTab title="Process Outputs" disabled> </CTab>
            <CTab title="Process Quality" disabled> </CTab>
            <CTab title="Process Comments/Notes" disabled> </CTab>
          </CTabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import { Frequency } from "@/common";
import _ from "lodash";

export default {
  name: "ProcessDocumentationAdd",
  data() {
    return {
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
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (this.$v.nextBusinessFunction.$invalid && this.lastProcess) {
        this.$v.nextBusinessFunction.$reset();
      }
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          statisticalProgram: this.statisticalProgram.id,
          businessFunction: this.businessFunction.id,
          local_id:
            this.statisticalProgram.localId +
            "-sub-phase-" +
            this.businessFunction.localId,
          frequency: this.frequency,
          nextSubPhase: this.nextBusinessFunction.localId,
        };
        this.$store.dispatch("processDocumentation/save", formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.statisticalProgram = "";
      this.businessFunction = "";
      this.$v.$reset();
    },

    searchStatisticalProrams(name, loading) {
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
    selectStatistialProgram(value) {
      this.$store.dispatch("statisticalProgram/findById", value.id);
    },
    selectBusinessFunction(value) {
      if (value) {
        this.$store.dispatch("businessFunction/findById", value.id);
      }
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
