<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.unit_data_sets") }}</span>
          </CCardTitle>
          <CCardText v-if="unitDataSet">
            <app-unit-data-set-basic-component
              :isDelete="true"
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
            ></app-unit-data-set-basic-component>
          </CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import UnitDataSetBasic from "./shared/UnitDataSetBasic.vue";

export default {
  name: "UnitDataSetDelete",
  components: {
    "app-unit-data-set-basic-component": UnitDataSetBasic,
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
