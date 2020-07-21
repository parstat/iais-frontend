<template>
  <div class="row">
    <div class="col-12">
      <div class="card card-plain">
        <header class="card-header pt-0">
          <strong>{{ statisticalProgramName }} </strong>
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              :to="{
                path: '/metadata/referential/documentation/add',
                query: {
                  program: statisticalProgramId,
                  business_function: nextSubPhase
                }
              }"
              class="card-header-action"
            >
              <add-box-icon />
            </router-link>
          </div>
        </header>
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
                  <th scope="col">Frequency</th>
                  <th scope="col">Next</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="processDocumentation in sortAscDocumentations(
                    documentations
                  )"
                  :key="processDocumentation.id"
                >
                  <td>{{ processDocumentation.businessFunction.localId }}</td>
                  <td>{{ processDocumentation.businessFunction.name }}</td>
                  <td>{{ processDocumentation.name }}</td>
                  <td>{{ processDocumentation.frequency }}</td>
                  <td>{{ processDocumentation.nextSubPhase }}</td>
                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'ProcessDocumentationEdit',
                          params: { id: processDocumentation.id }
                        }"
                      >
                        <edit-icon />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'ProcessDocumentationEdit',
                          params: { id: processDocumentation.id }
                        }"
                      >
                        <delete-icon />
                      </router-link>
                    </td>
                  </template>
                  <template v-else>
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
            Finish
          </CButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "ProcessDocumentationsEdit",
  props: ["statisticalProgramName", "statisticalProgramId", "documentations"],
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    nextSubPhase() {
      var nextSubPhase = "";
      if (this.documentations) {
        nextSubPhase = this.sortDescByIdDocumentations(this.documentations)[0]
          .nextSubPhase;
      }
      return nextSubPhase;
    }
  },
  methods: {
    sortAscDocumentations(arrays) {
      return _.orderBy(arrays, "businessFunction.localId", "asc");
    },
    sortDescByIdDocumentations(arrays) {
      return _.orderBy(arrays, "id", "desc");
    }
  }
};
</script>

<style scoped>
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
</style>
