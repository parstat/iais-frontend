<template>
  <CRow v-if="dataStructure">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3"
      v-if="dataStructure"
    >
      <div class="p-3">
        <h2 class="display-5">
          <span>{{ dataStructure.name }}</span>
          <span class="lead">
            ({{ dataStructure.localId }} {{ dataStructure.version }} )</span
          >
        </h2>

        <p class="lead" v-if="dataStructure.description">
          <span>
            <strong>{{ $t("structural.description") }}:</strong>
            {{ dataStructure.description }}
          </span>
        </p>
        <p class="lead" v-if="dataStructure.group">
          <span>
            <strong>{{ $t("structural.dataset.group") }}:</strong>
            {{ dataStructure.group }}
          </span>
        </p>
      </div>
    </div>
    <CRow>
      <CCol class="col-12">
        <CCard class="mb-3">
          <CCardHeader class="bg-white">
            <CCardTitle> Records </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CCardText>
              <CRow>
                <CCol
                  :sm="6"
                  v-for="record in dataStructure.records"
                  :key="record.id"
                >
                  <CCard class="mb-3 mt-3" color="light">
                    <CCardBody>
                      <CCardTitle>
                        <span> {{ record.name }}</span>
                      </CCardTitle>
                      <CCardText>
                        <CRow class="mb-3">
                          <CCol class="col-sm-12">
                            <CFormLabel for="tableName" class="col-form-label">
                              {{ $t("structural.dataset.record.table_name") }}
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="tableName"
                              :value="record.localId"
                              readonly
                            />
                          </CCol>
                        </CRow>
                        <CRow v-if="record.parent" class="mb-3">
                          <CCol class="col-sm-12">
                            <CFormLabel
                              for="parentRecord"
                              class="col-form-label"
                            >
                              {{ $t("structural.dataset.record.parent") }}
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="parentRecord"
                              :value="record.parent.name"
                              readonly
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol class="col-sm-12">
                            <CFormLabel for="unitType" class="col-form-label">
                              {{ $t("structural.dataset.record.unit_type") }}
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="unitType"
                              :value="record.unitType.name"
                              readonly
                            />
                          </CCol>
                        </CRow>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader class="bg-white">
            <CCardTitle> Components </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CCardText>
              <div class="table-responsive">
                <CSmartTable
                  v-if="dataStructure.components"
                  :items="dataStructure.components"
                  :activePage="1"
                  header
                  :columns="columns"
                  columnFilter
                  cleaner
                  itemsPerPageSelect
                  :itemsPerPage="5"
                  columnSorter
                  :sorterValue="{
                    column: 'localId',
                    state: 'asc',
                  }"
                  pagination
                >
                  <template #show_details="{ item, index }">
                    <td class="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        square
                        size="sm"
                        @click="toggleDetails(item, index)"
                      >
                        {{
                          Boolean(this.details.includes(item.localId))
                            ? "Hide"
                            : "Show"
                        }}
                      </CButton>
                    </td>
                  </template>
                  <template #details="{ item }">
                    <CCollapse :visible="this.details.includes(item.localId)">
                      <CCardBody v-if="item.representation">
                        <h6>Representation</h6>
                        <p class="text-muted">
                          Name : {{ item.representation.name }}
                        </p>
                        <p class="text-muted">
                          Variable : {{ item.representation.variableName }}
                        </p>
                        <h6>Included in records</h6>
                        <CFormSwitch
                          v-for="record in item.records"
                          :key="record.localId"
                          :label="record.name"
                          :id="record.localId"
                          checked
                          disabled
                        />
                      </CCardBody>
                    </CCollapse>
                  </template>
                </CSmartTable>
              </div>
            </CCardText>
            <CButton
              color="primary"
              size="sm"
              @click="handleBack()"
              :disabled="disabled"
              >Back</CButton
            >
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DataStructureView",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Column",
          filter: true,
          sorter: true,
        },
        {
          key: "name",
          label: "Name",
          filter: true,
          sorter: true,
        },
        {
          key: "type",
          label: "Type",
          filter: true,
          sorter: true,
        },
        {
          key: "show_details",
          label: "Details",
          _style: { width: "1%" },
          filter: false,
          sorter: false,
        },
      ],
      disabled: false,
      details: [],
    };
  },
  computed: {
    ...mapGetters("dataStructure", ["dataStructure"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/dataStructures");
    },
    toggleDetails(item) {
      if (this.details.includes(item.localId)) {
        this.details = this.details.filter(
          (_localId) => _localId !== item.localId
        );
        return;
      }
      this.details.push(item.localId);
    },
  },
  created() {
    this.$store.dispatch("dataStructure/findById", this.$route.params.id);
  },
};
</script>
<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: #ebedef;
  opacity: 1;
}
</style>
<style scoped>
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
