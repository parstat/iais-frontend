<template>
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2">
      <div class=" p-3">
        <h2 class="display-5">{{ rvd.name }}</h2>
        <p class="lead" v-if="rvd.description">
          <strong>Description:</strong> {{ rvd.description }}
        </p>
      </div>
    </div>

    <CRow class="w-100"
      ><CCol class="col-sm-6 col-md-6">
        <!-- substantiveValueDomain -->
        <div class="card w-100">
          <header class="card-header ">
            <h5>Substantive Value Domain</h5>
          </header>
          <div class="card-body ">
            <div class="card card-border bg-light w-100">
              <div class="card-body w-100">
                <CRow class="col-sm-12 col-md-12">
                  <CCol class="col-sm-12 col-md-6">
                    <div class="card-group ">
                      <span><strong>Name:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.substantiveValueDomain.name">{{
                          rvd.substantiveValueDomain.name
                        }}</span>
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Type:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.substantiveValueDomain">{{
                          rvd.substantiveValueDomain.type
                        }}</span>
                      </div>
                    </div>
                  </CCol>
                  <CCol class="col-sm-12 col-md-6">
                    <div class="card-group ">
                      <span><strong>DataType:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.substantiveValueDomain">{{
                          rvd.substantiveValueDomain.dataType
                        }}</span>
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Expression:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.substantiveValueDomain.expression">{{
                          rvd.substantiveValueDomain.expression
                        }}</span>
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </div>
            </div>

            <div class="card w-100">
              <div class="card-header bg-secondary p-2">
                <strong>
                  Numeric <i>{{ rvd.variable.name }}</i> CodeList
                </strong>
              </div>
              <table
                class="table table-hover "
                v-if="rvd.substantiveValueDomain"
              >
                <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Value</th>

                    <!--<th scope="col" colspan="2" width="2%">Actions</th>-->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in rvd.substantiveValueDomain.valueSet"
                    :key="item.index"
                  >
                    <td>{{ item.code }}</td>
                    <td>{{ item.value }}</td>
                    <!-- Actions Buttons  
                    <template v-if="isAuthenticated">
                      <td>
                        <router-link
                          tag="a"
                          :to="{
                            name: 'VariableRepresentationsEdit',
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
                            name: 'VariableRepresentationsDelete',
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
                            name: 'VariableRepresentationsView',
                            params: { id: variable.id }
                          }"
                        >
                          <view-icon />
                        </router-link>
                      </td>
                    </template>
                    -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CCol>
      <CCol class="col-sm-6 col-md-6">
        <!-- Special Value Domain-->
        <div class="card w-100 ">
          <header class="card-header ">
            <h5>Sentinel Value Domain</h5>
          </header>
          <div class="card-body ">
            <div class="card card-border bg-light w-100">
              <div class="card-body w-100">
                <CRow class="col-sm-12 col-md-12">
                  <CCol class="col-sm-12 col-md-6">
                    <div class="card-group ">
                      <span><strong>Name:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.sentinelValueDomain">{{
                          rvd.sentinelValueDomain.name
                        }}</span>
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Type:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.sentinelValueDomain">{{
                          rvd.sentinelValueDomain.type
                        }}</span>
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                  </CCol>
                  <CCol class="col-sm-12 col-md-6">
                    <div class="card-group ">
                      <span><strong>DataType:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.sentinelValueDomain">{{
                          rvd.sentinelValueDomain.datatype
                        }}</span>
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                    <!--
                    <div class="card-group ">
                      <span><strong>Level:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.sentinelValueDomain">{{
                          rvd.sentinelValueDomain.LevelNumber
                        }}</span>
                      </div>
                     
                    </div>
                     -->
                  </CCol>
                </CRow>
              </div>
            </div>

            <div class="card w-100">
              <div class="card-header bg-secondary p-2">
                <strong>
                  Special <i>{{ rvd.variable.name }}</i> CodeList
                </strong>
              </div>
              <table class="table table-hover " v-if="rvd.specialValueDomain">
                <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Value</th>

                    <!--<th scope="col" colspan="2" width="2%">Actions</th>-->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in rvd.specialValueDomain.valueSet"
                    :key="item.index"
                  >
                    <td>
                      <span v-if="item.code">{{ item.code }}</span>
                      <span v-else class="default-value">no value</span>
                      {{ item.code }}
                    </td>
                    <td>{{ item.value }}</td>
                    <!-- Actions Buttons  
                    <template v-if="isAuthenticated">
                      <td>
                        <router-link
                          tag="a"
                          :to="{
                            name: 'VariableRepresentationsEdit',
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
                            name: 'VariableRepresentationsDelete',
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
                            name: 'VariableRepresentationsView',
                            params: { id: variable.id }
                          }"
                        >
                          <view-icon />
                        </router-link>
                      </td>
                    </template>
                    -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CCol>
    </CRow>
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

export default {
  name: "RepresentationsView",
  data() {
    return {
      loading: false,
      disabled: false,
      rvd: [],
      n: this.$route.params.id - 1
    };
  },

  mounted() {
    this.loading = true;

    //rvd = Represented Variable Data
    axios
      .get(
        //"http://localhost:5300/representedVariables/" + this.$route.params.id
        "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural/OpenRepresentations/" +
          this.$route.params.id +
          "?language=en"
      )
      .then(response => (this.rvd = response.data.representedVariable))
      .catch(error => console.log(error))
      .finally(() => (this.loading = false));
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    arrayid() {
      return this.n;
    },
    repvarname() {
      return this.variable.Representations[this.$route.params.id - 1];
    },
    listLimit() {
      return this.variable.slice(this.n + 1, this.n);
    }
    //...mapGetters("variable", ["variable"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/variable/view" + this.$route.params.id);
    }
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

.hidden {
  display: none;
}
.default-value {
  color: lightgray;
}
</style>
