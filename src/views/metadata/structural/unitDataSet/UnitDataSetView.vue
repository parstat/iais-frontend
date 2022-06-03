<template>
  <CRow v-if="unitDataSet">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3"
      v-if="unitDataSet"
    >
      <div class="p-3">
        <h2 class="display-5">
          <span>{{ unitDataSet.name }}</span>
          <span class="lead">
            ({{ unitDataSet.localId }} {{ unitDataSet.version }} )
          </span>
        </h2>
        <p class="lead" v-if="unitDataSet.description">
          <span>
            <strong>{{ $t("structural.description") }}:</strong>
            {{ unitDataSet.description }}
          </span>
        </p>
      </div>
    </div>
    <CRow>
      <CCol class="mb-3">
        <CCard>
          <CCardHeader class="bg-white">
            <CCardTitle>
              <span>{{ $t("structural.data_set_information") }}</span>
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CCardText>
              <CRow>
                <CCol class="col-md-6 col-sm-12 col-12">
                  <CFormLabel for="exchangeChannel" class="col-form-label">
                    <span>{{ $t("structural.dataset.exchange_channel") }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="exchangeChannel"
                    :value="unitDataSet.exchangeChannel"
                    readonly
                  />
                </CCol>
                <CCol class="col-md-6 col-sm-12 col-12">
                  <CFormLabel for="exchangeDirection" class="col-form-label">
                    <span>{{
                      $t("structural.dataset.exchange_direction")
                    }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="exchangeDirection"
                    :value="unitDataSet.exchangeDirection"
                    readonly
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol class="col-md-6 col-sm-12 col-12">
                  <CFormLabel for="type" class="col-form-label">
                    <span>{{ $t("structural.type") }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="type"
                    :value="unitDataSet.type"
                    readonly
                  />
                </CCol>
                <CCol class="col-md-6 col-sm-12 col-12">
                  <CFormLabel for="connection" class="col-form-label">
                    <span>{{ $t("structural.dataset.connection") }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="connection"
                    :value="unitDataSet.connection"
                    readonly
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol class="col-md-6 col-sm-12 col-12">
                  <CFormLabel for="filterExpression" class="col-form-label">
                    <span>{{
                      $t("structural.dataset.filter_expression")
                    }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="filterExpression"
                    :value="unitDataSet.filterExpression"
                    readonly
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol class="col-md-6 col-sm-12 col-12">
                  <CFormLabel for="reportingPeriod" class="col-form-label">
                    <span>{{ $t("structural.dataset.reporting_period") }}</span>
                  </CFormLabel>
                  <Datepicker
                    v-model="rangeDate"
                    range
                    autoApply
                    readonly
                    :format="format"
                  />
                </CCol>
              </CRow>
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol class="col-12">
        <CCard>
          <CCardHeader class="bg-white">
            <CCardTitle>
              <span>{{ $t("structural.data_set_structure") }}</span>
            </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CCardText>
              <CRow>
                <CCol class="col-md-6 col-sm-12 col-12 mb-3">
                  <CFormLabel for="structureName" class="col-form-label">
                    <span>{{ $t("structural.name") }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="structureName"
                    :value="unitDataSet.structure.name"
                    readonly
                  />
                </CCol>
                <CCol
                  class="col-md-6 col-sm-12 col-12 mb-3"
                  v-if="unitDataSet.structure.description"
                >
                  <CFormLabel for="structureDescription" class="col-form-label">
                    <span>{{ $t("structural.description") }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="structureDescription"
                    :value="unitDataSet.structure.description"
                    readonly
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol
                  class="col-md-6 col-sm-12 mb-3"
                  v-if="unitDataSet.structure.group"
                  ><CFormLabel for="structureGroup" class="col-form-label">
                    <span>{{ $t("structural.dataset.group") }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="structureGroup"
                    :value="unitDataSet.structure.group"
                    readonly
                  />
                </CCol>
              </CRow>
              <CCardTitle>
                <span>{{ $t("structural.records") }}</span>
              </CCardTitle>
              <CRow>
                <CCol
                  :sm="6"
                  v-for="record in unitDataSet.structure.logicalRecords"
                  :key="record.id"
                  ><CCard class="mb-3 mt-3" color="light">
                    <CCardBody>
                      <CCardTitle>
                        <span>{{ record.name }}</span>
                      </CCardTitle>
                      <CCardText>
                        <CRow class="mb-3">
                          <CCol class="col-sm-12">
                            <CFormLabel for="tableName" class="col-form-label">
                              <span>{{
                                $t("structural.dataset.record.table_name")
                              }}</span>
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="tableName"
                              :value="record.localId"
                              readonly
                            />
                          </CCol>
                        </CRow>
                        <CRow v-if="record.parentRecord" class="mb-3">
                          <CCol class="col-sm-12">
                            <CFormLabel
                              for="parentRecord"
                              class="col-form-label"
                              ><span>{{
                                $t("structural.dataset.record.parent")
                              }}</span>
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="parentRecord"
                              :value="record.parentRecord"
                              readonly
                            />
                          </CCol>
                        </CRow>
                        <CRow class="mb-3">
                          <CCol class="col-sm-12">
                            <CFormLabel for="unitType" class="col-form-label">
                              <span>{{
                                $t("structural.dataset.record.unit_type")
                              }}</span>
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="unitType"
                              :value="record.unitType"
                              readonly
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol class="col-sm-12">
                            <CFormLabel for="columns" class="col-form-label">
                              <span>{{
                                $t("structural.dataset.record.columns")
                              }}</span>
                            </CFormLabel>
                            <div class="table-responsive">
                              <CSmartTable
                                v-if="record"
                                :items="record.components"
                                :activePage="1"
                                header
                                :columns="columns"
                                columnFilter
                                itemsPerPageSelect
                                :itemsPerPage="5"
                                columnSorter
                                :sorterValue="{
                                  column: 'localId',
                                  state: 'asc',
                                }"
                                pagination
                                ><template #show_representation="{ item }">
                                  <td class="py-2">
                                    <CButton
                                      color="primary"
                                      variant="outline"
                                      square
                                      size="sm"
                                      @click="showRepresentation(item)"
                                      ><span>{{ $t("structural.show") }}</span>
                                    </CButton>
                                  </td>
                                </template>
                              </CSmartTable>
                            </div>
                          </CCol>
                        </CRow>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardText>
            <CButton
              color="primary"
              size="sm"
              @click="handleBack()"
              :disabled="disabled"
              ><span>{{ $t("structural.back") }}</span>
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UnitDataSetView",
  data() {
    const format = (range) => {
      return (
        this.$i18n.t("structural.begin") +
        ": " +
        range[0].toLocaleDateString() +
        " - " +
        this.$i18n.t("structural.end") +
        ": " +
        range[1].toLocaleDateString()
      );
    };
    return {
      columns: [
        {
          key: "localId",
          label: this.$i18n.t("structural.column"),
        },
        {
          key: "name",
          label: this.$i18n.t("structural.name"),
        },
        {
          key: "type",
          label: this.$i18n.t("structural.type"),
        },
        {
          key: "show_representation",
          label: this.$i18n.t("structural.representation"),
          _style: { width: "1%" },
          filter: false,
          sorter: false,
        },
      ],
      disabled: false,
      rangeDate: "",
      format,
    };
  },
  computed: {
    ...mapGetters("unitDataSet", ["unitDataSet"]),
  },
  watch: {
    unitDataSet: function getRange() {
      this.rangeDate = [
        this.unitDataSet.reportingBegin,
        this.unitDataSet.reportingEnd,
      ];
    },
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/unitDataSets");
    },
    showRepresentation(item) {
      this.$router.push(item.representationLink);
    },
  },
  created() {
    this.$store.dispatch("unitDataSet/findById", this.$route.params.id);
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
