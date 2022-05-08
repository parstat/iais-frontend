<template>
  <div v-if="dataStructures">
    <CForm>
      <label for="localId">Local id*</label>
      <input
        id="localId"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': v$.localId.$error,
          'mb-3': !v$.localId.$error,
        }"
        placeholder="Local ID"
        v-model.trim="localId"
        :disabled="isEdit"
      />
      <div class="text-danger mb-3" v-if="v$.name.$error">
        Please enter a local ID.
      </div>
    </CForm>
    <CForm>
      <CFormLabel for="dataStructure">
        <span>Data structure*</span>
      </CFormLabel>
      <v-select
        label="name"
        :options="dataStructures"
        v-model="dataStructure"
        class="mb-3"
        :class="{ 'is-invalid': v$.structureId.$error }"
        :placeholder="'Select data structure'"
        @search="searchDataStructure"
        @input="setStructure"
        :disabled="isEdit"
      ></v-select>
      <span class="text-danger" v-if="v$.structureId.$error">
        Please select a data structure
      </span>
    </CForm>
    <CForm>
      <CFormLabel for="type">
        <span>Statsitcal program*</span>
      </CFormLabel>
      <v-select
        label="name"
        :options="statisticalPrograms"
        v-model="statisticalProgramHolder"
        class="mb-3"
        :class="{ 'is-invalid': v$.statisticalProgramId.$error }"
        :placeholder="'Select a statistical program'"
        @search="searchStatisticalProgram"
        @input="setStatisticalProgram"
        :disabled="isEdit"
      ></v-select>
      <span class="text-danger" v-if="v$.statisticalProgramId.$error">
        Please select a statistical program
      </span>
    </CForm>
    <CForm>
      <label for="name">Name*</label>
      <input
        id="name"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': v$.name.$error,
          'mb-3': !v$.name.$error,
        }"
        placeholder="Unit data set name"
        v-model.trim="name"
      />
      <div class="text-danger mb-3" v-if="v$.name.$error">
        Please enter a name for the unit data set.
      </div>
    </CForm>
    <CForm>
      <label for="description">Description</label>
      <textarea
        id="description"
        type="text"
        class="form-control mb-3"
        placeholder="Unit data set description"
        v-model.trim="description"
        rows="5"
      ></textarea>
    </CForm>
    <CForm>
      <label for="version">Version</label>
      <input
        id="version"
        type="text"
        class="form-control mb-3"
        placeholder="Unit data set version"
        v-model.trim="version"
      />
    </CForm>
    <CForm>
      <label for="versionRationale">Version rationale</label>
      <textarea
        id="versionRationale"
        type="text"
        class="form-control mb-3"
        placeholder="Unit data set version rationale"
        v-model.trim="versionRationale"
        rows="5"
      ></textarea>
    </CForm>
    <CForm>
      <CFormLabel for="versionDate">
        <span>Version date*</span>
      </CFormLabel>
      <Datepicker id="versionDate" class="mb-3" v-model="versionDate" />
    </CForm>
    <CForm>
      <CFormLabel for="exchangeChannel">
        <span>Exchange Channel*</span>
      </CFormLabel>
      <v-select
        id="exchangeChannel"
        label="label"
        :options="exchangeChannels()"
        v-model="exchangeChannel"
        class="mb-3"
        :class="{ 'is-invalid': v$.exchangeChannel.$error }"
        :placeholder="'Select data structure'"
      ></v-select>
      <span class="text-danger" v-if="v$.exchangeChannel.$error">
        Please select an exchange channel.
      </span>
    </CForm>
    <CForm>
      <CFormLabel for="exchangeDirection">
        <span>Exchange Direction*</span>
      </CFormLabel>
      <v-select
        label="label"
        :options="exchangeDirections()"
        v-model="exchangeDirection"
        class="mb-3"
        :class="{ 'is-invalid': v$.exchangeDirection.$error }"
        :placeholder="'Select data structure'"
      ></v-select>
      <span class="text-danger" v-if="v$.exchangeDirection.$error">
        Please select an exchange direction.
      </span>
    </CForm>
    <CForm>
      <CFormLabel for="reportingDateRange">
        <span>Reporting date from-to*</span>
      </CFormLabel>
      <Datepicker
        id="reportingDateRange"
        class="mb-3"
        range
        v-model="dummyDateHolder"
        @update:modelValue="handleDateSelect"
        @cleared="clearReportingDateRange"
      />
    </CForm>
    <CForm>
      <label for="connection">Connection*</label>
      <input
        id="connection"
        type="text"
        class="form-control"
        :class="{
          'is-invalid': v$.connection.$error,
          'mb-3': !v$.connection.$error,
        }"
        placeholder="Unit data set connection"
        v-model.trim="connection"
      />
      <div class="text-danger mb-3" v-if="v$.connection.$error">
        Please enter a connection for the unit data set.
      </div>
    </CForm>
    <CForm>
      <label for="filterExpression">Filter Expression</label>
      <input
        id="filterExpression"
        type="text"
        class="form-control mb-3"
        placeholder="Unit data set filter expression"
        v-model.trim="filterExpression"
      />
    </CForm>
    <div class="form-mandatory">*Mandatory fields</div>
    <div style="margin-top: 20px">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="handleSave()"
        :disabled="disabled"
        >Save</CButton
      >
      <CButton
        color="danger"
        size="sm"
        @click="handleReset()"
        :disabled="disabled"
        >Reset</CButton
      >
    </div>
  </div>
</template>

<script>
import { ExchangeChannel } from "@/common";
import { ExchangeDirection } from "@/common";
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import _ from "lodash";

