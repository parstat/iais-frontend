<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CCardTitle>
          <span>Data structure</span>
        </CCardTitle>
        <CForm>
          <label for="localId">Local id*</label>
          <input
            id="localId"
            type="text"
            class="form-control capitalize"
            :class="{
              'is-invalid': v$.localId.$error,
              'mb-3': !v$.localId.$error,
            }"
            placeholder="Local id"
            v-model.trim="localId"
            :disabled="isEdit || isDelete"
          />
          <div class="text-danger mb-3" v-if="v$.localId.$error">
            Please specify the local id.
          </div>
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
            placeholder="Data structure name"
            v-model.trim="name"
            :disabled="isDelete"
          />
          <div class="text-danger mb-3" v-if="v$.name.$error">
            Please enter a name for the data structure.
          </div>
        </CForm>
        <CForm>
          <label for="description">Description</label>
          <textarea
            rows="5"
            id="description"
            type="text"
            class="form-control mb-3"
            placeholder="Data structure description"
            v-model.trim="description"
            :disabled="isDelete"
          />
        </CForm>
        <CForm>
          <label for="version">Version</label>
          <input
            id="version"
            type="text"
            class="form-control mb-3"
            placeholder="Data structure version"
            v-model.trim="version"
            :disabled="isDelete"
          />
        </CForm>
        <CForm>
          <CFormLabel for="versionDate">
            <span>Version date</span>
          </CFormLabel>
          <Datepicker id="versionDate" class="mb-3" v-model="versionDate" />
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
            :disabled="isDelete"
          ></textarea>
        </CForm>
      </CCardText>
      <CButton
        v-if="!isDelete"
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="handleSave()"
        :disabled="disabled"
        >Next</CButton
      >
    </CCardBody>
  </CCard>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { DataSetType } from "@/common";

export default {
  name: "DatastructureBasic",
  props: [
    "isEdit",
    "isDelete",
    "selectedLocalId",
    "selectedName",
    "selectedDescription",
    "selectedVersion",
    "selectedVersionDate",
    "selectedVersionRationale",
  ],
  emits: ["next"],
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      localId: this.selectedLocalId ? this.selectedLocalId.toUpperCase() : "",
      name: this.selectedName ?? "",
      description: this.selectedDescription ?? "",
      version: this.selectedVersion ?? "",
      versionDate: this.selectedVersionDate ?? "",
      versionRationale: this.selectedVersionRationale ?? "",
    };
  },
  validations: {
    localId: {
      required,
    },
    name: {
      required,
    },
  },
  methods: {
    handleSave() {
      this.v$.$validate();
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          localId: this.localId.toUpperCase(),
          name: this.name,
          description: this.description,
          version: this.version,
          versionDate:
            this.versionDate instanceof Date
              ? this.versionDate.toISOString()
              : this.versionDate,
          versionRationale: this.versionRationale,
          type: DataSetType.unit,
        };
        if (this.isEdit) {
          formData.id = this.$route.params.id;
          this.$store.dispatch("dataStructure/update", formData).then(() => {
            this.$emit("next");
          });
        } else {
          this.$store.dispatch("dataStructure/save", formData);
        }
        console.log(formData);
      }
    },
  },
};
</script>

<style scoped>
.capitalize {
  text-transform: uppercase;
}
</style>
