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
          <span>{{ owner.name }}</span>
        </div>
        <div class="card-group">
          <span class="mb-2"><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ owner.type }}</span>
        </div>
        <div class="card-group" v-if="owner.description">
          <span class="mb-2"><strong>Description</strong></span>
        </div>
        <div class="card-slot" v-if="owner.description">
          <span> {{ owner.description }}</span>
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
          <span>{{ maintainer.name }}</span>
        </div>
        <div class="card-group">
          <span class="mb-2"><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ maintainer.type }}</span>
        </div>
        <div class="card-group" v-if="maintainer.description">
          <span class="mb-2"><strong>Description</strong></span>
        </div>
        <div class="card-slot" v-if="maintainer.description">
          <span> {{ maintainer.description }}</span>
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
          <span>{{ contact.name }}</span>
        </div>
        <div class="card-group">
          <span class="mb-2"><strong>Type</strong></span>
        </div>
        <div class="card-slot">
          <span> {{ contact.type }}</span>
        </div>
        <div class="card-group" v-if="contact.description">
          <span class="mb-2"><strong>Description</strong></span>
        </div>
        <div class="card-slot" v-if="contact.description">
          <span> {{ contact.description }}</span>
        </div>
        <div class="card-group" v-if="contact.localId">
          <span class="mb-2"><strong>Email</strong></span>
        </div>
        <div class="card-slot" v-if="contact.localId">
          <span> {{ contact.localId }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AgentsView",
  props: {
    owner: {
      type: Object,
      required: true
    },
    maintainer: {
      type: Object,
      required: true
    },
    contact: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
</style>
