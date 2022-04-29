<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CCardTitle> Variable Representation</CCardTitle>
        <CForm class="mb-3">
          <CFormLabel for="name">
            <span>{{ $t("structural.name") }}*</span>
          </CFormLabel>
          <input
            id="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': v$.selectedName.$error }"
            :placeholder="'Variable Representation name'"
            v-model.trim="selectedName"
          />
          <span class="text-danger" v-if="v$.selectedName.$error">
            Please enter a name for the Variable Representation.
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
            :placeholder="'Variable Representation description'"
            v-model.trim="selectedDescription"
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
  name: "VariableRepresentationBasic",
  props: ["isEdit", "name", "localId", "description"],

  data() {
    return {
      v$: useValidate(),
      selectedName: this.name ?? "",
      selectedDescription: this.description ?? "",
      selectedLocalId: this.localId ?? "",
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
  },
  methods: {
    next() {
      this.v$.$touch();
      console.log(this.$route.params);
      if (this.$route.params.id && !this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          variableId: this.$route.params.id,
          name: this.selectedName,
          localId: this.selectedLocalId.toUpperCase(),
          description: this.selectedDescription ?? "",
        };
        this.$emit("next", formData);
        this.disabled = false;
      }
    },
  },
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
  },
};
</script>
