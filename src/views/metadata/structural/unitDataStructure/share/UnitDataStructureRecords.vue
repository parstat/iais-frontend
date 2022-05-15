<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CCardTitle>
          <span>Data structure records</span>
        </CCardTitle>
        <CForm>
          <label for="localId">Local id*</label>
          <input
            id="localId"
            type="text"
            class="form-control capitalize"
            :class="{
              'is-invalid': v$.localId.$error,
              'mb-3': !v$.localId.$error,
            }"
            placeholder="Local id"
            v-model.trim="localId"
            :disabled="isEdit"
          />
          <div class="text-danger mb-3" v-if="v$.localId.$error">
            Please specify the local id.
          </div>
        </CForm>
        <CForm>
          <label for="name">Name*</label>
          <input
            id="name"
            type="text"
            class="form-control"
            :class="{
              'is-invalid': v$.name.$error,
              'mb-3': !v$.name.$error,
            }"
            placeholder="Record name"
            v-model.trim="name"
          />
          <div class="text-danger mb-3" v-if="v$.name.$error">
            Please enter a name for the record.
          </div>
        </CForm>
        <CForm>
          <label for="description">Description</label>
          <textarea
            rows="5"
            id="description"
            type="text"
            class="form-control mb-3"
            placeholder="Record description"
            v-model.trim="description"
          />
        </CForm>
        <CForm v-if="records">
          <CFormLabel for="parent-record">
            <span>Parent record</span>
          </CFormLabel>
          <v-select
            id="parent-record"
            class="mb-3"
            label="name"
            :options="records"
            v-model="selectedParentRecord"
            :placeholder="'Select the parent record'"
          ></v-select>
        </CForm>
        <CForm v-if="unitTypes">
          <CFormLabel for="unitTypes">
            <span>Unit type*</span>
          </CFormLabel>
          <v-select
            id="unitTypes"
            class="mb-3"
            label="name"
            :options="unitTypes"
            v-model="selectedUnitType"
            :class="{ 'is-invalid': v$.selectedUnitType.$error }"
            :placeholder="'Select a unit type'"
          ></v-select>
          <span class="text-danger" v-if="v$.selectedUnitType.$error">
            {{ $t("structural.validations.unit_type") }}
          </span>
        </CForm>
      </CCardText>
      <div>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="handleSave()"
          :disabled="disabled"
          >{{ isEdit ? "Update" : "Save" }}
        </CButton>
      </div>
      <hr />
      <CRow v-if="records?.length">
        <CCol class="col-6 col-md-4" v-for="record in records" :key="record.id">
          <CCard class="mb-3">
            <CCardBody>
              <CRow>
                <CCol class="col-9">
                  <CCardTitle>
                    <span>{{ record.name }}</span>
                  </CCardTitle>
                </CCol>
                <CCol class="col-3">
                  <CNav class="justify-content-end">
                    <CNavItem class="clickable-button">
                      <span v-on:click="editRecord(record)"
                        ><CIcon name="cil-pencil" />
                      </span>
                    </CNavItem>
                    <CNavItem class="clickable-button">
                      <span v-on:click="deleteRecord(record)"
                        ><CIcon name="cil-trash" />
                      </span>
                    </CNavItem>
                  </CNav>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <hr />
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="next()"
        :disabled="disabled"
        >Next
      </CButton>
    </CCardBody>
    <CModal
      backdrop="static"
      :visible="showDeleteDialog"
      @close="
        () => {
          showDeleteDialog = false;
        }
      "
      ><CModalHeader>
        <CModalTitle>
          <span>Delete record</span>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <span
          >This action will remove the record from the data structure. This
          action cannot be undone. Are you sure you want to delete this
          record?</span
        >
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          @click="
            () => {
              showDeleteDialog = false;
            }
          "
          ><span>{{ $t("structural.close") }}</span>
        </CButton>
        <CButton color="danger" @click="handleDelete">
          <span>{{ $t("referential.delete") }}</span>
        </CButton>
      </CModalFooter>
    </CModal>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "UnitDataStructureRecords",
  props: ["records"],
  emits: ["next"],
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      localId: "",
      name: "",
      description: "",
      selectedUnitType: null,
      selectedParentRecord: null,
      isEdit: false,
      recordId: null,
      showDeleteDialog: false,
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Data Structure Name",
        },
        {
          key: "actions",
          label: "",
          _style: "",
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  methods: {
    editRecord(item) {
      this.isEdit = true;
      this.recordId = item.id;
      this.localId = item.localId;
      this.name = item.name;
      this.description = item.description;
      this.selectedUnitType = item.unitType;
      this.selectedParentRecord = item.parent;
    },
    deleteRecord(item) {
      this.recordId = item.id;
      this.showDeleteDialog = true;
    },
    handleDelete() {
      const data = {
        dataStructureId: this.$route.params.id,
        recordId: this.recordId,
      };
      this.$store
        .dispatch("unitDataStructure/removeRecord", data)
        .then(this.reloadDataStructure);
    },
    handleSave() {
      this.v$.$validate();
      if (!this.v$.$invalid) {
        this.disabled = true;
        const formData = {
          localId: this.localId.toUpperCase(),
          name: this.name,
          description: this.description,
          dataStructureId: this.$route.params.id,
          unitTypeId: this.selectedUnitType?.id,
          parentId: this.selectedParentRecord?.id,
        };
        if (this.isEdit) {
          formData.recordId = this.recordId;
          this.$store
            .dispatch("unitDataStructure/updateRecord", formData)
            .then(this.reloadDataStructure);
        } else {
          this.$store
            .dispatch("unitDataStructure/addRecord", formData)
            .then(this.reloadDataStructure);
        }
        console.log(formData);
      }
    },
    next() {
      this.$emit("next");
    },
    reloadDataStructure() {
      this.$store.dispatch("unitDataStructure/findById", this.$route.params.id);
      this.resetForm();
      this.disabled = false;
    },
    resetForm() {
      this.v$.$reset();
      this.isEdit = false;
      this.recordId = null;
      this.localId = "";
      this.name = "";
      this.description = "";
      this.selectedUnitType = null;
      this.selectedParentRecord = null;
    },
  },
  validations: {
    localId: {
      required,
    },
    name: {
      required,
    },
    selectedUnitType: {
      required,
    },
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("unitType", ["unitTypes"]),
  },
  created() {
    this.$store.dispatch("unitType/findAll", this.$route.params.id);
  },
};
</script>
<style scoped>
.clickable-button {
  cursor: pointer;
}
</style>
