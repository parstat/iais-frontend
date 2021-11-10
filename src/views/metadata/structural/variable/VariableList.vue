<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Variables
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/structural/variable/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New Variable</span>
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
                  <th scope="col">Measures</th>
                  <th scope="col" colspan="2" width="2%">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="variable in variables" :key="variable.id">
                  <td>{{ variable.id }}</td>
                  <td>{{ variable.localId }}</td>
                  <td>{{ variable.name }}</td>
                  <td>{{ variable.description }}</td>
                  <td>{{ variable.version }}</td>
                  <td>{{ variable.measures }}</td>

                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'VariableView',
                          params: { id: variable.id }
                        }"
                      >
                        <view-icon />
                      </router-link>
                    </td>
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'VariableEdit',
                          params: { id: variable.id }
                        }"
                      >
                        <edit-icon />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'VariableDelete',
                          params: { id: variable.id }
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
                          name: 'VariableView',
                          params: { id: variable.id }
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
  name: "VariableList",
  data() {
    return {
      loading: false,
      variables: []
    };
  },
  mounted() {
    this.loading = true;
    axios
      //.get("http://localhost:5300/variables")
      .get(
        "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural/OpenVariables"
      )
      .then(response => (this.variables = response.data.variables))
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
