<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Statistical processes
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New process</span>
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
                  <th scope="col">Survey Name</th>
                  <th scope="col">Acronym</th>
                  <th scope="col">Description</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Maintainer</th>
                  <th scope="col">Contact</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="statisticalProgram in statisticalPrograms"
                  :key="statisticalProgram.id"
                >
                  <td>{{ statisticalProgram.localId }}</td>
                  <td>{{ statisticalProgram.name }}</td>
                  <td>{{ statisticalProgram.acronym }}</td>
                  <td>{{ statisticalProgram.description }}</td>
                  <td v-if="statisticalProgram.owner">
                    {{ statisticalProgram.owner.name }}
                  </td>
                  <td v-else class="pl-4">&ndash;</td>
                  <td v-if="statisticalProgram.maintainer">
                    {{ statisticalProgram.maintainer.name }}
                  </td>
                  <td v-else class="pl-4">&ndash;</td>
                  <td v-if="statisticalProgram.contact">
                    {{ statisticalProgram.contact.name }}
                  </td>
                  <td v-else class="pl-4">&ndash;</td>
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
import { Context } from "@/common";

export default {
  name: "StatisticalProgramList",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("statisticalProgram", ["statisticalPrograms"])
  },
  created() {
    this.$store.dispatch("statisticalProgram/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  }
};
</script>
