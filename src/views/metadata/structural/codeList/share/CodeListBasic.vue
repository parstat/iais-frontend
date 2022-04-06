<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CForm>
          <label for="localId">Local id*</label>
          <input
            id="localId"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': v$.localLocalId.$error,
              'mb-3': !v$.localLocalId.$error,
            }"
            placeholder="Local id"
            v-model.trim="localLocalId"
            @change="fieldChanged = true"
          />
          <div class="text-danger mb-3" v-if="v$.localLocalId.$error">
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
              'is-invalid': v$.localName.$error,
              'mb-3': !v$.localName.$error,
            }"
            placeholder="Code List name"
            v-model.trim="localName"
            @change="fieldChanged = true"
          />
          <div class="text-danger mb-3" v-if="v$.localName.$error">
            Please enter a name for the code list.
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
              'is-invalid': v$.localDescription.$error,
              'mb-3': !v$.localDescription.$error,
            }"
            placeholder="Code List description"
            v-model.trim="localDescription"
            @change="fieldChanged = true"
          />
          <div class="text-danger mb-3" v-if="v$.localDescription.$error">
            Please enter a description.
          </div>
        </CForm>

        <div class="form-mandatory">
          <span>*Mandatory fields</span>
        </div>
      </CCardText>
    </CCardBody>
    <CCardFooter class="bg-white">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click.prevent="handleSubmit()"
        :disabled="disabled"
        ><span>Next</span>
      </CButton>
    </CCardFooter>
  </CCard>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "CodeEditBasic",
  props: ["name", "description", "localId", "sentinel"],
  emits: ["next"],
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      localName: this.name,
      localDescription: this.description,
      localLocalId: this.localId,
      localSentinel: this.sentinel,
      fieldChanged: false, //do nothing if nothing changes
    };
  },
  validations: {
    localName: {
      required,
    },
    localDescription: {
      required,
    },
    localLocalId: {
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      console.log(!this.v$.$invalid && this.fieldChanged);
      if (!this.v$.$invalid && this.fieldChanged) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.localName,
          description: this.localDescription,
          localId: this.localLocalId,
          sentinel: this.localSentinel,
        };
        this.$emit("next", formData, this.fieldChanged);
      }
    },
  },
};
</script>
<style></style>
