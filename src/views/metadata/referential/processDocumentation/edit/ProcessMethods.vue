<template>
  <div class="card">
    <header class="card-header">
      <regulation-icon />
      <strong class="icon-header">Process Methods</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/method/add"
          class="card-header-action"
        >
          <add-icon />
          <span class="icon-span">Add</span>
        </router-link>
      </div>
    </header>
    <div class="card-body">
      <div class="form-group" v-if="processMethods">
        <label for="processMethod">Process Method</label>
        <v-select
          label="name"
          :options="processMethods"
          placeholder="Select a process method"
          :filtrable="false"
          @search="searchProcessMethod"
          @input="addProcessMethod"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No results found for <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5;" v-else
              >Start typing to search for a method.</em
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
        <span class="help-block">Please select a process method.</span>
      </div>
      <div
        class="card-slot"
        v-for="processMethod of processDocumentation.processMethods"
        :key="processMethod.id"
      >
        <p class="heading">
          {{ processMethod.name }}
          <router-link
            tag="a"
            :to="{
              name: 'ProcessMethodView',
              params: { id: processMethod.id }
            }"
          >
            <view-icon />
          </router-link>
          <span v-on:click="removeProcessMethod(processMethod)">
            <delete-icon />
          </span>
        </p>
        <p class="card-text">{{ processMethod.description }}</p>
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
  name: "ProcessDocumentationMethodsEdit",

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
    ...mapGetters("processMethod", ["processMethods"])
  },
  methods: {
    searchProcessMethod(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("processMethod/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),

    addProcessMethod(selectedProcessMethod) {
      const formData = {
        id: this.processDocumentation.id,
        method: selectedProcessMethod.id
      };
      this.$store.dispatch("processDocumentation/addProcessMethod", formData);
    },
    removeProcessMethod(selectedProcessMethod) {
      const formData = {
        id: this.processDocumentation.id,
        method: selectedProcessMethod.id
      };
      this.$store.dispatch(
        "processDocumentation/removeProcessMethod",
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
}
.card-header {
  padding-top: 0rem;
}
</style>
