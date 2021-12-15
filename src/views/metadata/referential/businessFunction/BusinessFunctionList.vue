<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Business function
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/gsim/function/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span"
                >New business function (GSBPM sub-phase)</span
              >
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Phase</th>
                  <th scope="col">Local id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="businessFunction in businessFunctions"
                  :key="businessFunction.id"
                >
                  <td>{{ businessFunction.id }}</td>
                  <td>{{ businessFunction.phase }}</td>
                  <td>
                    {{ businessFunction.localId }}
                  </td>
                  <td>{{ businessFunction.name }}</td>
                  <td v-if="businessFunction.description">
                    {{ businessFunction.description }}
                  </td>

                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'BusinessFunctionEdit',
                          params: { id: businessFunction.id },
                        }"
                      >
                        <edit-icon />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'BusinessFunctionDelete',
                          params: { id: businessFunction.id },
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
                          name: 'BusinessFunctionView',
                          params: { id: businessFunction.id },
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
  name: "BusinessFunctionList",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("businessFunction", ["businessFunctions"]),
  },
  created() {
    this.$store.dispatch("businessFunction/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
