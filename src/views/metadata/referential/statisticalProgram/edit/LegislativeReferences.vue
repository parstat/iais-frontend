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
          @search="searchLegislativeReference"
          @input="addLegislativeReference"
        ></v-select>
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticalProgramEditReferences",
  data() {
    return {
      //legislativeReference: null
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("legislativeReference", ["legislativeReferences"])
  },
  methods: {
    searchLegislativeReference(search) {
      if (search.length > 2) {
        this.$store.dispatch("legislativeReference/findByName", search);
      }
    },
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
      console.log(this.$route.params.id);
      const formData = {
        id: this.$route.params.id,
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
