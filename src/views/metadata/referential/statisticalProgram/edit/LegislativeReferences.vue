<template>
  <div class="card">
    <header class="card-header">
      <regulation-icon />
      <strong class="icon-header">Legislative references</strong>
      <div class="card-header-actions">
        <router-link
          tag="a"
          to="/metadata/referential/gsim/regulation/add"
          class="card-header-action"
        >
          <add-icon />
          <span class="icon-span">Add</span>
        </router-link>
      </div>
    </header>
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
            <em style="opacity: 0.5;" v-else
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

      <div
        class="card-slot"
        v-for="legislativeReference of statisticalProgram.legislativeReferences"
        :key="legislativeReference.id"
      >
        <p class="heading">
          {{ legislativeReference.name }}
          <router-link
            tag="a"
            :to="{
              name: 'LegislativeReferenceView',
              params: { id: legislativeReference.id }
            }"
          >
            <view-icon />
          </router-link>
          <span v-on:click="removeLegislativeReference(legislativeReference)">
            <delete-icon />
          </span>
        </p>
        <p class="card-text">{{ legislativeReference.description }}</p>
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
  name: "StatisticalProgramEditReferences",
  data() {
    return {
      //legislativeReference: null
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
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("legislativeReference", ["legislativeReferences"])
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
      const formData = {
        id: this.statisticalProgram.id,
        legislative: selectedLegislativeReference.id
      };
      this.$store.dispatch(
        "statisticalProgram/addLegislativeReference",
        formData
      );
    },
    removeLegislativeReference(selectedLegislativeReference) {
      const formData = {
        id: this.statisticalProgram.id,
        legislative: selectedLegislativeReference.id
      };
      this.$store.dispatch(
        "statisticalProgram/removeLegislativeReference",
        formData
      );
    }
  },
  created() {
    //this.$store.dispatch("legislativeReference/findAll");
    //this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
  }
};
</script>
