<template>
  <div class="card w-100" v-if="processDocumentation.businessServices">
    <div class="card-header">
      <h5>Business Services/Software</h5>
    </div>
    <div class="card-body">
      <div class="card-columns">
        <div
          class="card card-border bg-lighter mb-3"
          v-for="businessService of processDocumentation.businessServices"
          :key="businessService.id"
        >
          <div class="card-header">
            <strong>{{ businessService.name }}</strong>
            <div class="card-header-actions">
              <router-link
                tag="a"
                :to="{
                  name: 'BusinessServiceView',
                  params: { id: businessService.id }
                }"
              >
                <view-icon />
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ businessService.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ProcessDocumentationServicesView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"])
  }
};
</script>
<style scoped>
h5 {
  margin-bottom: 0.1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
  box-shadow: none !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.material-design-icon {
  margin-bottom: 0.2rem;
}
</style>
