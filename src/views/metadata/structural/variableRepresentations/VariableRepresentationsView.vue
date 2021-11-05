<template v-if="variable">
  <div class="row">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2" v-if="variable">
      <div class=" p-3">
        <h2 class="display-5">
          {{ rvd.Name }}
        </h2>
        <p class="lead" v-if="rvd.Description">
          <strong>Description:</strong> {{ rvd.Description }}
        </p>
      </div>
    </div>

    <CRow class="w-100"
      ><CCol class="col-sm-6 col-md-6">
        <div class="card w-100">
          <header class="card-header ">
            <h5>Value Domain</h5>
          </header>
          <div class="card-body ">
            <div class="card card-border bg-light w-100">
              <div class="card-body w-100">
                <CRow class="col-sm-12 col-md-12">
                  <CCol class="col-sm-6 col-md-6">
                    <div class="card-group ">
                      <span><strong>Name:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.SubstantiveValueDomain">{{
                          rvd.SubstantiveValueDomain.Name
                        }}</span>
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Type:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.SubstantiveValueDomain">{{
                          rvd.SubstantiveValueDomain.ValueDomainType
                        }}</span>
                      </div>
                    </div>
                  </CCol>
                  <CCol class="col-sm-6 col-md-6">
                    <div class="card-group ">
                      <span><strong>DataType:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.SubstantiveValueDomain">{{
                          rvd.SubstantiveValueDomain.DataType
                        }}</span>
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Level:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.SubstantiveValueDomain">{{
                          rvd.SubstantiveValueDomain.LevelNumber
                        }}</span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </div>
            </div>

            <div class="card w-100">
              <div class="card-header bg-secondary p-2">
                <strong> Numeric {{ variable.Name }} CodeList </strong>
              </div>
              <table
                class="table table-hover "
                v-if="rvd.SubstantiveValueDomain"
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
                    v-for="item in rvd.SubstantiveValueDomain.NodeSet.Nodes"
                    :key="item.index"
                  >
                    <td>{{ item.Code }}</td>
                    <td>{{ item.Label }}</td>
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
            <h5>Special Value Domain</h5>
          </header>
          <div class="card-body ">
            <div class="card card-border bg-light w-100">
              <div class="card-body w-100">
                <CRow class="col-sm-12 col-md-12">
                  <CCol class="col-sm-6 col-md-6">
                    <div class="card-group ">
                      <span><strong>Name:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.SpecialValueDomain">{{
                          rvd.SpecialValueDomain.Name
                        }}</span>
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Type:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.SpecialValueDomain">{{
                          rvd.SpecialValueDomain.ValueDomainType
                        }}</span>
                      </div>
                    </div>
                  </CCol>
                  <CCol class="col-sm-6 col-md-6">
                    <div class="card-group ">
                      <span><strong>DataType:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.SpecialValueDomain">{{
                          rvd.SpecialValueDomain.DataType
                        }}</span>
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Level:</strong></span>
                      <div class="card-slot ">
                        <span v-if="rvd.SpecialValueDomain">{{
                          rvd.SpecialValueDomain.LevelNumber
                        }}</span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </div>
            </div>

            <div class="card w-100">
              <div class="card-header bg-secondary p-2">
                <strong> Special {{ variable.Name }} CodeList </strong>
              </div>
              <table class="table table-hover " v-if="rvd.SpecialValueDomain">
                <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Value</th>

                    <!--<th scope="col" colspan="2" width="2%">Actions</th>-->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in rvd.SpecialValueDomain.NodeSet.Nodes"
                    :key="item.index"
                  >
                    <td>{{ item.Code }}</td>
                    <td>{{ item.Label }}</td>
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
    <!-- Described Value Domain-->
    <div class="card w-100 hidden">
      <header class="card-header ">
        <h5>Described Value Domain</h5>
      </header>
      <div class="card-body ">
        <div class="card card-border bg-light w-50">
          <div class="card-body w-100">
            <CRow class="col-sm-12 col-md-12">
              <CCol class="col-sm-6 col-md-6">
                <div class="card-group ">
                  <span><strong>Name:</strong></span>
                  <div class="card-slot ">
                    <span v-if="rvd.DescibedValueDomain">{{
                      rvd.DescibedValueDomain.Name
                    }}</span>
                  </div>
                </div>
                <div class="card-group ">
                  <span><strong>Type:</strong></span>
                  <div class="card-slot ">
                    <span v-if="rvd.DescibedValueDomain">{{
                      rvd.DescibedValueDomain.ValueDomainType
                    }}</span>
                  </div>
                </div>
                <div class="card-group">
                  <span><strong>Expression:</strong></span>
                </div>
                <div class="card-slot" v-if="rvd.DescibedValueDomain">
                  {{ rvd.DescibedValueDomain.Expression }}
                </div>
              </CCol>
              <CCol class="col-sm-6 col-md-6">
                <div class="card-group ">
                  <span><strong>DataType:</strong></span>
                  <div class="card-slot ">
                    <span v-if="rvd.DescibedValueDomain">{{
                      rvd.DescibedValueDomain.DataType
                    }}</span>
                  </div>
                </div>
                <div class="card-group ">
                  <span><strong>Level:</strong></span>
                  <div class="card-slot ">
                    <span v-if="rvd.DescibedValueDomain">{{
                      rvd.DescibedValueDomain.LevelNumber
                    }}</span>
                  </div>
                </div>
              </CCol>
            </CRow>
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

//const itemId = arrayid;
//const vid= {{variable.id}};

export default {
  name: "RepresentationsView",
  data() {
    return {
      loading: false,
      disabled: false,
      variable: [],
      rvd: [],
      nsd: [],
      n: this.$route.params.id - 1
      //variable.Representations[n]: []
    };
  },

  mounted() {
    this.loading = true;
    axios
      .get("http://localhost:5300/variables/" + this.$route.params.id)
      //.get("http://iais.francecentral.cloudapp.azure.com:8080/api/v1/referential/agents")
      .then(response => (this.variable = response.data))
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
      this.$router.push("/metadata/structural/variable");
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
</style>
