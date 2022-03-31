<template>
  <CCard class="mb-3">
    <CCardBody>
      <CCardTitle> Levels </CCardTitle>
      <CCardText>
        <CForm>
          <CFormLabel for="localId">
            <span>{{ $t("structural.level_local_id") }}*</span>
          </CFormLabel>
          <input
            id="localId"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.levelLocalId.$error }"
            :placeholder="$t('structural.level_local_id')"
            v-model.trim="levelLocalId"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.levelLocalId.$error">{{
            $t("structural.validations.level_id")
          }}</span>
        </CForm>
        <CForm>
          <CFormLabel for="name">
            <span>{{ $t("structural.level_name") }}*</span>
          </CFormLabel>
          <input
            id="name"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.levelName.$error }"
            :placeholder="$t('structural.level_name')"
            v-model.trim="levelLocalId"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.levelName.$error">{{
            $t("structural.validations.level_name")
          }}</span>
        </CForm>
        <CForm>
          <CFormLabel for="description">
            <span>{{ $t("structural.level_description") }}</span>
          </CFormLabel>
          <textarea
            rows="3"
            id="description"
            type="text"
            class="form-control mb-3"
            :placeholder="
              $t('structural.statistical_classification_description')
            "
            v-model.trim="levelDescription"
            @change="fieldChanged = true"
          />
        </CForm>
        <CForm>
          <CFormLabel for="levelNumber">
            <span>{{ $t("structural.level_number") }}*</span>
          </CFormLabel>
          <input
            id="levelNumber"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.levelNumber.$error }"
            :placeholder="$t('structural.level_number')"
            v-model.trim="levelLocalId"
            @change="fieldChanged = true"
          />
          <span class="text-danger" v-if="v$.levelNumber.$error">{{
            $t("structural.validations.level_number")
          }}</span>
        </CForm>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="addLevel"
          ><span>{{ $t("structural.level_add_button") }}</span>
        </CButton>
        <CRow>
          <CCol
            class="col-sm-6 col-md-6 col-lg-3 mt-3"
            v-for="level in levels"
            :key="level.id"
          >
            <CCard>
              <CCardBody>
                <CCardTitle
                  >{{ level.levelNumber }}. {{ level.name }}</CCardTitle
                >
                <CCardText>
                  <span>{{ level.description }}</span>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="$emit('back')"
          ><span>{{ $t("referential.back") }}</span>
        </CButton>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="$emit('next', fieldChanged)"
          ><span>{{ $t("referential.next") }}</span>
        </CButton>
      </CCardText>
    </CCardBody>
  </CCard>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "StatisticalClassificationLevels",
  props: ["levels"],

  data() {
    return {
      v$: useValidate(),
      levelLocalId: "",
      levelName: "",
      levelDescription: "",
      levelNumber: "",
      disabled: false,
      fieldChanged: false, //do nothing if nothing changes
    };
  },
  validations: {
    levelLocalId: {
      required,
    },
    levelName: {
      required,
    },
    levelNumber: {
      required,
    },
  },
  methods: {
    addLevel() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          localId: this.levelLocalId,
          name: this.levelName,
          description: this.levelDescription,
          levelNumber: this.levelNumber,
        };
        console.log(formData);
        this.$emit("handleAddLevel", formData, this.fieldChanged);
        this.fieldChanged = false;
      }
    },
  },
};
</script>
