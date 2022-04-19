<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.concept") }}</span>
          </CCardTitle>
          <CCardText v-if="concept">
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("structural.name") }}*</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.concept.name.$error,
                  'mb-3': !v$.concept.name.$error,
                }"
                :placeholder="$t('structural.concept_name')"
                v-model.trim="concept.name"
              />
              <span class="text-danger mb-3" v-if="v$.concept.name.$error">
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
                  'is-invalid': v$.concept.description.$error,
                  'mb-3': !v$.concept.description.$error,
                }"
                :placeholder="$t('structural.concept_description')"
                v-model.trim="concept.description"
              />
              <span
                class="text-danger mb-3"
                v-if="v$.concept.description.$error"
                >{{ $t("structural.validations.description") }}
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
                  'is-invalid': v$.concept.localId.$error,
                  'mb-3': !v$.concept.localId.$error,
                }"
                :placeholder="$t('structural.local_ID')"
                v-model.trim="concept.localId"
              />
              <span class="text-danger mb-3" v-if="v$.concept.localId.$error">
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
                v-model.trim="concept.link"
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
                v-model.trim="concept.definition"
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
            @click.prevent="handleSave()"
            :disabled="disabled"
            ><span>{{ $t("structural.update") }}</span>
          </CButton>
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("structural.reset") }}</span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "ConceptEdit",
  computed: {
    ...mapGetters("concept", ["concept"]),
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
    };
  },
  validations: {
    concept: {
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
    handleReset() {
      this.concept.name = "";
      this.concept.description = "";
      this.concept.definition = "";
      this.concept.localId = "";
      this.concept.link = "";
      this.v$.$reset();
    },
    handleSave() {
      this.v$.$touch(); //validate form data
      console.log(this.v$);
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.concept.id,
          name: this.concept.name,
          description: this.concept.description,
          definition: this.concept.definition,
          localId: this.concept.localId,
          link: this.concept.link,
        };
        this.$store.dispatch("concept/update", formData);
        console.log(formData);
      }
    },
  },
  created() {
    this.$store.dispatch("concept/findById", this.$route.params.id);
  },
};
</script>
