<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Business service
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/gsim/service/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New business service (Software)</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Local id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="businessService in businessServices"
                    :key="businessService.id"
                >
                  <td>{{ businessService.id }}</td>
                   <td>
                    {{ businessService.localId }}
                  </td>
                  <td>{{ businessService.name }}</td>
                  <td v-if="businessService.description">
                    {{ businessService.description }}
                  </td>
                 
                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'BusinessServiceEdit',
                          params: { id: businessService.id }
                        }"
                      >
                        <edit-icon />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'BusinessServiceDelete',
                          params: { id: businessService.id }
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
                          name: 'BusinessServiceView',
                          params: { id: businessService.id }
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
  name: "BusinessServiceList",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("businessService", ["businessServices"])
  },
  created() {
    this.$store.dispatch("businessService/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  }
};
</script>
