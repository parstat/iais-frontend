<template>
  <CCard v-if="code">
    <CCardBody>
      <CCardText>
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
            v-model.trim="codeName"
          />
          <div class="text-danger mb-3" v-if="v$.label.$error">
            Please enter a label.
          </div>
        </CForm>
        <div class="form-mandatory">
          <span>*Mandatory fields</span>
        </div>
      </CCardText>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click.prevent="handleSubmit()"
        :disabled="disabled"
        ><span>Add code item</span>
      </CButton>
      <hr />
      <div class="code-items-section">
        <CRow>
          <CCol
            class="col-4"
            v-for="cardItem of code.codeItems"
            :key="cardItem.id"
          >
            <CCard>
              <CCardHeader>{{ cardItem.code }}</CCardHeader>
              <CCardText>
                {{ cardItem.description }}
              </CCardText>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "CodeEditBasic",
  computed: {
    ...mapGetters("code", ["code"]),
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      codeName: "",
      description: "",
      label: "",
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
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          nodeSetId: this.code.id,
          codeName: this.codeName,
          description: this.description,
          label: this.label,
        };
        this.$store.dispatch("code/addCodeItem", formData).then(() => {
          this.$emit("next");
        });
        console.log(formData);
      }
    },
  },
  created() {
    this.$store.dispatch("code/findById", this.$route.params.id);
  },
};
</script>
<style>
.code-items-section {
  margin-top: 20px;
}
</style>
