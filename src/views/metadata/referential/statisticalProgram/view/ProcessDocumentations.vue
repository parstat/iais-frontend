<template>
    <div class="card col-md-12">
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
                        name: 'ProcessDocumentationEdit',
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
