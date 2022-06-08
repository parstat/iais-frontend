<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CForm>
          <CFormLabel for="localId">
            <span>{{ $t("structural.local_ID") }}*</span>
          </CFormLabel>
          <input
            id="localId"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': v$.localLocalId.$error,
              'mb-3': !v$.localLocalId.$error,
            }"
            :placeholder="$t('structural.local_ID')"
            v-model.trim="localLocalId"
            @change="fieldChanged = true"
          />
          <span class="text-danger mb-3" v-if="v$.localLocalId.$error">
            {{ $t("structural.validations.local_ID") }}
          </span>
        </CForm>
        <CForm>
          <CFormLabel for="name">
            <span>{{ $t("structural.name") }}*</span>
          </CFormLabel>
          <input
            id="name"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': v$.localName.$error,
              'mb-3': !v$.localName.$error,
            }"
            :placeholder="$t('structural.code_list_name')"
            v-model.trim="localName"
            @change="fieldChanged = true"
          />
          <span class="text-danger mb-3" v-if="v$.localName.$error">
            {{ $t("structural.validations.code_list_name") }}
          </span>
        </CForm>
        <CForm>
          <CFormLabel for="description">
            <span>{{ $t("structural.description") }}*</span>
          </CFormLabel>
          <textarea
            rows="5"
            id="description"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': v$.localDescription.$error,
              'mb-3': !v$.localDescription.$error,
            }"
            :placeholder="$t('structural.code_list_description')"
            v-model.trim="localDescription"
            @change="fieldChanged = true"
          />
          <span class="text-danger mb-3" v-if="v$.localDescription.$error">
            {{ $t("structural.validations.description") }}
          </span>
        </CForm>
        <CFormSwitch
          id="isSentinel"
          size="lg"
          class="mb-3"
          v-model="localSentinel"
          :checked="localSentinel"
          label="Sentinel (special code list)"
          @change="fieldChanged = true"
        />
        <div class="form-mandatory">
          <span>*{{ $t("structural.mandatory_fields") }}</span>
        </div>
      </CCardText>
    </CCardBody>
    <CCardFooter class="bg-white">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="handleSubmit()"
        :disabled="disabled"
        ><span>{{ $t("structural.next") }}</span>
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
