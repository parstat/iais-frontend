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
              to="/metadata/referential/add"
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
                  <th scope="col">GSBPM sub-phase</th>
                  <th scope="col">Name</th>
                  <th scope="col">Maintainer</th>
                  <th scope="col">Frequency</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="processDocumentation in statisticalProgram.processDocumentations"
                  :key="processDocumentation.id"
                >
                  <td>{{ processDocumentation.id }}</td>
                  <td>{{ processDocumentation.businessFunction.name }}</td>
                  <td>{{ processDocumentation.name }}</td>
                  <td v-if="statisticalProgram.maintainer">
                    {{ statisticalProgram.maintainer.name }}
                  </td>
                  <td>{{ processDocumentation.frequency }}</td>
                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalProgramEdit',
                          params: { id: statisticalProgram.id }
                        }"
                      >
                        <edit-icon />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalProgramDelete',
                          params: { id: statisticalProgram.id }
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
                          name: 'StatisticalProgramView',
                          params: { id: statisticalProgram.id }
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ProcessDocumentationsEdit",
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
  },

  created: {

  }

}
</script>