<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Statistical Classifications
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/structural/statisticalClassifications/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New Statistical Classifications</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div v-if="isLoading">
            <tile></tile>
          </div>
          <div class="table-responsive" v-else>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">LocalId</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Version</th>
                  <th scope="col">Version Date</th>
                  <th scope="col">Version Rationale</th>
                  <th scope="col">Definition</th>
                  <th scope="col">Link</th>
                  <th scope="col" colspan="2" width="2%">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.localId }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.description }}</td>
                  <td>{{ item.version }}</td>
                  <td>{{ item.versionDate }}</td>
                  <td>{{ item.versionRationale }}</td>
                  <td>{{ item.definition }}</td>
                  <td>{{ item.link }}</td>

                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalClassificationsView',
                          params: { id: item.id }
                        }"
                      >
                        <view-icon />
                      </router-link>
                    </td>
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalClassificationsEdit',
                          params: { id: item.id }
                        }"
                      >
                        <edit-icon />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalClassificationsDelete',
                          params: { id: item.id }
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
                          name: 'StatisticalClassificationsView',
                          params: { id: item.id }
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
<!--
<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "VariableList",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("variable", ["variables"])
  },
  created() {
    this.$store.dispatch("vareiable/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  }
};
</script>
-->
<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";
import axios from "axios";

export default {
  name: "StatisticalClassificationsList",
  data() {
    return {
      loading: false,
      items: []
    };
  },
  mounted() {
    this.loading = true;
    axios
      //.get('https://reqres.in/api/users')
      //.get("http://localhost:5300/statisticalClassifications")
      //.get("http://iais.francecentral.cloudapp.azure.com:8080/api/v1/referential/agents")
      .get(
        "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural/OpenStatisticalClassifications"
      )
      .then(response => (this.items = response.data.statisticalClassifications))
      .catch(error => console.log(error))
      .finally(() => (this.loading = false));
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"])
    //...mapGetters("variable", ["variables"])
  }
};
</script>
