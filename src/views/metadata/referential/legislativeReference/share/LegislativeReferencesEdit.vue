<template>
  <div class="card">
    <div class="card-header pt-0">
      <regulation-icon />
      <strong class="icon-header">Legislative references</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/regulation/add"
          class="card-header-action"
        >
          <add-icon /> Add
        </router-link>
      </div>
    </div>
    <div class="card-body">
      <div class="form-group" v-if="legislativeReferences">
        <label for="description">Legislative references</label>
        <v-select
          label="name"
          :options="legislativeReferences"
          placeholder="Select legislative references"
          :filtrable="false"
          @search="searchLegislativeReference"
          @input="addLegislativeReference"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No results found for <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else
              >Start typing to search for a legislative reference.</em
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
        <span class="help-block">Please select legislative references.</span>
      </div>
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="legislativeReference of references"
          :key="legislativeReference.id"
        >
          <div class="card-header">
            <strong>{{ legislativeReference.name }}</strong>
            <div class="card-header-actions">
              <router-link
                tag="a"
                class="text-dark pr-1"
                :to="{
                  name: 'LegislativeReferenceView',
                  params: { id: legislativeReference.id },
                }"
              >
                <view-icon />
              </router-link>
              <span
                class="text-dark"
                v-on:click="removeLegislativeReference(legislativeReference)"
              >
                <delete-icon />
              </span>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ legislativeReference.description }}</p>
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
  name: "ReferencesEdit",
  props: ["references"],
  data() {
    return {
      fieldChanged: false,
    };
  },
  computed: {
    ...mapGetters("legislativeReference", ["legislativeReferences"]),
  },
  methods: {
    searchLegislativeReference(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("legislativeReference/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),
    addLegislativeReference(selectedLegislativeReference) {
      this.$emit("addLegislativeReference", selectedLegislativeReference);
      this.fieldChanged = true;
    },
    removeLegislativeReference(selectedLegislativeReference) {
      this.$emit("removeLegislativeReference", selectedLegislativeReference);
      this.fieldChanged = true;
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
