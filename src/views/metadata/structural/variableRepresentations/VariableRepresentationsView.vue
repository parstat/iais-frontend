<template>
  <CRow v-if="variableRepresentation">
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2">
      <div class="container">
        <h2 class="display-5">{{ variableRepresentation.name }}</h2>
        <p class="lead" v-if="variableRepresentation.description">
          <strong>Description:</strong> {{ variableRepresentation.description }}
        </p>
      </div>
    </div>
    <CCard class="mt-3">
      <CCardBody>
        <CCardTitle>Value Domains </CCardTitle>
        <CCardText>
          <CRow>
            <CCol class="col-sm-12 col-md-6">
              <!-- substantiveValueDomain -->
              <CCard>
                <CCardBody>
                  <CCardSubtitle class="mb-2 text-muted">
                    <h5>Substantive</h5>
                  </CCardSubtitle>
                  <CCardText>
                    <CForm>
                      <span><strong>Name:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="variableRepresentation.substantiveValueDomain"
                          >{{
                            variableRepresentation.substantiveValueDomain.name
                          }}</span
                        >
                      </div>
                    </CForm>
                    <CForm>
                      <span><strong>Description:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="variableRepresentation.substantiveValueDomain"
                          >{{
                            variableRepresentation.substantiveValueDomain
                              .description
                          }}</span
                        >
                      </div>
                    </CForm>
                    <CForm>
                      <span><strong>Type:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="variableRepresentation.substantiveValueDomain"
                          >{{
                            variableRepresentation.substantiveValueDomain.type
                          }}</span
                        >
                      </div>
                    </CForm>
                    <CForm>
                      <span><strong>DataType:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="variableRepresentation.substantiveValueDomain"
                          >{{
                            variableRepresentation.substantiveValueDomain
                              .dataType
                          }}</span
                        >
                      </div>
                    </CForm>
                    <CForm>
                      <span><strong>Expression:</strong></span>
                      <div class="text-muted">
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
                    </CForm>
                    <!-- Variable representation CodeList-->
                    <CCard>
                      <CCardBody>
                        <CCardTitle>
                          <i>{{ variableRepresentation.variable.name }}</i>
                          CodeList
                        </CCardTitle>
                        <!-- @start Condition to show filtrable table if results are more then 5 lines-->
                        <CCardText>
                          <div
                            class="table-responsive"
                            v-if="
                              variableRepresentation.substantiveValueDomain
                                .valueSet.length > 20
                            "
                          >
                            <CSmartTable
                              :items="
                                variableRepresentation.substantiveValueDomain
                                  .valueSet
                              "
                              :columns="columns"
                              column-filter
                              table-filter
                              items-per-page-select
                              :items-per-page="5"
                              hover
                              sorter
                              pagination
                            >
                            </CSmartTable>
                          </div>
                          <!-- @end Condition to show filtrable table if results are more then 5 lines-->
                          <table
                            class="table table-hover"
                            v-if="
                              variableRepresentation.substantiveValueDomain &&
                              variableRepresentation.substantiveValueDomain
                                .valueSet.length < 20
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
                                v-for="item in variableRepresentation
                                  .substantiveValueDomain.valueSet"
                                :key="item.index"
                              >
                                <td>{{ item.code }}</td>
                                <td>{{ item.value }}</td>
                              </tr>
                            </tbody>
                          </table>
                          <h5
                            v-if="
                              !variableRepresentation.substantiveValueDomain
                                .valueSet.length
                            "
                            class="default-value card-body"
                          >
                            No data available
                          </h5>
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol class="col-sm-12 col-md-6">
              <!-- sentinel Value Domain-->
              <CCard>
                <CCardBody>
                  <CCardSubtitle class="mb-2 text-muted">
                    <h5>Sentinel</h5>
                  </CCardSubtitle>
                  <CCardText v-if="variableRepresentation.sentinelValueDomain">
                    <CForm>
                      <span><strong>Name:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="variableRepresentation.sentinelValueDomain.name"
                          >{{
                            variableRepresentation.sentinelValueDomain.name
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </CForm>
                    <CForm>
                      <span><strong>Description:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="
                            variableRepresentation.sentinelValueDomain
                              .description
                          "
                          >{{
                            variableRepresentation.sentinelValueDomain
                              .description
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </CForm>

                    <CForm>
                      <span><strong>Type:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="variableRepresentation.sentinelValueDomain.type"
                          >{{
                            variableRepresentation.sentinelValueDomain.type
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </CForm>
                    <CForm>
                      <span><strong>Data Type:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="
                            variableRepresentation.sentinelValueDomain.dataType
                          "
                          >{{
                            variableRepresentation.sentinelValueDomain.dataType
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </CForm>
                    <CForm>
                      <span><strong>Expression:</strong></span>
                      <div class="text-muted">
                        <span
                          v-if="
                            variableRepresentation.sentinelValueDomain
                              .expression
                          "
                          >{{
                            variableRepresentation.sentinelValueDomain
                              .expression
                          }}</span
                        >
                        <span v-else class="default-value">no value</span>
                      </div>
                    </CForm>

                    <CCard>
                      <CCardBody>
                        <CCardTitle>
                          Sentinel
                          <i>{{ variableRepresentation.variable.name }}</i>
                          CodeList
                        </CCardTitle>
                        <table
                          class="table table-hover"
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
                              v-for="item in variableRepresentation
                                .sentinelValueDomain.valueSet"
                              :key="item.index"
                            >
                              <td>
                                <span v-if="item.code">{{ item.code }}</span>
                                <span v-else class="default-value"
                                  >no value</span
                                >
                              </td>
                              <td>{{ item.value }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <h5 v-else class="default-value card-body">
                          No data available
                        </h5>
                      </CCardBody>
                    </CCard>
                  </CCardText>
                  <CCardText v-else class="default-value card-body"
                    >No data available</CCardText
                  >
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardText>
        <CButton
          color="primary"
          size="sm"
          @click.prevent="handleBack()"
          :disabled="disabled"
          >Back</CButton
        >
      </CCardBody>
    </CCard>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VariableRepresentationsView",
  data() {
    return {
      disabled: false,
      //nce: variableRepresentation.substantiveValueDomain,
      columns: [
        {
          key: "code",
          label: "Code",
        },
        {
          key: "value",
          label: "Value",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("variableRepresentation", ["variableRepresentation"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push(
        "/metadata/structural/variable/view/" +
          this.variableRepresentation.variable.id
      );
    },
  },
  created() {
    this.$store.dispatch(
      "variableRepresentation/findById",
      this.$route.params.id
    );
  },
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

.jumbotron {
  border: 1px solid #ced2d8;
  box-shadow: 0 1px 1px 0 rgba(60, 75, 100, 0.14),
    0 2px 1px -1px rgba(60, 75, 100, 0.12), 0 1px 3px 0 rgba(60, 75, 100, 0.2);
}
@media (min-width: 576px) {
  .jumbotron {
    padding: 1.5rem 2rem;
  }
}
</style>
