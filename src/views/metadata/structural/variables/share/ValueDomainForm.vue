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
          :placeholder="'Value domain name'"
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
          :placeholder="'Value domain description'"
          v-model.trim="valueDomainDescription"
        />
      </CForm>
      <CForm class="mb-3">
        <CFormLabel for="scope">
          <span>Value domain scope*</span>
        </CFormLabel>
        <v-select
          id="scope"
          label="label"
          :options="valueDomainScopes"
          v-model="valueDomainScope"
          :class="{ 'is-invalid': v$.valueDomainScope.$error }"
          :placeholder="'Select the scope'"
          :disabled="isEdit"
        ></v-select>
        <span class="text-danger" v-if="v$.valueDomainScope.$error">
          Please select a scope for the value domain.
        </span>
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
      <CForm class="mb-3">
        <CFormLabel for="scope">
          <span
            >Value domain enumeration type
            {{ valueDomainType?.value === "ENUMERATED" ? "*" : "" }}</span
          >
        </CFormLabel>
        <v-select
          id="scope"
          label="label"
          :options="valueDomainEnumerationTypes"
          v-model="valueDomainEnumerationType"
          :class="{ 'is-invalid': v$.valueDomainEnumerationType?.$error }"
          :placeholder="'Select the enumeration'"
          @input="resetNodeSetAndLevels"
          :disabled="isEdit"
        ></v-select>
        <span class="text-danger" v-if="v$.valueDomainEnumerationType?.$error">
          Please select the enumeration for the value domain.
        </span>
      </CForm>
      <CForm class="mb-3">
        <CFormLabel for="expression">
          <span
            >Expression
            {{ valueDomainType?.value === "DESCRIBED" ? "*" : "" }}
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
          :options="valueDomainDataTypes"
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
      <CForm class="mb-3" v-if="statisticalClassifications || codeLists">
        <CFormLabel for="nodeSet">
          <span>
            Node set
            {{
              this.valueDomainType?.value === "ENUMERATED" &&
              this.valueDomainScope?.value === "SUBSTANTIVE"
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
            valueDomainEnumerationType?.value === 'CODE_LIST' ||
            valueDomainScope?.value === 'SENTINEL'
              ? codeLists
              : statisticalClassifications
          "
          @search="searchNodeSet"
          @input="setNodeSet"
          v-model="valueDomainNodeSet"
          :placeholder="'Select node set'"
          :disabled="isEdit || valueDomainType?.value === 'DESCRIBED'"
        ></v-select>
        <span class="text-danger" v-if="v$.valueDomainNodeSet?.$error">
          Please select the node set.
        </span>
      </CForm>
      <CForm
        class="mb-3"
        v-if="
          valueDomainEnumerationType?.value === 'STATISTICAL_CLASSIFICATION' &&
          statisticalClassification?.levels
        "
        ><CFormLabel for="levels">
          <span>Level*</span>
        </CFormLabel>
        <v-select
          id="levels"
          label="name"
          :filterable="false"
          :options="statisticalClassification.levels"
          v-model="valueDomainLevel"
          :placeholder="'Select level'"
          :disabled="isEdit || valueDomainType?.value === 'DESCRIBED'"
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
import _ from "lodash";

export default {
  name: "ValueDomainForm",
  props: ["isEdit", "showDiealog", "selectedValueDomainScope"],
  emits: ["success", "close"],
  watch: {
    selectedValueDomainScope(newSelectedValue) {
      this.valueDomainScope = {
        label: newSelectedValue?.toUpperCase(),
        value: newSelectedValue?.toUpperCase(),
      };
    },
  },
  data() {
    return {
      v$: useValidate(),
      disabled: false,
      valueDomainLocalID: "",
      valueDomainName: "",
      valueDomainDescription: "",
      valueDomainType: "",
      valueDomainScope: "",
      valueDomainEnumerationType: "",
      valueDomainExpresion: "",
      valueDomainDataType: "STRING",
      valueDomainMeasurementUnit: "",
      valueDomainNodeSet: "",
      valueDomainLevel: "",

      valueDomainScopes: [
        { label: "SENTINEL", value: "SENTINEL" },
        { label: "SUBSTANTIVE", value: "SUBSTANTIVE" },
      ],
      valueDomainTypes: [
        {
          label: "DESCRIBED",
          value: "DESCRIBED",
        },
        {
          label: "ENUMERATED",
          value: "ENUMERATED",
        },
      ],
      valueDomainEnumerationTypes: [
        {
          label: "CODE_LIST",
          value: "CODE_LIST",
        },
        {
          label: "STATISTICAL_CLASSIFICATION",
          value: "STATISTICAL_CLASSIFICATION",
        },
      ],
      valueDomainDataTypes: [
        {
          label: "INT",
          value: "INT",
        },
        {
          label: "SMALLINT",
          value: "SMALLINT",
        },
        {
          label: "LONG",
          value: "LONG",
        },
        {
          label: "DOUBLE",
          value: "DOUBLE",
        },
        {
          label: "FLOAT",
          value: "FLOAT",
        },
        {
          label: "BOOLEAN",
          value: "BOOLEAN",
        },
        {
          label: "CHAR",
          value: "CHAR",
        },
        {
          label: "STRING",
          value: "STRING",
        },
      ],
    };
  },
  validations() {
    const validations = {};
    validations.valueDomainLocalID = { required };
    validations.valueDomainName = { required };
    validations.valueDomainScope = { required };
    validations.valueDomainDataType = { required };
    validations.valueDomainType = { required };
    validations.valueDomainMeasurementUnit = { required };
    if (this.valueDomainType?.value === "DESCRIBED") {
      validations.valueDomainExpresion = { required };
    }
    if (this.valueDomainType?.value === "ENUMERATED") {
      validations.valueDomainEnumerationType = { required };
    }
    if (
      this.valueDomainType?.value === "ENUMERATED" &&
      this.valueDomainScope?.value === "SUBSTANTIVE"
    ) {
      validations.valueDomainNodeSet = { required };
    }
    if (
      this.valueDomainEnumerationType?.value === "STATISTICAL_CLASSIFICATION" &&
      this.valueDomainType?.value === "SUBSTANTIVE"
    ) {
      validations.valueDomainLevel = { required };
    }
    return validations;
  },
  methods: {
    resetNodeSetAndLevels() {
      this.valueDomainNodeSet = "";
      this.valueDomainLevel = "";
    },
    searchNodeSet(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        var formData = {
          name,
        };
        if (
          vm.valueDomainEnumerationType?.value === "CODE_LIST" ||
          vm.valueDomainScope?.value === "SENTINEL"
        ) {
          vm.$store.dispatch("codeList/findByName", formData).then(() => {
            loading(false);
          });
        } else {
          vm.$store
            .dispatch("statisticalClassification/findByName", formData)
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
          this.valueDomainEnumerationType?.value ===
            "STATISTICAL_CLASSIFICATION" &&
          selectedValue?.id
        ) {
          this.$store.dispatch(
            "statisticalClassification/findById",
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
          type: this.valueDomainType.value,
          scope: this.valueDomainScope.value,
          // enumeration: this.valueDomainEnumerationType?.value ?? "",
          expression: this.valueDomainExpresion ?? "",
          dataType: this.valueDomainDataType.value,
          measurementUnitId: this.valueDomainMeasurementUnit.id,
          nodesetId: this.valueDomainNodeSet?.id ?? "",
          levelId: this.valueDomainLevel?.id ?? "",
        };
        this.$store.dispatch("valueDomain/save", formData).then(() => {
          this.$emit("success", formData);
        });
      }
    },
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("measurementUnit", ["measurementUnits"]),
    ...mapGetters("statisticalClassification", [
      "statisticalClassifications",
      "statisticalClassification",
    ]),
    ...mapGetters("codeList", ["codeLists"]),
  },
  created() {
    this.$store.dispatch("measurementUnit/findAll");
  },
};
</script>
