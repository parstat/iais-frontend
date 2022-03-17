<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="statisticalStandard">
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("referential.statistical_standard_header") }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="name">
                <span>{{ $t("referential.name") }}</span>
              </label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                :class="{ 'is-invalid': v$.statisticalStandard.name.$error }"
                :placeholder="$t('referential.statistical_standard_name')"
                v-model.trim="statisticalStandard.name"
              />
              <span
                class="text-danger"
                v-if="v$.statisticalStandard.name.$error"
                >{{
                  $t("referential.validations.statistical_standard_name")
                }}</span
              >
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
                  $t('referential.statistical_standard_description')
                "
                v-model.trim="statisticalStandard.description"
              />
            </CForm>
            <CForm>
              <label for="account">
                <span>{{ $t("referential.type") }}</span>
              </label>
              <v-select
                label="type"
                :options="types"
                v-model="statisticalStandard.type"
                :class="{ 'is-invalid': v$.statisticalStandard.type.$error }"
                :placeholder="$t('referential.selection.type')"
              ></v-select>
              <span
                class="text-danger"
                v-if="v$.statisticalStandard.type.$error"
                >{{ $t("referential.validations.type") }}</span
              >
            </CForm>
            <CForm>
              <label for="localId">
                <span>{{ $t("referential.local_ID") }}</span>
              </label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                :placeholder="$t('referential.local_ID')"
                v-model.trim="statisticalStandard.localId"
              />
              <span
                class="text-danger"
                v-if="v$.statisticalStandard.localId.$error"
                >{{
                  $t("referential.validations.statistical_standard_local_ID")
                }}</span
              >
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            ><span>{{ $t("referential.update") }}</span></CButton
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
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Standard } from "@/common";

export default {
  name: "StatisticalStandardEdit",
  data() {
    return {
      v$: useValidate(),
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalStandard", ["statisticalStandard"]),
    types() {
      var types = [];
      for (const key of Object.keys(Standard)) {
        types.push(Standard[key]);
      }
      return types;
    },
  },
  validations: {
    statisticalStandard: {
      name: {
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
          id: this.statisticalStandard.id,
          name: this.statisticalStandard.name,
          description: this.statisticalStandard.description,
          type: this.statisticalStandard.type,
          link: this.statisticalStandard.link,
          version: this.statisticalStandard.version,
          localId: this.statisticalStandard.localId,
        };
        this.$store.dispatch("statisticalStandard/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.statisticalStandard.name = "";
      this.statisticalStandard.description = "";
      this.statisticalStandard.type = "";
      this.statisticalStandard.link = "";
      this.statisticalStandard.version = "";
      this.statisticalStandard.localId = "";
      this.v$.$reset();
    },
  },
  created() {
    this.$store.dispatch("statisticalStandard/findById", this.$route.params.id);
  },
};
</script>
