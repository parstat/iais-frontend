<template>
  <div class="card-columns w-100">
    <div class="card">
      <div class="card-header">
        <h5>Owner</h5>
      </div>
      <div class="card-body">
        <div class="card-group">
          <span class="mb-2"><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ statisticalProgram.owner.name }}</span>
        </div>
        <div class="card-group">
          <span class="mb-2"><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ statisticalProgram.owner.type }}</span>
        </div>
        <div class="card-group" v-if="statisticalProgram.owner.description">
          <span class="mb-2"><strong>Description</strong></span>
        </div>
        <div class="card-slot" v-if="statisticalProgram.owner.description">
          <span> {{ statisticalProgram.owner.description }}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h5>Division</h5>
      </div>
      <div class="card-body">
        <div class="card-group">
          <span class="mb-2"><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ statisticalProgram.maintainer.name }}</span>
        </div>
        <div class="card-group">
          <span class="mb-2"><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ statisticalProgram.maintainer.type }}</span>
        </div>
        <div
          class="card-group"
          v-if="statisticalProgram.maintainer.description"
        >
          <span class="mb-2"><strong>Description</strong></span>
        </div>
        <div class="card-slot" v-if="statisticalProgram.maintainer.description">
          <span> {{ statisticalProgram.maintainer.description }}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h5>Contact</h5>
      </div>
      <div class="card-body">
        <div class="card-group">
          <span class="mb-2"><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ statisticalProgram.contact.name }}</span>
        </div>
        <div class="card-group">
          <span class="mb-2"><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ statisticalProgram.contact.type }}</span>
        </div>
        <div class="card-group" v-if="statisticalProgram.contact.description">
          <span class="mb-2"><strong>Description</strong></span>
        </div>
        <div class="card-slot" v-if="statisticalProgram.contact.description">
          <span> {{ statisticalProgram.contact.description }}</span>
        </div>
        <div class="card-group" v-if="statisticalProgram.contact.localId">
          <span class="mb-2"><strong>Email</strong></span>
        </div>
        <div class="card-slot" v-if="statisticalProgram.contact.localId">
          <span> {{ statisticalProgram.contact.localId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticalProgramAgentsView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"])
  }
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
</style>
