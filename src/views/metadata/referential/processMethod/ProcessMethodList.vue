<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Process Method
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/gsim/method/add"
              class="card-header-action"
            >
              <CIcon name="cil-plus" />
              <span class="icon-span">New Method</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Local id</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="processMethod in processMethods"
                  :key="processMethod.id"
                >
                  <td>{{ processMethod.id }}</td>
                  <td>{{ processMethod.name }}</td>
                  <td v-if="processMethod.description">
                    {{ processMethod.description }}
                  </td>
                  <td>
                    {{ processMethod.localId }}
                  </td>
                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'ProcessMethodEdit',
                          params: { id: processMethod.id },
                        }"
                      >
                        <edit-icon />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'ProcessMethodDelete',
                          params: { id: processMethod.id },
                        }"
                      >
                         <CIcon name="cil-trash" />
                      </router-link>
                    </td>
                  </template>
                  <template v-else>
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'ProcessMethodView',
                          params: { id: processMethod.id },
                        }"
                      >
                        <CIcon name="cil-magnifying-glass" />
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
  name: "ProcessMethodList",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("processMethod", ["processMethods"]),
  },
  created() {
    this.$store.dispatch("processMethod/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
