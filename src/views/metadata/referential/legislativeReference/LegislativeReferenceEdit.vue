<template>
  <CRow v-if="legislativeReference">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("referential.legislative_reference") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="name">
                <span>{{ $t("referential.name") }}</span>
              </CFormLabel>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.legislativeReference.name.$error }"
                :placeholder="$t('referential.legislative_reference_name')"
                v-model.trim="legislativeReference.name"
              />
              <span
                class="text-danger"
                v-if="v$.legislativeReference.name.$error"
              >
                {{ $t("referential.validations.legislative_reference_name") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("referential.description") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :class="{
                  'is-invalid': v$.legislativeReference.description.$error,
                }"
                :placeholder="
                  $t('referential.legislative_reference_description')
                "
                v-model.trim="legislativeReference.description"
              />
              <span
                class="text-danger"
                v-if="v$.legislativeReference.description.$error"
              >
                {{
                  $t(
                    "referential.validations.legislative_reference_description"
                  )
                }}
              </span>
            </CForm>
            <CForm class="mb-3">
              <CFormLabel for="account">
                <span>{{ $t("referential.type") }}</span>
              </CFormLabel>
              <v-select
                label="type"
                :options="types"
                v-model="legislativeReference.type"
                :class="{ 'is-invalid': v$.legislativeReference.type.$error }"
                :placeholder="$t('referential.selection.type')"
              ></v-select>
              <span
                class="text-danger"
                v-if="v$.legislativeReference.type.$error"
              >
                {{ $t("referential.validations.type") }}
              </span>
            </CForm>
            <CForm>
              <CFormLabel for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </CFormLabel>
              <input
                id="localId"
                type="text"
                class="form-control"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="legislativeReference.localId"
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("referential.update") }}</span>
          </CButton>
          <CButton
            color="danger"
            size="sm"
            @click="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("referential.reset") }}</span>
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
import { Regulation } from "@/common";

export default {
  name: "LegislativeReferenceEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("legislativeReference", ["legislativeReference"]),
    types() {
      var types = [];
      for (const key of Object.keys(Regulation)) {
        types.push(Regulation[key]);
      }
      return types;
    },
  },
  validations: {
    legislativeReference: {
      name: {
        required,
      },
      description: {
        required,
      },
      type: {
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
          id: this.legislativeReference.id,
          name: this.legislativeReference.name,
          description: this.legislativeReference.description,
          type: this.legislativeReference.type,
          link: this.legislativeReference.link,
          version: this.legislativeReference.version,
          localId: this.legislativeReference.localId,
        };
        this.$store.dispatch("legislativeReference/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.legislativeReference.name = "";
      this.legislativeReference.description = "";
      this.legislativeReference.type = "";
      this.legislativeReference.link = "";
      this.legislativeReference.version = "";
      this.legislativeReference.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch(
      "legislativeReference/findById",
      this.$route.params.id
    );
  },
};
</script>
