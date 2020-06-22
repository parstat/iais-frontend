<template>
  <div class="card card-plain">
    <header class="card-header pt-0">
      <regulation-icon />
      <strong class="icon-header">Statistical Standard</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/standard/add"
          class="card-header-action"
        >
          <add-icon />
          <span class="icon-span">Add</span>
        </router-link>
      </div>
    </header>
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
            <em style="opacity: 0.5;" v-else
              >Start typing to search for a standard.</em
            >
          </template>
          <template slot="option" slot-scope="option">
            <div class="d-center">
              <span
                ><strong>{{ option.name }} {{ option.version }}</strong></span
              >
              <p>{{ option.description | subStr }}</p>
            </div>
          </template>
        </v-select>
        <span class="help-block">Please select statistical standards.</span>
      </div>
      <div class="card-columns">
        <div
          class="card card-no-shadow bg-light mb-3"
          v-for="statisticalStandard of statisticalProgram.statisticalStandards"
          :key="statisticalStandard.id"
        >
          <div class="card-header">
            <strong>{{ statisticalStandard.name }}</strong>
            <div class="card-header-actions">
              <router-link
                tag="a"
                :to="{
                  name: 'StatisticalStandardView',
                  params: { id: statisticalStandard.id }
                }"
              >
                <view-icon />
              </router-link>
              <span v-on:click="removeStatisticalStandard(statisticalStandard)">
                <delete-icon />
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
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
        @click="$emit('back')"
      >
        Back
      </CButton>
      <CButton
        color="primary"
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
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
  name: "StatisticalProgramEdit",

  data() {
    return {
      disabled: false
    };
  },
  filters: {
    subStr: function(string) {
      if (string.length > 55) {
        return string.substring(0, 55) + "...";
      }
      return string;
    }
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("statisticalStandard", ["statisticalStandards"])
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
        id: this.statisticalProgram.id,
        standard: selectedStatisticalStandard.id
      };
      this.$store.dispatch(
        "statisticalProgram/addStatisticalStandard",
        formData
      );
    },
    removeStatisticalStandard(selectedStatisticalStandard) {
      const formData = {
        id: this.statisticalProgram.id,
        standard: selectedStatisticalStandard.id
      };
      this.$store.dispatch(
        "statisticalProgram/removeStatisticalStandard",
        formData
      );
    }
  },
  created() {
    //this.$store.dispatch("statisticalStandard/findAll");
  }
};
</script>

<style scoped>
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
.card-no-shadow {
  box-shadow: none !important;
  border: 1px solid #d8dbe0 !important;
}
.card-columns {
  column-count: 2;
}
</style>