export default {
  name: "UnitDataSetShared",
  props: [
    "isEdit",
    "selectedLocalId",
    "selectedStructure",
    "selectedStatisticalProgramLink",
    "selectedName",
    "selectedDescription",
    "selectedVersion",
    "selectedVersionDate",
    "selectedVersionRationale",
    "selectedExchangeChannel",
    "selectedExchangeDirection",
    "selectedReportingBegin",
    "selectedReportingEnd",
    "selectedConnection",
    "selectedFilterExpression",
  ],
  watch: {
    statisticalProgram: function (_new) {
      this.statisticalProgramId = _new.id;
      this.statisticalProgramHolder = _new;
    },
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      localId: this.selectedLocalId ?? "",
      structureId: this.selectedStructure?.id ?? "",
      statisticalProgramId: "",
      name: this.selectedName ?? "",
      description: this.selectedDescription ?? "",
      version: this.selectedVersion ?? "",
      versionDate: this.selectedVersionDate ?? "",
      versionRationale: this.selectedVersionRationale ?? "",
      exchangeChannel: this.selectedExchangeChannel ?? "",
      exchangeDirection: this.selectedExchangeDirection ?? "",
      reportingBegin: this.selectedReportingBegin ?? "",
      reportingEnd: this.selectedReportingEnd ?? "",
      connection: this.selectedConnection ?? "",
      filterExpression: this.selectedFilterExpression ?? "",

      dataStructure: this.selectedStructure ?? null,
      statisticalProgramHolder: null,
      dummyDateHolder:
        this.selectedReportingBegin && this.selectedReportingEnd
          ? [
              new Date(this.selectedReportingBegin),
              new Date(this.selectedReportingEnd),
            ]
          : "",
    };
  },
  validations: {
    localId: {
      required,
    },
    structureId: {
      required,
    },
    statisticalProgramId: {
      required,
    },
    name: {
      required,
    },
    exchangeChannel: {
      required,
    },
    exchangeDirection: {
      required,
    },
    connection: {
      required,
    },
  },
  methods: {
    exchangeChannels() {
      var types = [];
      for (const key of Object.keys(ExchangeChannel)) {
        types.push(ExchangeChannel[key]);
      }
      return types;
    },
    exchangeDirections() {
      var types = [];
      for (const key of Object.keys(ExchangeDirection)) {
        types.push(ExchangeDirection[key]);
      }
      return types;
    },
    handleReset() {
      this.localId = "";
      this.structureId = "";
      this.statisticalProgramId = "";
      this.name = "";
      this.description = "";
      this.version = "";
      this.versionDate = "";
      this.versionRationale = "";
      this.exchangeChannel = "";
      this.exchangeDirection = "";
      this.reportingBegin = "";
      this.reportingEnd = "";
      this.connection = "";
      this.filterExpression = "";
      this.dataStructure = null;
      this.v$.$reset();
    },
    searchDataStructure(name, loading) {
      loading(true);
      this.doSearchDataStructure(name, loading, this);
    },
    doSearchDataStructure: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("dataStructure/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),
    setStructure(option) {
      if (option) {
        this.dataStructure = option;
        this.structureId = option.id;
      }
    },
    searchStatisticalProgram(name, loading) {
      loading(true);
      this.doSearchStatisticalProgram(name, loading, this);
    },
    doSearchStatisticalProgram: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("statisticalProgram/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),
    setStatisticalProgram(option) {
      if (option) {
        this.statisticalProgramHolder = option;
        this.statisticalProgramId = option.id;
      }
    },
    handleDateSelect(data) {
      console.log(data);
      this.reportingBegin =
        data[0] && data[0] instanceof Date ? data[0].toISOString() : "";
      this.reportingEnd =
        data[1] && data[1] instanceof Date ? data[1].toISOString() : "";
    },
    clearReportingDateRange() {
      this.dummyDateHolder = "";
      this.reportingBegin = "";
      this.reportingEnd = "";
    },
    handleSave() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          localId: this.localId,
          structureId: this.structureId,
          statisticalProgramId: this.statisticalProgramId,
          name: this.name,
          description: this.description,
          version: this.version,
          versionDate:
            this.versionDate instanceof Date
              ? this.versionDate.toISOString()
              : this.versionDate,
          versionRationale: this.versionRationale,
          exchangeChannel: this.exchangeChannel,
          exchangeDirection: this.exchangeDirection,
          reportingBegin: this.reportingBegin,
          reportingEnd: this.reportingEnd,
          connection: this.connection,
          filterExpression: this.filterExpression,
        };
        if (this.isEdit && this.$route.params.id) {
          formData.id = this.$route.params.id;
          this.$store.dispatch("unitDataSet/update", formData);
        } else {
          this.$store.dispatch("unitDataSet/save", formData);
        }
        console.log(formData);
      }
    },
  },
  computed: {
    ...mapGetters("dataStructure", ["dataStructures"]),
    ...mapGetters("statisticalProgram", [
      "statisticalPrograms",
      "statisticalProgram",
    ]),
  },
  created() {
    if (this.selectedStatisticalProgramLink) {
      const lastIndexOfSlash =
        this.selectedStatisticalProgramLink.lastIndexOf("/");
      if (
        lastIndexOfSlash !== -1 &&
        lastIndexOfSlash === this.selectedStatisticalProgramLink.length - 2
      ) {
        const idOfStatisticalProgram =
          this.selectedStatisticalProgramLink.substring(lastIndexOfSlash + 1);
        if (idOfStatisticalProgram) {
          this.$store.dispatch(
            "statisticalProgram/findById",
            idOfStatisticalProgram
          );
        }
      }
    }
  },
};
</script>
