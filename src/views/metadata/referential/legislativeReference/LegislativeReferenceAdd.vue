<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("referential.legislative_reference") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">
                <span>{{ $t("referential.name") }}*</span>
              </label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.name.$error }"
                :placeholder="$t('referential.legislative_reference_name')"
                v-model.trim="name"
              />
              <span class="text-danger" v-if="v$.name.$error">{{
                $t("referential.validations.legislative_reference_name")
              }}</span>
            </CForm>
            <CForm>
              <label for="description">
                <span>{{ $t("referential.description") }}</span>
              </label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                :placeholder="
                  $t('referential.legislative_reference_description')
                "
                v-model.trim="description"
              />
              <span class="text-danger" v-if="v$.description.$error">{{
                $t("referential.validations.legislative_reference_description")
              }}</span>
            </CForm>
            <CForm>
              <label for="link">
                <span>{{ $t("referential.link") }}</span>
              </label>
              <input
                id="link"
                type="text"
                class="form-control mb-3"
                :placeholder="$t('referential.regulation_link')"
                v-model.trim="link"
              />
            </CForm>
            <CForm>
              <label for="version">
                <span>{{ $t("referential.version") }}</span>
              </label>
              <input
                id="version"
                type="text"
                class="form-control mb-3"
                :placeholder="$t('referential.regulation_version')"
                v-model.trim="version"
              />
            </CForm>
            <CForm>
              <label for="account">
                <span>{{ $t("referential.type") }}*</span>
              </label>
              <v-select
                label="type"
                :options="types"
                v-model="type"
                :class="{ 'is-invalid': v$.type.$error }"
                :placeholder="$t('referential.selection.type')"
              ></v-select>
              <span class="text-danger" v-if="v$.type.$error">{{
                $t("referential.validations.type")
              }}</span>
            </CForm>
            <CForm>
              <label for="localId">
                <span>{{ $t("referential.local_ID") }}*</span>
              </label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.localId.$error }"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="localId"
              />
              <span class="text-danger" v-if="v$.localId.$error"
                >{{ $t("referential.validations.local_ID") }}.</span
              >
            </CForm>
            <div class="form-mandatory">
              <span>*{{ $t("referential.mandatory_fields") }}</span>
            </div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("referential.save") }}</span></CButton
          >
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            ><span>{{ $t("referential.reset") }}</span></CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Regulation } from "@/common";

export default {
  name: "LegislativeReferenceAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      type: "",
      link: "",
      version: "",
      localId: "",
      disabled: false,
    };
  },
  computed: {
    types() {
      var types = [];
      for (const key of Object.keys(Regulation)) {
        types.push(Regulation[key]);
      }
      return types;
    },
  },
  validations: {
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
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          type: this.type,
          link: this.link,
          version: this.version,
          localId: this.localId,
        };
        this.$store.dispatch("legislativeReference/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.type = "";
      this.link = "";
      this.version = "";
      this.localId = "";
      this.v$.$reset();
    },
  },
};
</script>
