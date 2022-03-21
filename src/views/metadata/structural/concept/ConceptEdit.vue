<template>
  <CCRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Hello</span>
          </CCardTitle>
          <CCardText v-if="concept">
            <CForm>
              <label for="name">Name*</label>
              <input
                id="name"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.concept.name.$error,
                  'mb-3': !v$.concept.name.$error,
                }"
                placeholder="Concept name"
                v-model.trim="concept.name"
              />
              <div class="text-danger mb-3" v-if="v$.concept.name.$error">
                Please enter a name for the Concept.
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
                  'is-invalid': v$.concept.description.$error,
                  'mb-3': !v$.concept.description.$error,
                }"
                placeholder="Concept description"
                v-model.trim="concept.description"
              />
              <div
                class="text-danger mb-3"
                v-if="v$.concept.description.$error"
              >
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
                  'is-invalid': v$.concept.localId.$error,
                  'mb-3': !v$.concept.localId.$error,
                }"
                placeholder="Local id"
                v-model.trim="concept.localId"
              />
              <div class="text-danger mb-3" v-if="v$.concept.localId.$error">
                Please specify the local id.
              </div>
            </CForm>
            <CForm>
              <label for="localId">Link*</label>
              <input
                id="link"
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': v$.concept.link.$error,
                  'mb-3': !v$.concept.link.$error,
                }"
                placeholder="Link"
                v-model.trim="concept.link"
              />
              <div class="text-danger mb-3" v-if="v$.concept.link.$error">
                Please specify a link.
              </div>
            </CForm>
            <CForm>
              <label for="definition">Definition</label>
              <input
                id="definition"
                type="text"
                class="form-control mb-3"
                placeholder="Concept definition"
                v-model.trim="concept.definition"
              />
            </CForm>
            <div class="form-mandatory">*Mandatory fields</div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSave()"
            :disabled="disabled"
            >Update</CButton
          >
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            >Reset</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CCRow>
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
      link: {
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
