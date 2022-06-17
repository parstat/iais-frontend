<template>
  <CRow v-if="dimensionalDataSet">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3"
      v-if="dimensionalDataSet"
    >
      <div class="p-3">
        <h2 class="display-5">
          <span>{{ dimensionalDataSet.name }}</span>
          <span class="lead">
            ({{ dimensionalDataSet.localId }} {{ dimensionalDataSet.version }} )
          </span>
        </h2>
        <p class="lead" v-if="dimensionalDataSet.description">
          <span>
            <strong>{{ $t("structural.description") }}:</strong>
            {{ dimensionalDataSet.description }}
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
                    :value="dimensionalDataSet.exchangeChannel"
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
                    :value="dimensionalDataSet.exchangeDirection"
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
                    :value="dimensionalDataSet.type"
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
                    :value="dimensionalDataSet.connection"
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
                    :value="dimensionalDataSet.filterExpression"
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
                    :value="dimensionalDataSet.structure.name"
                    readonly
                  />
                </CCol>
                <CCol
                  class="col-md-6 col-sm-12 col-12 mb-3"
                  v-if="dimensionalDataSet.structure.description"
                >
                  <CFormLabel for="structureDescription" class="col-form-label">
                    <span>{{ $t("structural.description") }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="structureDescription"
                    :value="dimensionalDataSet.structure.description"
                    readonly
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol
                  class="col-md-6 col-sm-12 mb-3"
                  v-if="dimensionalDataSet.structure.group"
                  ><CFormLabel for="structureGroup" class="col-form-label">
                    <span>{{ $t("structural.dataset.group") }}</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="structureGroup"
                    :value="dimensionalDataSet.structure.group"
                    readonly
                  />
                </CCol>
              </CRow>
              <CCardTitle>
                <span>Components</span>
              </CCardTitle>
              <CRow>
                <CCol sm="6">
                  <CSmartTable
                    v-if="dimensionalDataSet?.structure?.components?.length"
                    :items="dimensionalDataSet.structure.components"
                    :activePage="1"
                    header
                    :columns="columns"
                    columnFilter
                    itemsPerPageSelect
                    :itemsPerPage="5"
                    columnSorter
                    :sorterValue="{
                      column: 'type',
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
  name: "DimensionalDataSetView",
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
    ...mapGetters("dimensionalDataSet", ["dimensionalDataSet"]),
  },
  watch: {
    dimensionalDataSet: function getRange() {
      this.rangeDate = [
        this.dimensionalDataSet.reportingBegin,
        this.dimensionalDataSet.reportingEnd,
      ];
    },
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/dimensionalDataSets");
    },
    showRepresentation(item) {
      this.$router.push(item.representationLink);
    },
  },
  created() {
    this.$store.dispatch("dimensionalDataSet/findById", this.$route.params.id);
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
