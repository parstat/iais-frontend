<template>
  <div class="card-columns w-100">
    <div class="card">
      <div class="card-header">
        <h5>Owner</h5>
      </div>
      <div class="card-body">
        <div class="card-group">
          <span><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ statisticalProgram.owner.name }}</span>
        </div>
        <div class="card-group">
          <span><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ statisticalProgram.owner.type }}</span>
        </div>
        <div class="card-group" v-if="statisticalProgram.owner.description">
          <span><strong>Description</strong></span>
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
          <span><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ statisticalProgram.maintainer.name }}</span>
        </div>
        <div class="card-group">
          <span><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ statisticalProgram.maintainer.type }}</span>
        </div>
        <div
          class="card-group"
          v-if="statisticalProgram.maintainer.description"
        >
          <span><strong>Description</strong></span>
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
          <span><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ statisticalProgram.contact.name }}</span>
        </div>
        <div class="card-group">
          <span><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ statisticalProgram.contact.type }}</span>
        </div>
        <div class="card-group" v-if="statisticalProgram.contact.description">
          <span><strong>Description</strong></span>
        </div>
        <div class="card-slot" v-if="statisticalProgram.contact.description">
          <span> {{ statisticalProgram.contact.description }}</span>
        </div>
        <div class="card-group" v-if="statisticalProgram.contact.localId">
          <span><strong>Email</strong></span>
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
