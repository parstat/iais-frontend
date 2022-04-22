<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CCardTitle>
          <span>{{ $t("structural.variable.text") }}</span>
        </CCardTitle>
        <CForm class="mb-3">
          <CFormLabel for="name">
            <span>{{ $t("structural.name") }}*</span>
          </CFormLabel>
          <input
            id="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': v$.selectedName.$error }"
            :placeholder="$t('structural.variable.name')"
            v-model.trim="selectedName"
          />
          <span class="text-danger" v-if="v$.selectedName.$error">
            {{ $t("structural.validations.variable.name") }}
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
            :placeholder="$t('structural.variable_description')"
            v-model.trim="selectedDescription"
          />
        </CForm>
        <CForm class="mb-3">
          <CFormLabel for="definition">
            <span>{{ $t("structural.definition") }}</span>
          </CFormLabel>
          <input
            id="definition"
            type="text"
            class="form-control"
            :placeholder="$t('structural.variable.definition')"
            v-model.trim="selectedDefinition"
          />
        </CForm>
        <CForm class="mb-3">
          <CFormLabel for="localId">
            <span>{{ $t("structural.local_ID") }}*</span>
          </CFormLabel>
          <input
            id="localId"
            type="text"
            class="form-control capitalize"
            :class="{ 'is-invalid': v$.selectedLocalId.$error }"
            :placeholder="$t('structural.local_ID')"
            v-model.trim="selectedLocalId"
            :disabled="isEdit"
          />
          <span class="text-danger" v-if="v$.selectedLocalId.$error">
            {{ $t("structural.validations.local_ID") }}
          </span>
        </CForm>
        <CForm v-if="unitTypes">
          <CFormLabel for="measures">
            <span>{{ $t("structural.measures") }}*</span>
          </CFormLabel>
          <v-select
            label="name"
            :options="unitTypes"
            v-model="selectedMeasure"
            :class="{ 'is-invalid': v$.selectedMeasure.$error }"
            :placeholder="$t('structural.selection.measure')"
            :disabled="isEdit"
          ></v-select>
          <span class="text-danger" v-if="v$.selectedMeasure.$error">
            {{ $t("structural.validations.unit_type") }}
          </span>
        </CForm>
        <div class="form-mandatory mt-3">
          <span>*{{ $t("structural.mandatory_fields") }}</span>
        </div>
      </CCardText>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="next"
        :disabled="disabled"
        ><span>{{ $t("referential.next") }}</span>
      </CButton>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
// import { Context } from "@/common";

export default {
  name: "VariableBasic",
  props: ["isEdit", "name", "localId", "description", "definition", "measures"],

  data() {
    return {
      v$: useValidate(),
      selectedName: this.name ?? "",
      selectedDescription: this.description ?? "",
      selectedLocalId: this.localId ?? "",
      selectedDefinition: this.definition ?? "",
      selectedMeasure: this.measures ?? "",
      disabled: false,
    };
  },
  validations: {
    selectedName: {
      required,
    },
    selectedLocalId: {
      required,
    },
    selectedMeasure: {
      required,
    },
  },
  methods: {
    next() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.selectedName,
          localId: this.selectedLocalId.toUpperCase(),
          description: this.selectedDescription ?? "",
          definition: this.selectedDefinition ?? "",
          measuresId: this.selectedMeasure.id,
        };
        this.$emit("next", formData);
        this.disabled = false;
        console.log(this.selectedMeasure);
      }
    },
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("unitType", ["unitTypes"]),
  },
  created() {
    this.$store.dispatch("unitType/findAll");
  },
};
</script>
