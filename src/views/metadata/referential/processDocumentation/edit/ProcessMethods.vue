<template>
  <div class="card">
    <div class="card-header">
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
    </div>
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
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="processMethod of processDocumentation.processMethods"
          :key="processMethod.id"
        >
          <div class="card-header">
            <div class="card-title">
              <strong>{{ processMethod.name }}</strong>
              <div class="card-header-actions">
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
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ processMethod.description }}</p>
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
  padding-top: 1rem;
}
</style>
