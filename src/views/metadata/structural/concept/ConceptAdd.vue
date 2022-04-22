<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.concept") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("structural.name") }}*</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.name.$error,
                  'mb-3': !v$.name.$error,
                }"
                :placeholder="$t('structural.concept_name')"
                v-model.trim="name"
              />
              <span class="text-danger mb-3" v-if="v$.name.$error">
                {{ $t("structural.validations.concept_name") }}
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
                  'is-invalid': v$.description.$error,
                  'mb-3': !v$.description.$error,
                }"
                :placeholder="$t('structural.concept_description')"
                v-model.trim="description"
              />
              <span class="text-danger mb-3" v-if="v$.description.$error">
                {{ $t("structural.validations.description") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("structural.local_ID") }}*</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.localId.$error,
                  'mb-3': !v$.localId.$error,
                }"
                :placeholder="$t('structural.local_ID')"
                v-model.trim="localId"
              />
              <span class="text-danger mb-3" v-if="v$.localId.$error">
                {{ $t("structural.validations.local_ID") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("structural.link") }}</span>
              </CFormLabel>
              <input
                id="link"
                type="text"
                class="form-control"
                :placeholder="$t('structural.link')"
                v-model.trim="link"
              />
            </CForm>
            <CForm>
              <CFormLabel for="definition">
                <span>{{ $t("structural.definition") }}</span>
              </CFormLabel>
              <input
                id="definition"
                type="text"
                class="form-control mb-3"
                :placeholder="$t('structural.concept_definition')"
                v-model.trim="definition"
              />
            </CForm>
            <div class="form-mandatory">
              *{{ $t("structural.mandatory_fields") }}
            </div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="handleSave()"
            :disabled="disabled"
            ><span>{{ $t("structural.save") }}</span>
          </CButton>
          <CButton
            color="danger"
            size="sm"
            @click="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("structural.reset") }}</span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "ConceptAdd",
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      name: "",
      description: "",
      definition: "",
      localId: "",
      link: "",
    };
  },
  validations: {
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
  methods: {
    handleReset() {
      this.name = "";
      this.description = "";
      this.definition = "";
      this.localId = "";
      this.link = "";
      this.v$.$reset();
    },
    handleSave() {
      this.v$.$touch(); //validate form data
      console.log(this.v$);
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          definition: this.definition,
          localId: this.localId,
          link: this.link,
        };
        this.$store.dispatch("concept/save", formData);
        console.log(formData);
      }
    },
  },
  created() {},
};
</script>
