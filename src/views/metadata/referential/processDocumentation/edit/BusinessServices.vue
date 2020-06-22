<template>
  <div class="card">
    <header class="card-header">
      <regulation-icon />
      <strong class="icon-header">Business Services</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/service/add"
          class="card-header-action"
        >
          <add-icon />
          <span class="icon-span">Add</span>
        </router-link>
      </div>
    </header>
    <div class="card-body">
      <div class="form-group" v-if="businessServices">
        <label for="businessService">Business Service</label>
        <v-select
          label="name"
          :options="businessServices"
          placeholder="Select a business service (software)"
          :filtrable="false"
          @search="searchBusinessService"
          @input="addBusinessService"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No results found for <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5;" v-else
              >Start typing to search for a service.</em
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
        <span class="help-block">Please select a business service.</span>
      </div>
      <div class="card-columns">
        <div
          class="card bg-light mb-3"
          v-for="businessService of processDocumentation.businessServices"
          :key="businessService.id"
        >
          <div class="card-header">
            <div class="card-title">
              <strong>{{ businessService.name }}</strong>
              <router-link
                tag="a"
                :to="{
                  name: 'BusinessServiceView',
                  params: { id: businessService.id }
                }"
              >
                <view-icon />
              </router-link>
              <span v-on:click="removeBusinessService(businessService)">
                <delete-icon />
              </span>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ businessService.description }}</p>
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
  name: "ProcessDocumentationServicesEdit",

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
    ...mapGetters("processDocumentation", ["processDocumentation"]),
    ...mapGetters("businessService", ["businessServices"])
  },
  methods: {
    searchBusinessService(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("businessService/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),

    addBusinessService(selectedBusinessService) {
      const formData = {
        id: this.processDocumentation.id,
        service: selectedBusinessService.id
      };
      this.$store.dispatch("processDocumentation/addBusinessService", formData);
    },
    removeBusinessService(selectedBusinessService) {
      const formData = {
        id: this.processDocumentation.id,
        service: selectedBusinessService.id
      };
      this.$store.dispatch(
        "processDocumentation/removeBusinessService",
        formData
      );
    }
  },
  created() {}
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
  display: inline-block !important;
}
.card-columns {
  column-count: 2;
}
.card-header {
  padding-top: 1rem;
}
</style>
