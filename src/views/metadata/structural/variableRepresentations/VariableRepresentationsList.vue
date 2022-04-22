<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="variable">
      <div class="p-3">
        <h2 class="display-5">
          {{ variable.name }}
          <span class="lead">( {{ variable.version }} )</span>
        </h2>
        <p class="lead">
          <strong>Description:</strong> {{ variable.description }}
        </p>
      </div>
    </div>

    <div class="card w-100">
      <header class="card-header">
        <h5>Representations</h5>
      </header>
      <div class="card-body">
        <table class="table table-hover" v-if="variable">
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
            <tr v-for="item in variable.representations" :key="item.index">
              <td>{{ item.id }}</td>
              <td>{{ item.localId }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <template v-if="isAuthenticated">
                <td v-c-tooltip="'View'">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'VariableRepresentationsView',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-magnifying-glass" />
                  </router-link>
                </td>
                <td v-c-tooltip="'Edit'">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'VariableRepresentationsEdit',
                      params: { id: item.id },
                    }"
                  >
                    <edit-icon />
                  </router-link>
                </td>
                <td v-if="isAdmin" v-c-tooltip="'Delete'">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'VariableRepresentationsDelete',
                      params: { id: item.id },
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
                      name: 'VariableRepresentationsView',
                      params: { id: item.id },
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
      <div class="card-footer">
        <CButton
          color="primary"
          size="sm"
          @click="handleBack()"
          :disabled="disabled"
          >Back</CButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "VariableRepresentationsList",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("variable", ["variable"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/variable");
    },
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
