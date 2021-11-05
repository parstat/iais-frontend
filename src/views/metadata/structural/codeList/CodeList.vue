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
              to="/metadata/structural/code/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New Code List</span>
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

                  <th scope="col" colspan="2" width="2%">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.localId }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.description }}</td>

                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'CodeEdit',
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
                          name: 'CodeDelete',
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
                          name: 'CodeView',
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
  name: "axios",
  data() {
    return {
      loading: false,
      items: []
    };
  },
  mounted() {
    this.loading = true;
    axios
      //.get("http://localhost:5300/codeList")
      .get(
        "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural/OpenCodeLists"
      )
      .then(response => (this.items = response.data.codeLists))
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
