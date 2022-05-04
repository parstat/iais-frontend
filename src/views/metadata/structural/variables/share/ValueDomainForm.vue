<template>
  <CModal backdrop="static" :visible="showDiealog" @close="closeDialog">
    <CModalHeader>
      <CModalTitle>
        <span>{{ $t("structural.value_domain") }}</span>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="mb-3">
        <CFormLabel for="localId">
          <span>{{ $t("structural.local_ID") }}*</span>
        </CFormLabel>
        <input
          id="localId"
          type="text"
          class="form-control capitalize"
          :class="{ 'is-invalid': v$.valueDomainLocalID.$error }"
          :placeholder="$t('structural.local_ID')"
          v-model.trim="valueDomainLocalID"
          :disabled="isEdit"
        />
        <span class="text-danger" v-if="v$.valueDomainLocalID.$error">
          {{ $t("structural.validations.local_ID") }}
        </span>
      </CForm>
      <CForm class="mb-3">
        <CFormLabel for="name">
          <span>{{ $t("structural.name") }}*</span>
        </CFormLabel>
        <input
          id="name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.valueDomainName.$error }"
          :placeholder="$t('structural.value_domain_name')"
          v-model.trim="valueDomainName"
        />
        <span class="text-danger" v-if="v$.valueDomainName.$error">
          Please enter a name for the Value Domain.
        </span>
      </CForm>
      <CForm class="mb-3">
        <CFormLabel for="description">
          <span>{{ $t("structural.description") }}</span>
        </CFormLabel>
        <textarea
          rows="5"
          id="description"
          type="text"
          class="form-control"
          :placeholder="$t('structural.value_domain_description')"
          v-model.trim="valueDomainDescription"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormLabel for="type">
          <span>Value domain type*</span>
        </CFormLabel>
        <v-select
          id="type"
          label="label"
          :options="valueDomainTypes"
          v-model="valueDomainType"
          :class="{ 'is-invalid': v$.valueDomainType.$error }"
          :placeholder="'Select the type of the value domain'"
          :disabled="isEdit"
        ></v-select>
        <span class="text-danger" v-if="v$.valueDomainType.$error">
          Please select a type for the value domain.
        </span>
      </CForm>
      <CForm class="mb-3" v-if="valueDomainType === 'ENUMERATED'">
        <CFormLabel for="scope">
          <span
            >Value domain enumeration type
            {{ valueDomainType === "ENUMERATED" ? "*" : "" }}</span
          >
        </CFormLabel>
        <v-select
          id="scope"
          label="label"
          :options="nodeSetTypes"
          v-model="nodeSetType"
          :class="{ 'is-invalid': v$.nodeSetType?.$error }"
          :placeholder="'Select the enumeration'"
          @input="resetNodeSetAndLevels"
          :disabled="isEdit"
        ></v-select>
        <span class="text-danger" v-if="v$.nodeSetType?.$error">
          Please select the enumeration for the value domain.
        </span>
      </CForm>
      <CForm class="mb-3" v-if="valueDomainType === 'DESCRIBED'">
        <CFormLabel for="expression">
          <span
            >Expression
            {{ valueDomainType === "DESCRIBED" ? "*" : "" }}
          </span>
        </CFormLabel>
        <input
          id="expression"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': v$.valueDomainExpresion?.$error }"
          :placeholder="'Value domain expression'"
          v-model.trim="valueDomainExpresion"
          :disabled="isEdit"
        />
        <span class="text-danger" v-if="v$.valueDomainExpresion?.$error">
          Please enter a name for the Value Domain.
        </span>
      </CForm>
      <CForm class="mb-3">
        <CFormLabel for="dataType">
          <span>Value domain data type*</span>
        </CFormLabel>
        <v-select
          id="dataType"
          label="label"
          :options="dataTypes"
          v-model="valueDomainDataType"
          :class="{ 'is-invalid': v$.valueDomainDataType.$error }"
          :placeholder="'Select the enumeration'"
          :disabled="isEdit"
        ></v-select>
        <span class="text-danger" v-if="v$.valueDomainDataType.$error">
          Please select the data type for the value domain.
        </span>
      </CForm>
      <CForm class="mb-3" v-if="measurementUnits">
        <CFormLabel for="measurementUnit">
          <span>Measurement unit*</span>
        </CFormLabel>
        <v-select
          id="measurementUnit"
          label="name"
          :options="measurementUnits"
          v-model="valueDomainMeasurementUnit"
          :class="{ 'is-invalid': v$.valueDomainMeasurementUnit.$error }"
          :placeholder="'Select a measurement unit'"
          :disabled="isEdit"
        ></v-select>
        <span class="text-danger" v-if="v$.valueDomainMeasurementUnit.$error">
          Please select a measurement unit
        </span>
      </CForm>
      <CForm
        class="mb-3"
        v-if="
          valueDomainType === 'ENUMERATED' &&
          (codeLists || statisticalClassifications)
        "
      >
        <CFormLabel for="nodeSet">
          <span>
            Node set
            {{
              this.valueDomainType === "ENUMERATED" &&
              this.selectedValueDomainScope === "SUBSTANTIVE"
                ? "*"
                : ""
            }}
          </span>
        </CFormLabel>
        <v-select
          id="nodeSet"
          label="name"
          :filterable="false"
          :options="
            nodeSetType === 'CODE_LIST' ||
            selectedValueDomainScope === 'SENTINEL'
              ? codeLists
              : statisticalClassifications
          "
          @search="searchNodeSet"
          @input="setNodeSet"
          v-model="valueDomainNodeSet"
          :placeholder="'Select node set'"
          :disabled="isEdit || valueDomainType === 'DESCRIBED'"
        ></v-select>
        <span class="text-danger" v-if="v$.valueDomainNodeSet?.$error">
          Please select the node set.
        </span>
      </CForm>
      <CForm
        class="mb-3"
        v-if="
          nodeSetType === 'STATISTICAL_CLASSIFICATION' &&
          statisticalClassificationLevels?.length
        "
        ><CFormLabel for="levels">
          <span>Level*</span>
        </CFormLabel>
        <v-select
          id="levels"
          label="name"
          :filterable="false"
          :options="statisticalClassificationLevels"
          v-model="valueDomainLevel"
          :placeholder="'Select level'"
          :disabled="isEdit || valueDomainType === 'DESCRIBED'"
        ></v-select>
        <span class="text-danger" v-if="v$.valueDomainLevel?.$error">
          Please select the level.
        </span>
      </CForm>
    </CModalBody>

    <CModalFooter>
      <CButton color="secondary" @click="closeDialog"
        ><span>{{ $t("structural.close") }}</span>
      </CButton>
      <CButton color="primary" @click="handleSubmit">
        <span>{{ $t("referential.add") }}</span>
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import { DataType } from "@/common";
import { ValueDomainType } from "@/common";
import { NodeSetType } from "@/common";
import _ from "lodash";

