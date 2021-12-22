<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="code">
      <div class="p-3">
        <h2 class="display-5">
          {{ code.name }}
          <span class="lead">( {{ code.version || code.localId }} )</span>
        </h2>
        <p class="lead"><strong>Description:</strong> {{ code.description }}</p>
      </div>
    </div>
    <div class="card w-100">
      <header class="card-header">
        <h5>Code Items</h5>
      </header>
      <div class="card-body">
        <table class="table table-hover" v-if="code">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Value</th>
              <th scope="col" colspan="2" width="2%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in code.codeItems" :key="item.index">
              <td>{{ item.code }}</td>
              <td>{{ item.value }}</td>
              <template v-if="isAuthenticated">
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'CodeItemsEdit',
                      params: { id: code.id },
                    }"
                  >
                    <edit-icon />
                  </router-link>
                </td>
                <td v-if="isAdmin">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'CodeItemsDelete',
                      params: { id: code.id },
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
                      name: 'CodeItemsView',
                      params: { id: code.id },
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
      <div class="card-footer">
        <CButton
          color="primary"
          size="sm"
          @click.prevent="handleBack()"
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
  name: "CodeView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("code", ["code"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/code");
    },
  },
  created() {
    this.$store.dispatch("code/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
