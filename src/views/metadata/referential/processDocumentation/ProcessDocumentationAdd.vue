<template>
  <div class="row">
    <div class="col-12">
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
              <strong class="icon-header">Process Documentation</strong>
            </header>
            <div class="card-body">
              <div class="form-group" v-if="statisticalPrograms">
                <label for="statisticalProgram">Statistical Process*</label>
                <v-select
                  label="name"
                  :options="statisticalPrograms"
                  v-model="statisticalProgram"
                  :class="{ 'is-invalid': $v.statisticalProgram.$error }"
                  placeholder="Select a Statistical Proccess"
                  :filtrable="false"
                  @search="searchStatisticalProrams"
                >
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No results found for <em>{{ search }}</em
                      >.
                    </template>
                    <em style="opacity: 0.5;" v-else>
                      Start typing to search for a statistical program.
                    </em>
                  </template>
                  <template slot="option" slot-scope="option">
                    <div class="d-center">
                      <span>
                        <strong>{{ option.name }} {{ option.version }}</strong>
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
                <label for="statisticalProgram">Business Function*</label>
                <v-select
                  label="name"
                  :options="businessFunctions"
                  v-model="businessFunction"
                  :class="{ 'is-invalid': $v.businessFunction.$error }"
                  placeholder="Select an organization"
                  :filtrable="false"
                  @search="searchBusinessFunctions"
                >
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      No results found for <em>{{ search }}</em
                      >.
                    </template>
                    <em style="opacity: 0.5;" v-else>
                      Start typing to search for a GSBPM sub-phase.
                    </em>
                  </template>
                  <template slot="option" slot-scope="option">
                    <div class="d-center">
                      <span>
                        <strong>{{ option.name }} {{ option.version }}</strong>
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
                <label for="name">Documentation name*</label>
                <input
                  id="name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': $v.name.$error }"
                  placeholder="Survey name"
                  v-model.trim="name"
                />
                <span class="help-block" :class="{ show: $v.name.$error }"
                  >Please enter survey name.</span
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
              <div class="form-mandatory">*Mandatory fields</div>
            </div>
            <div class="card-footer"></div>
          </div>
          <CButton
            color="primary"
            shape="pill"
            size="sm"
            style="margin-right:0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Next</CButton
          >
        </CTab>

        <CTab title="Division" disabled></CTab>
        <CTab title="Statistical Standards" disabled> </CTab>
        <CTab title="Documents" disabled> </CTab>
        <CTab title="Inputs" disabled> </CTab>
        <CTab title="Outputs" disabled> </CTab>
        <CTab title="Quality" disabled> </CTab>
      </CTabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import _ from "lodash";

export default {
  name: "ProcessDocumentationAdd",
  data() {
    return {
      name: "",
      description: "",
      //statisticalProgram: "",
      //businessFunction: "",
      activeTab: 0
    };
  },

  filters: {
    subStr: function(string) {
      if (string.length > 55) {
        return string.substring(0, 65) + "...";
      }
      return string;
    }
  },
  computed: {
    ...mapGetters("statisticalProgram", [
      "statisticalProgram",
      "statisticalPrograms"
    ]),
    ...mapGetters("businessFunction", ["businessFunction", "businessFunctions"])
  },
  validations: {
    name: {
      required
    },
    description: {
      required
    },
    statisticalProgram: {
      required
    },
    businessFunction: {
      required
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          statisticalProgram: this.statisticalProgram.id,
          businessFunction: this.businessFunction.id
        };
        this.$store.dispatch("processDocumentation/save", formData);
        console.log(formData);
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
    }
  },
  created() {
    //this.$store.dispatch("legislativeReference/findAll");
    if (this.$route.query.program) {
      this.$store.dispatch(
        "statisticalProgram/findById",
        this.$route.query.program
      );
    }
    if (this.$route.query.function) {
      this.$store.dispatch(
        "businessFunction/findById",
        this.$route.query.function
      );
    }
  }
};
</script>
