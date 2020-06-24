<template>
  <div class="card w-100">
    <div class="card-header">
      <h5>Process Documentations</h5>
    </div>
    <div class="card-body">
      <div v-if="isLoading">
        <tile></tile>
      </div>
      <div class="table-responsive" v-else>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">GSBPM</th>
              <th scope="col">Name</th>
              <th scope="col">Maintainer</th>
              <th scope="col">Frequency</th>
              <th scope="col">Next</th>
              <th scope="col" colspan="2" width="2%"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="processDocumentation in statisticalProgram.processDocumentations"
              :key="processDocumentation.id"
            >
              <td>{{ processDocumentation.businessFunction.localId }}</td>
              <td>{{ processDocumentation.businessFunction.name }}</td>
              <td>{{ processDocumentation.name }}</td>
              <td v-if="processDocumentation.maintainer">
                {{ processDocumentation.maintainer.name }}
              </td>
              <td v-else class="pl-4">&ndash;</td>
              <td>{{ processDocumentation.frequency }}</td>
              <td>{{ processDocumentation.nextSubPhase }}</td>
              <template>
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'ProcessDocumentationView',
                      params: { id: processDocumentation.id }
                    }"
                  >
                    <view-icon />
                  </router-link>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer">
      <CButton
        color="primary"
        shape="square"
        size="sm"
        @click.prevent="$emit('handleBack')"
        :disabled="disabled"
        >Back</CButton
      >
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "StatisticalProgramStandardsView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("coreui", ["isLoading"])
  }
};
</script>
<style scoped>
.card-header {
  padding-top: 1rem;
}
</style>
