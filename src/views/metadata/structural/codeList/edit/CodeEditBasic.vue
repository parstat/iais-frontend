<template>
  <CCard v-if="code">
    <CCardBody>
      <CCardText>
        <CForm>
          <label for="name">Name*</label>
          <input
            id="name"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': v$.code.name.$error,
              'mb-3': !v$.code.name.$error,
            }"
            placeholder="Code name"
            v-model.trim="code.name"
          />
          <div class="text-danger mb-3" v-if="v$.code.name.$error">
            Please enter a name for the code.
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
              'is-invalid': v$.code.description.$error,
              'mb-3': !v$.code.description.$error,
            }"
            placeholder="Code description"
            v-model.trim="code.description"
          />
          <div class="text-danger mb-3" v-if="v$.code.description.$error">
            Please enter a description.
          </div>
        </CForm>
        <CForm>
          <label for="localId">Local id*</label>
          <input
            id="localId"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': v$.code.localId.$error,
              'mb-3': !v$.code.localId.$error,
            }"
            placeholder="Local id"
            v-model.trim="code.localId"
          />
          <div class="text-danger mb-3" v-if="v$.code.localId.$error">
            Please specify the local id.
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
    };
  },
  validations: {
    code: {
      name: {
        required,
      },
      description: {
        required,
      },
      localId: {
        required,
      },
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.code.id,
          name: this.code.name,
          description: this.code.description,
          localId: this.code.localId,
        };
        this.$store.dispatch("code/update", formData).then(() => {
          this.$emit("next");
        });
      }
    },
  },
  created() {
    this.$store.dispatch("code/findById", this.$route.params.id);
  },
};
</script>
<style></style>
