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
            class="form-control mb-3 capitalize"
            :class="{ 'is-invalid': v$.levelLocalId.$error }"
            :placeholder="$t('structural.level_local_id')"
            v-model.trim="levelLocalId"
            @change="fieldChanged = true"
            :disabled="edit"
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
            v-model.trim="levelName"
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
            v-model.trim="levelNumber"
            @change="fieldChanged = true"
            :disabled="edit"
          />
          <span class="text-danger" v-if="v$.levelNumber.$error">{{
            $t("structural.validations.level_number")
          }}</span>
        </CForm>
        <CButton
          v-if="!edit"
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          class="mb-3"
          @click="addLevel"
          ><span>{{ $t("structural.level_add_button") }}</span>
        </CButton>
        <CButton
          v-else
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          class="mb-3"
          @click="updateLevel"
          ><span>{{ $t("structural.level_update_button") }}</span>
        </CButton>
        <CModal
          :visible="visibleModal"
          @close="
            () => {
              visibleModal = false;
              levelToDelete = '';
            }
          "
        >
          <CModalHeader>
            <CModalTitle>Delete level</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to proceed deletion of '{{
              levelToDelete.levelNumber
            }}. {{ levelToDelete.name }}' level? This cannot be undone!
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              @click="
                () => {
                  visibleModal = false;
                  levelToDelete = '';
                }
              "
            >
              Cancel
            </CButton>
            <CButton color="danger" @click="removeLevel">Proceed</CButton>
          </CModalFooter>
        </CModal>

        <CRow class="mb-3">
          <CCol
            class="col-sm-6 col-md-6 col-lg-3 mt-3"
            v-for="level in levels"
            :key="level.id"
          >
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol class="col-9">
                    <CCardTitle>
                      <span>{{ level.levelNumber }}. {{ level.name }}</span>
                    </CCardTitle>
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span v-on:click="editModeLevel(level)">
                          <CIcon name="cil-pencil" />
                        </span>
                      </CNavItem>
                      <CNavItem>
                        <span v-on:click="alertDeleteLevel(level)">
                          <CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
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
      levelToDelete: "",
      levelId: "",
      edit: false,
      visibleModal: false,
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
          localId: this.levelLocalId.trim().toUpperCase(),
          name: this.levelName,
          description: this.levelDescription,
          levelNumber: this.levelNumber,
        };
        //console.log(formData);
        this.$emit("addLevel", formData);
        this.resetLevelFields();
      }
    },
    updateLevel() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.levelId,
          name: this.levelName,
          description: this.levelDescription,
        };
        //console.log(formData);
        this.$emit("updateLevel", formData);
        this.resetLevelFields();
      }
    },

    alertDeleteLevel(level) {
      this.visibleModal = true;
      this.levelToDelete = level;
    },
    editModeLevel(level) {
      this.levelName = level.name;
      this.levelDescription = level.description;
      this.levelLocalId = level.localId;
      this.levelNumber = level.levelNumber;
      this.levelId = level.id;
      this.edit = true;
    },
    removeLevel() {
      this.visibleModal = false;
      this.$emit("removeLevel", this.levelToDelete);
    },
    resetLevelFields() {
      this.levelLocalId = "";
      this.levelName = "";
      this.levelDescription = "";
      this.levelNumber = "";
      this.disabled = false;
      this.fieldChanged = false;
      this.edit = false;
      this.levelId = "";
      this.v$.$reset();
    },
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: uppercase;
}
</style>
