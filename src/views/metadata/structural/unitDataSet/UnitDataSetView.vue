<template>
  <CRow v-if="unitDataSet">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3"
      v-if="unitDataSet"
    >
      <div class="p-3">
        <h2 class="display-5">
          <span>{{ unitDataSet.name }}</span>
          <span class="lead"
            >({{ unitDataSet.localId }} {{ unitDataSet.version }} )</span
          >
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
      <CCol class="col-12 mb-3">
        <CCard>
          <CCardHeader class="bg-white">
            <CCardTitle> Dataset Infromation </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CCardText>
              <CRow>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong
                        >{{
                          $t("structural.dataset.exchange_channel")
                        }}:</strong
                      >
                      {{ unitDataSet.exchangeChannel }}
                    </span>
                  </p>
                </CCol>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong
                        >{{
                          $t("structural.dataset.exchange_direction")
                        }}:</strong
                      >
                      {{ unitDataSet.exchangeDirection }}
                    </span>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong>{{ $t("structural.type") }}:</strong>
                      {{ unitDataSet.type }}
                    </span>
                  </p>
                </CCol>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong
                        >{{ $t("structural.dataset.connection") }}:</strong
                      >
                      {{ unitDataSet.connection }}
                    </span>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong
                        >{{
                          $t("structural.dataset.filter_expression")
                        }}:</strong
                      >
                      {{ unitDataSet.filterExpression }}
                    </span>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong
                        >{{
                          $t("structural.dataset.reporting_period")
                        }}:</strong
                      >
                      <date-picker
                        v-model="rangeDate"
                        range
                        autoApply
                        readonly
                        :format="format"
                      />
                    </span>
                  </p>
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
            <CCardTitle> Dataset Structure </CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CCardText>
              <CRow>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong>{{ $t("structural.name") }}:</strong>
                      {{ unitDataSet.structure.name }}
                    </span>
                  </p>
                </CCol>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong>{{ $t("structural.description") }}:</strong>
                      {{ unitDataSet.structure.description }}
                    </span>
                  </p>
                </CCol>
              </CRow>
              <CRow>
                <CCol class="col-md-6 col-sm-12">
                  <p class="lead">
                    <span>
                      <strong>{{ $t("structural.dataset.group") }}:</strong>
                      {{ unitDataSet.structure.group }}
                    </span>
                  </p>
                </CCol>
              </CRow>
              <CCardTitle> Records </CCardTitle>
              <CRow>
                <CCol
                  :sm="6"
                  v-for="record in unitDataSet.structure.logicalRecords"
                  :key="record.id"
                >
                  <CCard class="mb-3 mt-3">
                    <CCardBody>
                      <CCardTitle>
                        <span> {{ record.name }}</span>
                      </CCardTitle>
                      <CCardText>
                        <CRow>
                          <CCol class="col-md-6 col-sm-12">
                            <p class="lead">
                              <span>
                                <strong
                                  >{{
                                    $t("structural.dataset.record.table_name")
                                  }}:</strong
                                >
                                {{ record.localId }}
                              </span>
                            </p>
                          </CCol>
                          <CCol class="col-md-6 col-sm-12">
                            <p class="lead" v-if="record.parentRecord">
                              <span>
                                <strong
                                  >{{
                                    $t("structural.dataset.record.parent")
                                  }}:</strong
                                >
                                {{ record.parentRecord }}
                              </span>
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol class="col-md-6 col-sm-12">
                            <p class="lead">
                              <span>
                                <strong
                                  >{{
                                    $t("structural.dataset.record.unit_type")
                                  }}:</strong
                                >
                                {{ record.unitType }}
                              </span>
                            </p>
                          </CCol>
                        </CRow>
                        <div class="table-responsive">
                          <CSmartTable
                            v-if="record"
                            :items="record.components"
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
                            <template #show_representation="{ item }">
                              <td class="py-2">
                                <CButton
                                  color="primary"
                                  variant="outline"
                                  square
                                  size="sm"
                                  @click="showRepresentation(item)"
                                >
                                  Show
                                </CButton>
                              </td>
                            </template>
                          </CSmartTable>
                        </div>
                      </CCardText>
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
          label: "Column",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "type",
          label: "Type",
        },
        {
          key: "show_representation",
          label: "Representation",
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
