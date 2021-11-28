<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="correspondence">
      <div class=" p-3">
        <h2 class="display-5">
          {{ correspondence.relationship }}
        </h2>
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
            <span v-if="correspondence.target.link">{{
              correspondence.source.link
            }}</span>
            <span class="default-value" v-else>no value</span>
          </div>
        </div>
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
            <span v-if="correspondence.target.link">{{
              correspondence.target.link
            }}</span>
            <span v-else class="default-value">no value</span>
          </div>
        </div>
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
    <div class="">
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

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "CodeView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("correspondence", ["correspondence"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/correspondence");
    }
  },
  created() {
    this.$store.dispatch("correspondence/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  }
};
</script>
<style scoped>
.default-value {
  color: lightgray;
}
</style>
