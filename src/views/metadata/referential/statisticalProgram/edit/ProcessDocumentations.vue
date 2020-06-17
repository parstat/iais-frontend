<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          <strong>{{ statisticalProgram.name }} </strong>
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              :to="{
                path: '/metadata/referential/documentation/add',
                query: {
                  program: statisticalProgram.id,
                  business_function: lastDocumentation.nextSubPhase
                    ? lastDocumentation.nextSubPhase
                    : ''
                }
              }"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">Add</span>
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
            @click="$emit('handleBack')"
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

export default {
  name: "ProcessDocumentationsEdit",

  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),

    lastDocumentation() {
      var data = this.statisticalProgram.processDocumentations.slice();
      //find the max existing id
      var last = data.reduce((max, p) => (p.id > max ? p.id : max), data[0].id);
      //retrunt the last documentation entered
      var lastDocumentation = this.statisticalProgram.processDocumentations.find(
        pd => pd.id == last
      );
      return lastDocumentation;
    }
  }
};
</script>
