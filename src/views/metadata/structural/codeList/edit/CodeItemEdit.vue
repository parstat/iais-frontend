<template>
  <CModal :visible="showEditDialog" backdrop="static" @close="closeDialog()">
    <CModalHeader>
      <CModalTitle>Edit Code Item</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <label for="code">Code*</label>
        <input
          id="code"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': v$.codeName.$error,
            'mb-3': !v$.codeName.$error,
          }"
          placeholder="Code item code"
          v-model.trim="codeName"
        />
        <div class="text-danger mb-3" v-if="v$.codeName.$error">
          Please enter a code for the code item.
        </div>
      </CForm>
      <CForm>
        <label for="label">Label*</label>
        <input
          id="label"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': v$.label.$error,
            'mb-3': !v$.label.$error,
          }"
          placeholder="Code label"
          v-model.trim="label"
        />
        <div class="text-danger mb-3" v-if="v$.label.$error">
          Please enter a label.
        </div>
      </CForm>
      <CForm>
        <label for="description">Description*</label>
        <textarea
          rows="5"
          id="description"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': v$.description.$error,
            'mb-3': !v$.description.$error,
          }"
          placeholder="Unit type description"
          v-model.trim="description"
        />
        <div class="text-danger mb-3" v-if="v$.description.$error">
          Please enter a description.
        </div>
      </CForm>
      <div class="form-mandatory">
        <span>*Mandatory fields</span>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeDialog()"> Close </CButton>
      <CButton color="primary" @click="editCodeItem()">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  inheritAttrs: false,
  name: "CodeItemEdit",
  props: ["showEditDialog", "item"],
  emits: ["closeDialog", "codeItemUpdated"],
  watch: {
    item: function (newVal) {
      this.codeName = newVal.code;
      this.description = newVal.description;
      this.label = newVal.value;
    },
  },
  data(instance) {
    console.log(this.item);
    return {
      v$: useValidate(),
      codeName: instance.item?.code,
      description: instance.item?.description,
      label: instance.item?.value,
    };
  },
  validations: {
    codeName: {
      required,
    },
    description: {
      required,
    },
    label: {
      required,
    },
  },
  methods: {
    closeDialog() {
      console.log(this.item);
      this.$emit("closeDialog");
    },
    editCodeItem() {
      const formData = {
        id: this.item.id,
        codeName: this.codeName,
        description: this.description,
        label: this.label,
      };
      this.$store.dispatch("code/updateCodeItem", formData).then(() => {
        this.$emit("codeItemUpdated");
      });
    },
  },
};
</script>
<style></style>
