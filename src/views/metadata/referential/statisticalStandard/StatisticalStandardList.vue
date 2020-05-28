<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Statistical standard
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/gsim/standard/add"
              class="card-header-action"
            >
              <CIcon name="cilPlus"></CIcon>
              <span>New standard</span>
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
                  <th scope="col">Type</th>
                  <th scope="col">Local id</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="statisticalStandard in statisticalStandards"
                  :key="statisticalStandard.id"
                >
                  <td>{{ statisticalStandard.id }}</td>
                  <td>{{ statisticalStandard.name }}</td>
                  <td v-if="statisticalStandard.description">
                    {{ statisticalStandard.description }}
                  </td>
                  <td v-else class="pl-4">&ndash;</td>
                  <td>{{ statisticalStandard.type | capitalize }}</td>
                  <td>
                    {{ statisticalStandard.localId }}
                  </td>
                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalStandardEdit',
                          params: { id: statisticalStandard.id }
                        }"
                      >
                        <CIcon name="cilPencil"></CIcon>
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'statisticalStandardDelete',
                          params: { id: statisticalStandard.id }
                        }"
                      >
                        <CIcon name="cilTrash"></CIcon>
                      </router-link>
                    </td>
                  </template>
                  <template v-else>
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalStandardView',
                          params: { id: statisticalStandard.id }
                        }"
                      >
                        <CIcon name="cilMagnifyingGlass"></CIcon>
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
  name: "StatisticalStandardList",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("statisticalStandard", ["statisticalStandards"])
  },
  created() {
    this.$store.dispatch("statisticalStandard/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  }
};
</script>
