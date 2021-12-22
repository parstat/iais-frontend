<template>
  <div class="card">
    <div class="card-header">
      <CIcon name="cil-description" />
      <strong class="icon-header">Statistical Standard</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/standard/add"
          class="card-header-action"
        >
          <CIcon name="cil-plus" />
          <span class="icon-span">Add</span>
        </router-link>
      </div>
    </div>
    <div class="card-body">
      <div class="form-group" v-if="statisticalStandards">
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
          <template slot="option" slot-scope="option">
            <div class="d-center">
              <span
                ><strong>{{ option.name }} {{ option.version }}</strong></span
              >
              <p>{{ $filters.truncateString(option.description) }}</p>
            </div>
          </template>
        </v-select>
        <span class="help-block">Please select statistical standards.</span>
      </div>
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="statisticalStandard of processDocumentation.standards"
          :key="statisticalStandard.id"
        >
          <div class="card-header">
            <div class="card-title">
              <strong>{{ statisticalStandard.name }}</strong>
              <div class="card-header-actions">
                <router-link
                  tag="a"
                  :to="{
                    name: 'StatisticalStandardView',
                    params: { id: statisticalStandard.id },
                  }"
                >
                  <CIcon name="cil-magnifying-glass" />
                </router-link>
                <span
                  v-on:click="removeStatisticalStandard(statisticalStandard)"
                >
                   <CIcon name="cil-trash" />
                </span>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ statisticalStandard.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
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
    </div>
  </div>
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
      const formData = {
        id: this.processDocumentation.id,
        standard: selectedStatisticalStandard.id,
      };
      this.$store.dispatch(
        "processDocumentation/addStatisticalStandard",
        formData
      );
    },
    removeStatisticalStandard(selectedStatisticalStandard) {
      const formData = {
        id: this.processDocumentation.id,
        standard: selectedStatisticalStandard.id,
      };
      this.$store.dispatch(
        "processDocumentation/removeStatisticalStandard",
        formData
      );
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
