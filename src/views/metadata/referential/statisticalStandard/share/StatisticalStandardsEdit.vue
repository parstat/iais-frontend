<template>
  <div class="card">
    <div class="card-header pt-0">
      <CIcon name="cil-description" />
      <strong class="icon-header">Statistical Standard</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/standard/add"
          class="card-header-action"
        >
          <CIcon name="cil-plus" /> Add
        </router-link>
      </div>
    </div>
    <div class="card-body">
      <div class="form-group" v-if="statisticalStandards">
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
        <span class="help-block">Please select statistical standards.</span>
      </div>
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="statisticalStandard of standards"
          :key="statisticalStandard.id"
        >
          <div class="card-header">
            <strong>{{ statisticalStandard.name }}</strong>
            <div class="card-header-actions">
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
              <span
                class="text-dark"
                @click="removeStatisticalStandard(statisticalStandard)"
              >
                <CIcon name="cil-trash" />
              </span>
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
        @click="$emit('next', fieldChanged)"
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
