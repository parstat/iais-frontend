<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="codes">
      <div class=" p-3">
        <h2 class="display-5">
          {{ codes.name }}
          <span class="lead">( {{ codes.version || codes.localId }} )</span>
        </h2>
        <p class="lead">
          <strong>Description:</strong> {{ codes.description }}
        </p>
      </div>
    </div>
    <div class="card w-100">
      <header class="card-header ">
        <h5>Code Items</h5>
      </header>
      <div class="card-body">
        <table class="table table-hover" v-if="codes.codeItems">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Code</th>
              <th scope="col">Value</th>
              <th scope="col" colspan="2" width="2%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in codes.codeItems" :key="item.index">
              <td>{{ item.id }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.value }}</td>
              <template v-if="isAuthenticated">
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'CodeItemsEdit',
                      params: { id: codes.id }
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
                      params: { id: codes.id }
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
      <div class="card-footer">
        <CButton
          color="primary"
          shape="square"
          size="sm"
          @click.prevent="handleBack()"
          :disabled="disabled"
          >Back</CButton
        >
      </div>
    </div>
  </div>
</template>

<!--
<script>
import { mapGetters } from "vuex";

export default {
  name: "VariableView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("variable", ["variable"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/variable");
    }
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
  }
};
</script>
-->
<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";
import axios from "axios";

//var itemId = this.$route.params.id;
//const vid= {{variable.id}};

export default {
  name: "CodeView",
  data() {
    return {
      loading: false,
      disabled: false,
      codes: []
    };
  },
  mounted() {
    this.loading = true;
    axios
      //.get("http://localhost:5300/codeList/" + this.$route.params.id)
      .get(
        "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural/OpenCodeLists/" +
          this.$route.params.id
      )
      .then(response => (this.codes = response.data.codeList))
      .catch(error => console.log(error))
      .finally(() => (this.loading = false));
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"])
    //...mapGetters("variable", ["variable"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/codeList");
    }
  },
  created() {
    //this.$store.dispatch("variable/findById", this.$route.params.id);
  }
};
</script>
<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: #ebedef;
  opacity: 1;
}
.center {
  text-align: center;
  margin: 0 auto;
}
</style>