export default {
  name: "ValueDomainForm",
  props: ["isEdit", "showDiealog", "selectedValueDomainScope"],
  emits: ["success", "close"],
  data() {
    return {
      v$: useValidate(),
      disabled: false,
      valueDomainLocalID: "",
      valueDomainName: "",
      valueDomainDescription: "",
      valueDomainType: "",
      nodeSetType: "",
      valueDomainExpresion: "",
      valueDomainDataType: "STRING",
      valueDomainMeasurementUnit: "",
      valueDomainNodeSet: null,
      valueDomainLevel: null,
    };
  },
  validations() {
    const validations = {};
    validations.valueDomainLocalID = { required };
    validations.valueDomainName = { required };
    validations.valueDomainDataType = { required };
    validations.valueDomainType = { required };
    validations.valueDomainMeasurementUnit = { required };
    if (this.valueDomainType === "DESCRIBED") {
      validations.valueDomainExpresion = { required };
    }
    if (this.valueDomainType === "ENUMERATED") {
      validations.nodeSetType = { required };
    }
    if (
      this.valueDomainType === "ENUMERATED" &&
      this.selectedValueDomainScope === "SUBSTANTIVE"
    ) {
      validations.valueDomainNodeSet = { required };
    }
    if (
      this.nodeSetType === "STATISTICAL_CLASSIFICATION" &&
      this.valueDomainType === "SUBSTANTIVE"
    ) {
      validations.valueDomainLevel = { required };
    }
    return validations;
  },
  methods: {
    resetNodeSetAndLevels() {
      this.valueDomainNodeSet = null;
      this.valueDomainLevel = null;
    },
    searchNodeSet(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        if (
          vm.nodeSetType === "CODE_LIST" ||
          vm.selectedValueDomainScope === "SENTINEL"
        ) {
          vm.$store.dispatch("codeList/findByName", escape(name)).then(() => {
            loading(false);
          });
        } else {
          vm.$store
            .dispatch("statisticalClassification/findByName", escape(name))
            .then(() => {
              loading(false);
            });
        }
      } else {
        loading(false);
      }
    }, 500),
    setNodeSet(selectedValue) {
      console.log(selectedValue);
      if (
        typeof selectedValue !== "undefined" &&
        selectedValue &&
        !(selectedValue instanceof InputEvent)
      ) {
        this.valueDomainNodeSet = selectedValue;
        if (
          this.nodeSetType === "STATISTICAL_CLASSIFICATION" &&
          selectedValue?.id
        ) {
          this.$store.dispatch(
            "statisticalClassification/findLevels",
            selectedValue.id
          );
        }
      }
    },
    closeDialog() {
      this.$emit("close");
    },
    handleSubmit() {
      this.v$.$validate();
      console.log(this.v$);
      if (!this.v$.$invalid) {
        const formData = {
          localId: this.valueDomainLocalID,
          name: this.valueDomainName,
          description: this.valueDomainDescription ?? "",
          type: this.valueDomainType,
          scope: this.selectedValueDomainScope,
          // enumeration: this.nodeSetType?.value ?? "",
          expression: this.valueDomainExpresion ?? "",
          dataType: this.valueDomainDataType,
          measurementUnitId: this.valueDomainMeasurementUnit.id,
          nodesetId: this.valueDomainNodeSet?.id ?? null,
          levelId: this.valueDomainLevel?.id ?? null,
        };
        this.$store.dispatch("valueDomain/save", formData).then((id) => {
          formData.id = id;
          this.$emit("success", formData);
        });
      }
    },
    resetForm() {
      this.disabled = false;
      this.valueDomainLocalID = "";
      this.valueDomainName = "";
      this.valueDomainDescription = "";
      this.valueDomainType = "";
      this.nodeSetType = "";
      this.valueDomainExpresion = "";
      this.valueDomainDataType = {
        label: "STRING",
        value: "STRING",
      };
      this.valueDomainMeasurementUnit = "";
      this.valueDomainNodeSet = null;
      this.valueDomainLevel = null;
    },
  },
  computed: {
    dataTypes() {
      var types = [];
      for (const key of Object.keys(DataType)) {
        types.push(DataType[key]);
      }
      return types;
    },
    valueDomainTypes() {
      var types = [];
      for (const key of Object.keys(ValueDomainType)) {
        types.push(ValueDomainType[key]);
      }
      return types;
    },
    nodeSetTypes() {
      var types = [];
      for (const key of Object.keys(NodeSetType)) {
        types.push(NodeSetType[key]);
      }
      return types;
    },
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("measurementUnit", ["measurementUnits"]),
    ...mapGetters("statisticalClassification", [
      "statisticalClassifications",
      "statisticalClassificationLevels",
    ]),
    ...mapGetters("codeList", ["codeLists"]),
  },
  created() {
    this.$store.dispatch("measurementUnit/findAll");
  },
};
</script>
