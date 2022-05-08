<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Unit data sets</span>
          </CCardTitle>
          <CCardText v-if="unitDataSet">
            <app-unit-data-set-form-component
              :isEdit="true"
              :selectedLocalId="unitDataSet.localId"
              :selectedStructure="unitDataSet.structure"
              :selectedStatisticalProgramLink="
                unitDataSet.statisticalProgramLink
              "
              :selectedName="unitDataSet.name"
              :selectedDescription="unitDataSet.description"
              :selectedVersion="unitDataSet.version"
              :selectedVersionDate="unitDataSet.versionDate"
              :selectedVersionRationale="unitDataSet.versionRationale"
              :selectedExchangeChannel="unitDataSet.exchangeChannel"
              :selectedExchangeDirection="unitDataSet.exchangeDirection"
              :selectedReportingBegin="unitDataSet.reportingBegin"
              :selectedReportingEnd="unitDataSet.reportingEnd"
              :selectedConnection="unitDataSet.connection"
              :selectedFilterExpression="unitDataSet.filterExpression"
            ></app-unit-data-set-form-component>
          </CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import UnitDataSetForm from "./shared/UnitDataSetForm.vue";

export default {
  name: "UnitDataSetEdit",
  components: {
    "app-unit-data-set-form-component": UnitDataSetForm,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters("unitDataSet", ["unitDataSet"]),
  },
  created() {
    this.$store.dispatch("unitDataSet/findById", this.$route.params.id);
  },
};
</script>
