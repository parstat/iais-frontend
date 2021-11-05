<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="statclassif">
      <div class=" p-3">
        <h2 class="display-5">
          {{ statclassif.Name }}
          <span class="lead"
            >( {{ statclassif.Definition || statclassif.LocalId }} )</span
          >
        </h2>
        <p class="lead">
          <strong>Description:</strong> {{ statclassif.Description }}
        </p>
      </div>
    </div>

    <div class="card w-100">
      <header class="card-header ">
        <h5>Levels</h5>
      </header>
      <div class="card-body">
        <table
          class="table table-hover table-striped"
          v-if="statclassif.Levels"
        >
          <thead class="bg-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">LocalId</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">LevelNumber</th>
              <th scope="col" colspan="2" width="2%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in statclassif.Levels" :key="item.id">
              <td>{{ item.Id }}</td>
              <td>{{ item.LocalId }}</td>
              <td>{{ item.Name }}</td>
              <td class="justify">{{ item.Description }}</td>
              <td>{{ item.LevelNumber }}</td>
              <template v-if="isAuthenticated">
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationsEdit',
                      params: { id: statclassif.id }
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
                      params: { id: statclassif.id }
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
                      params: { id: statclassif.id }
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
    <!-- Nodes -->
    <div class="card w-100">
      <header class="card-header ">
        <h5>Nodes</h5>
      </header>
      <div class="card-body">
        <table class="table table-hover table-striped" v-if="statclassif.Nodes">
          <thead class="bg-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col" class="col-1">Code</th>
              <th scope="col" class="col-3">Category</th>
              <th scope="col" class="col-5">Category Description</th>
              <th scope="col">LevelId</th>
              <!--<th scope="col">Children</th>-->
              <th scope="col" colspan="2" width="2%">Actions</th>
            </tr>
          </thead>
          <tbody v-for="item in statclassif.Nodes" :key="item.index">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.Code }}</td>
              <td class="w-20">
                {{ item.Category.Name }}
              </td>
              <td class="w-40 justify">{{ item.Category.Description }}</td>
              <td>{{ item.LevelId }}</td>
              <!--
              <td>
                <p v-for="nitem in item.Children" :key="nitem.id">
                  <a href="#">
                    <CBadge color="secondary p-1" shape="pill"
                      >Code: {{ nitem.Code }}</CBadge
                    >
                    {{ nitem.Category.Name }}
                  </a>
                </p>

                
              </td>
              -->
              <template v-if="isAuthenticated">
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationsEdit',
                      params: { id: statclassif.id }
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
                      params: { id: statclassif.id }
                    }"
                  >
                    <delete-icon />
                  </router-link>
                </td>
              </template>
              <template v-else>
                <td>
                  <CButton
                    color="primary"
                    variant="outline"
                    square
                    size="sm"
                    @click="isOpenA = !isOpenA"
                  >
                    <span class="wkday"> {{ isOpenA ? "-" : "+" }}</span>
                  </CButton>
                </td>
              </template>
            </tr>
            <tr class="p-0">
              <td colspan="8">
                <template>
                  <CCollapse
                    :show="isOpenA"
                    :duration="collapseDuration"
                    v-for="nitem in item.Children"
                    :key="nitem.id"
                  >
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-1">
                          <CButton
                            color="primary"
                            variant="outline"
                            square
                            size="sm"
                            @click="isOpenA = !isOpenA"
                            style="border: none !important;"
                          >
                            <span class="wkday">
                              {{ isOpenA ? "▾" : "▸" }}</span
                            >
                          </CButton>
                          {{ item.Category.id }}
                        </div>
                        <div class="col-1">
                          <a href="#"> -- {{ nitem.Code }} </a>
                        </div>
                        <div class="col-3">-- {{ nitem.Category.Name }}</div>
                        <div class="col-5">
                          -- Description
                        </div>
                        <div class="col-2">-- {{ item.LevelId }}</div>
                      </div>
                    </div>
                  </CCollapse>
                </template>
              </td>
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
//const itm= statclassif;

export default {
  name: "StatisticalClassificationsView",
  data() {
    return {
      loading: false,
      disabled: false,
      statclassif: [],
      rvd: [],
      nsd: [],
      details: [],
      collapseDuration: 0,
      isActive: false,
      isOpenA: false
    };
  },
  mounted() {
    this.loading = true;
    axios
      .get(
        "http://localhost:5300/statisticalClassifications/" +
          this.$route.params.id
      )
      //.get("http://iais.francecentral.cloudapp.azure.com:8080/api/v1/referential/agents")
      .then(response => (this.statclassif = response.data))
      .catch(error => console.log(error))
      .finally(() => (this.loading = false));

    //rvd = Represented Variable Data
    axios
      .get(
        "http://localhost:5300/representedVariables/" + this.$route.params.id
      )
      .then(response => (this.rvd = response.data))
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
      this.$router.push("/metadata/structural/statisticalClassifications");
    },
    /*
    getRepresentedVariablesData() {
      axios
        .get(
          "http://localhost:5300/representedVariables/" + this.$route.params.id
        )
        .then(response => (this.rvd = response.data))
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    }
    */
    toggleDetails(itm) {
      this.$set(this.statclassif[itm.id], "_toggled", !itm._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    myFilter() {
      this.isActive = !this.isActive;
      // some code to filter users
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
.w-20 {
  width: 20%;
}
.w-40 {
  width: 40%;
}
.justify {
  text-align: justify;
}
</style>
