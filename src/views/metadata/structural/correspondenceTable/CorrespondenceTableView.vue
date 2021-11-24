<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="correspondence">
      <div class=" p-3">
        <h2 class="display-5">
          {{ correspondence.relationship }}
          <!--<span class="lead">( {{ codes.version || codes.localId }} )</span> -->
        </h2>
        <!-- <p class="lead"><strong>Description:</strong> {{ codes.description }}</p> -->
      </div>
    </div>
    <div class="col-sm-12 col-md-4">
      <div class="card ">
        <header class="card-header ">
          <h5>Source</h5>
          <div class="card-header-actions">
            <template v-if="isAuthenticated">
              <span>
                <router-link
                  tag="a"
                  :to="{
                    name: 'CorrespondenceTableSourceEdit',
                    params: { id: correspondence.id }
                  }"
                >
                  <edit-icon />
                </router-link>
              </span>
              <span v-if="isAdmin">
                <router-link
                  tag="a"
                  :to="{
                    name: 'CorrespondenceTableSourceDelete',
                    params: { id: correspondence.id }
                  }"
                >
                  <delete-icon />
                </router-link>
              </span>
            </template>
          </div>
        </header>
        <div class="card-body">
          <div class="card-group">
            <span><strong>Id:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ correspondence.source.id }}</span>
          </div>
          <div class="card-group">
            <span><strong>Name: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ correspondence.source.name }}</span>
          </div>
          <div class="card-group">
            <span><strong>Version:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ correspondence.source.version }}</span>
          </div>
          <div class="card-group">
            <span><strong>Link: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ correspondence.source.link }}</span>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
    <div class="col-sm-12 col-md-4">
      <div class="card ">
        <header class="card-header ">
          <h5>Target</h5>
        </header>
        <div class="card-body">
          <div class="card-group">
            <span><strong>Id:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ correspondence.target.id }}</span>
          </div>
          <div class="card-group">
            <span><strong>Name: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ correspondence.target.name }}</span>
          </div>
          <div class="card-group">
            <span><strong>Version:</strong></span>
          </div>
          <div class="card-slot">
            <span>{{ correspondence.target.version }}</span>
          </div>
          <div class="card-group">
            <span><strong>Link: </strong></span>
          </div>
          <div class="card-slot">
            <span>{{ correspondence.target.link }}</span>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>
    <div class="col-sm-12 col-md-4">
      <div class="card ">
        <header class="card-header ">
          <h5>Mappings</h5>
        </header>
        <div class="card-body">
          <table class="table table-hover">
            <!-- v-if="correspondence.mappings" -->
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Source Code</th>
                <th scope="col">Target Code</th>
                <th scope="col" colspan="2" width="2%">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="mapping in correspondence.mappings"
                :key="mapping.index"
              >
                <td>{{ mapping.id }}</td>
                <td>{{ mapping.sourceCode }}</td>
                <td>{{ mapping.targetCode }}</td>

                <template v-if="isAuthenticated">
                  <td>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'CorrespondenceTableView',
                        params: { id: correspondence.id }
                      }"
                    >
                      <view-icon />
                    </router-link>
                  </td>
                  <td>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'CorrespondenceTableEdit',
                        params: { id: correspondence.id }
                      }"
                    >
                      <edit-icon />
                    </router-link>
                  </td>
                  <td v-if="isAdmin">
                    <router-link
                      tag="a"
                      :to="{
                        name: 'CorrespondenceTableDelete',
                        params: { id: correspondence.id }
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
                        name: 'CorrespondenceTableView',
                        params: { id: correspondence.id }
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
  name: "CorrespondenceTableView",
  data() {
    return {
      loading: false,
      disabled: false,
      correspondence: []
    };
  },
  mounted() {
    this.loading = true;
    axios
      //.get("http://localhost:5300/codeList/" + this.$route.params.id)
      .get(
        "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural//api/v1/structural/OpenCorrespondence/" +
          this.$route.params.id
      )
      .then(response => (this.correspondence = response.data.correspondence))
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
      this.$router.push("/metadata/structural/correspondenceTable");
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
