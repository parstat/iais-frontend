<template>
  <div class="row" v-if="variableRepresentation">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2">
      <div class=" p-3">
        <h2 class="display-5">{{ variableRepresentation.name }}</h2>
        <p class="lead" v-if="variableRepresentation.description">
          <strong>Description:</strong> {{ variableRepresentation.description }}
        </p>
      </div>
    </div>

    <CRow
      class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-1 w-100"
    >
      <CCol>
        <!-- substantiveValueDomain -->
        <div class="card ">
          <header class="card-header ">
            <h5>Substantive Value Domain</h5>
          </header>
          <div class="card-body ">
            <div class="card card-border bg-light ">
              <div class="card-body ">
                <CRow
                  class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-1"
                >
                  <CCol>
                    <div class="card-group ">
                      <span><strong>Name:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.substantiveValueDomain"
                          >{{
                            variableRepresentation.substantiveValueDomain.name
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Description:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.substantiveValueDomain"
                          >{{
                            variableRepresentation.substantiveValueDomain
                              .description
                          }}</span
                        >
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow
                  class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-1"
                >
                  <CCol>
                    <div class="card-group ">
                      <span><strong>Type:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.substantiveValueDomain"
                          >{{
                            variableRepresentation.substantiveValueDomain.type
                          }}</span
                        >
                      </div>
                    </div>
                  </CCol>
                  <CCol>
                    <div class="card-group ">
                      <span><strong>DataType:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.substantiveValueDomain"
                          >{{
                            variableRepresentation.substantiveValueDomain
                              .dataType
                          }}</span
                        >
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow
                  class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-1"
                >
                  <CCol>
                    <div class="card-group ">
                      <span><strong>Expression:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="
                            variableRepresentation.substantiveValueDomain
                              .expression
                          "
                          >{{
                            variableRepresentation.substantiveValueDomain
                              .expression
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
              </div>
            </div>
            <!-- Numeric Variable representation CodeList-->
            <div class="card w-100">
              <div class="card-header bg-secondary p-2">
                <strong>
                  Numeric
                  <i>{{ variableRepresentation.variable.name }}</i> CodeList
                </strong>
              </div>
              <!-- @start Condition to show filtrable table if results are more then 5 lines-->
              <div
                class="table-responsive"
                v-if="
                  variableRepresentation.substantiveValueDomain.valueSet
                    .length > 5
                "
              >
                <CDataTable
                  :items="
                    variableRepresentation.substantiveValueDomain.valueSet
                  "
                  :fields="fields"
                  column-filter
                  table-filter
                  items-per-page-select
                  :items-per-page="5"
                  hover
                  sorter
                  pagination
                >
                  <template #actions="{item}">
                    <td
                      style="text-align:right; width:10%; padding-right:20px;"
                    >
                      <span class="pl-2" v-c-tooltip="'View'">
                        <router-link
                          tag="a"
                          title="View"
                          :to="{
                            name: 'VariableRepresentationCodeView',
                            params: { id: item.id }
                          }"
                        >
                          <view-icon />
                        </router-link>
                      </span>
                      <span
                        v-if="isAuthenticated"
                        class="pl-2"
                        v-c-tooltip="'Edit'"
                      >
                        <router-link
                          tag="a"
                          title="Edit"
                          :to="{
                            name: 'VariableRepresentationCodeEdit',
                            params: { id: item.id }
                          }"
                        >
                          <edit-icon />
                        </router-link>
                      </span>

                      <span
                        v-if="isAuthenticated && isAdmin"
                        class="pl-2"
                        v-c-tooltip="'Delete'"
                      >
                        <router-link
                          tag="a"
                          title="Delete"
                          :to="{
                            name: 'VariableRepresentationCodeDelete',
                            params: { id: item.id }
                          }"
                        >
                          <delete-icon />
                        </router-link>
                      </span>
                    </td>
                  </template>
                </CDataTable>
              </div>
              <!-- @end Condition to show filtrable table if results are more then 5 lines-->
              <table
                class="table table-hover "
                v-if="
                  variableRepresentation.substantiveValueDomain &&
                    variableRepresentation.substantiveValueDomain.valueSet
                      .length < 5
                "
              >
                <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in variableRepresentation.substantiveValueDomain
                      .valueSet"
                    :key="item.index"
                  >
                    <td>{{ item.code }}</td>
                    <td>{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
              <h5
                v-if="
                  !variableRepresentation.substantiveValueDomain.valueSet.length
                "
                class="default-value card-body"
              >
                No data available
              </h5>
            </div>
          </div>
        </div>
      </CCol>
      <CCol>
        <!-- sentinel Value Domain-->
        <div class="card w-100 col-sm-12 col-md-12">
          <header class="card-header ">
            <h5>Sentinel Value Domain</h5>
          </header>
          <div class="card-body ">
            <div class="card card-border bg-light w-100">
              <div class="card-body w-100">
                <CRow
                  class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-1"
                >
                  <CCol class="">
                    <div class="card-group ">
                      <span><strong>Name:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.sentinelValueDomain"
                          >{{
                            variableRepresentation.sentinelValueDomain.name
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                    <div class="card-group ">
                      <span><strong>Description:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.sentinelValueDomain"
                          >{{
                            variableRepresentation.sentinelValueDomain
                              .description
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow
                  class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-1"
                >
                  <CCol>
                    <div class="card-group ">
                      <span><strong>Type:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.sentinelValueDomain"
                          >{{
                            variableRepresentation.sentinelValueDomain.type
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                  </CCol>
                  <CCol class="col-sm-12 col-md-6">
                    <div class="card-group ">
                      <span><strong>DataType:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.sentinelValueDomain"
                          >{{
                            variableRepresentation.sentinelValueDomain.datatype
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow
                  class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-1"
                >
                  <CCol>
                    <div class="card-group ">
                      <span><strong>Expression:</strong></span>
                      <div class="card-slot ">
                        <span
                          v-if="variableRepresentation.sentinelValueDomain"
                          >{{
                            variableRepresentation.sentinelValueDomain
                              .expression
                          }}</span
                        >
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
                  Sentinel
                  <i>{{ variableRepresentation.variable.name }}</i> CodeList
                </strong>
              </div>
              <table
                class="table table-hover "
                v-if="variableRepresentation.sentinelValueDomain"
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
                    v-for="item in variableRepresentation.sentinelValueDomain
                      .valueSet"
                    :key="item.index"
                  >
                    <td>
                      <span v-if="item.code">{{ item.code }}</span>
                      <span v-else class="default-value">no value</span>
                      {{ item.code }}
                    </td>
                    <td>{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
              <h5 v-else class="default-value card-body">No data available</h5>
            </div>
          </div>
        </div>
      </CCol>
    </CRow>

    <CButton
      color="primary"
      shape="square"
      size="sm"
      @click.prevent="handleBack()"
      :disabled="disabled"
      >Back</CButton
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VariableRepresentationsView",
  data() {
    return {
      disabled: false,
      //nce: variableRepresentation.substantiveValueDomain,
      fields: [
        {
          key: "code",
          label: "Code"
        },
        {
          key: "value",
          label: "Value"
        },
        {
          key: "actions",
          label: "",
          _style: "",
          sorter: false,
          filter: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("variableRepresentation", ["variableRepresentation"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push(
        "/metadata/structural/variable/view/" + this.$route.params.id
      );
    }
  },
  created() {
    this.$store.dispatch(
      "variableRepresentation/findById",
      this.$route.params.id
    );
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
  font-style: italic;
}
</style>
