<template>
  <div class="card w-100" v-if="maintainers">
    <div class="card-header">
      <h5>Divisions</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="maintainer of maintainers"
          :key="maintainer.id"
        >
          <div class="card-header">
            <strong>{{ maintainer.name }}</strong>
          </div>
          <div class="card-body">
            <p class="card-text">{{ maintainer.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-columns w-100" v-else>
    <div class="card">
      <div class="card-header">
        <h5>Owner</h5>
      </div>
      <div class="card-body">
        <div class="mb-2">
          <span><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ owner.name }}</span>
        </div>
        <div v-if="owner.description" class="mb-2">
          <span><strong>Description</strong></span>
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
        <div class="mb-2">
          <span><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ maintainer.name }}</span>
        </div>
        <div v-if="maintainer.description" class="mb-2">
          <span><strong>Description</strong></span>
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
        <div class="mb-2">
          <span><strong>Name</strong></span>
        </div>
        <div class="card-slot">
          <span>{{ contact.name }}</span>
        </div>
        <div v-if="contact.description" class="mb-2">
          <span><strong>Description</strong></span>
        </div>
        <div class="card-slot" v-if="contact.description">
          <span> {{ contact.description }}</span>
        </div>
        <div v-if="contact.localId" class="mb-2">
          <span><strong>Email</strong></span>
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
      type: Object
    },
    maintainer: {
      type: Object
    },
    contact: {
      type: Object
    },
    maintainers: {
      type: Array
    }
  }
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
</style>
