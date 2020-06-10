<template>
  <div class="card">
    <header class="card-header">
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
          v-model="statisticalProgram.statisticalStandards"
          placeholder="Select statistical standards"
          multiple
        ></v-select>
        <span class="help-block">Please select statistical standards.</span>
      </div>
      <div
        class="card-slot"
        v-for="statisticalStandard of statisticalProgram.statisticalStandards"
        :key="statisticalStandard.id"
      >
        <p class="heading">
          {{ statisticalStandard.name }}
          <router-link
            tag="a"
            :to="{
              name: 'StatisticalStandardView',
              params: { id: statisticalStandard.id }
            }"
          >
            <view-icon />
          </router-link>
        </p>
        <p class="card-text">{{ statisticalStandard.description }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticalProgramEdit",

  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("statisticalStandard", ["statisticalStandards"])
  },
  created() {
    this.$store.dispatch("statisticalStandard/findAll");
  }
};
</script>
