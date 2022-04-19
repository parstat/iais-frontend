<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CCardTitle>
          <span>{{ $t("structural.variable") }}</span>
        </CCardTitle>
        <CForm class="mb-3">
          <CFormLabel for="name">
            <span>{{ $t("structural.name") }}*</span>
          </CFormLabel>
          <input
            id="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': v$.name.$error }"
            :placeholder="$t('structural.variable_name')"
            v-model.trim="selectedName"
          />
          <span class="text-danger" v-if="v$.name.$error">
            {{ $t("structural.validations.variable_name") }}
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
            :placeholder="$t('structural.variable_definition')"
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
            :class="{ 'is-invalid': v$.localId.$error }"
            :placeholder="$t('structural.local_ID')"
            v-model.trim="selectedLocalId"
          />
          <span class="text-danger" v-if="v$.localId.$error">
            <span>{{ $t("structural.validations.local_ID") }}</span>
          </span>
        </CForm>
        <div class="form-mandatory">
          <span>*{{ $t("structural.mandatory_fields") }}</span>
        </div>
      </CCardText>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click.prevent="next"
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
  props: ["name", "localId", "description", "definition"],

  data() {
    return {
      v$: useValidate(),
      selectedName: this.name ?? "",
      selectedDescription: this.description ?? "",
      selectedLocalId: this.localId ?? "",
      selectedDefinition: this.definition ?? "",
      disabled: false,
    };
  },
  validations: {
    name: {
      required,
    },
    localId: {
      required,
    },
  },
  methods: {
    next() {
      this.disabled = true; //disable buttons
      const formData = {
        name: this.selectedName,
        localId: this.selectedLocalId,
        description: this.selectedDescription ?? "",
        definition: this.definition ?? "",
      };
      this.$emit("next", formData);
      this.disabled = false;
    },
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
  },
};
</script>
