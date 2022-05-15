<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CCardTitle>
          <span>Unit Data structure components</span>
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
            placeholder="Component name"
            v-model.trim="name"
          />
          <div class="text-danger mb-3" v-if="v$.name.$error">
            Please enter a name for the component.
          </div>
        </CForm>
        <CForm>
          <label for="description">Description</label>
          <textarea
            rows="5"
            id="description"
            type="text"
            class="form-control mb-3"
            placeholder="Component description"
            v-model.trim="description"
          />
        </CForm>
        <CForm>
          <CFormLabel for="type">
            <span>Type</span>
          </CFormLabel>
          <v-select
            id="type"
            class="mb-3"
            label="name"
            :options="types"
            v-model="selectedType"
            :placeholder="'Select the type of the component'"
          ></v-select>
        </CForm>
        <CForm>
          <CFormLabel for="variable">
            <span>Variable</span>
          </CFormLabel>
          <v-select
            id="variable"
            class="mb-3"
            label="name"
            :options="variables"
            v-model="selectedVariable"
            @search="searchVariable"
            :placeholder="'Select the variable'"
          ></v-select>
        </CForm>
        <CForm v-if="selectedVariable?.representations?.length">
          <CFormLabel for="variable-representation">
            <span>Representation</span>
          </CFormLabel>
          <v-select
            id="variable-representation"
            class="mb-3"
            label="name"
            :options="selectedVariable.representations"
            v-model="selectedRepresentation"
            :placeholder="'Select the variable representation'"
          ></v-select>
        </CForm>
        <CForm>
          <CFormLabel for="records">
            <span>Records</span>
          </CFormLabel>
          <v-select
            id="records"
            class="mb-3"
            label="name"
            multi
            multiple
            :options="records"
            v-model="selectedRecords"
            :placeholder="'Select records'"
          ></v-select>
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
      <CRow v-if="components?.length">
        <CCol
          class="col-6 col-md-4"
          v-for="component in components"
          :key="component.id"
        >
          <CCard class="mb-3">
            <CCardBody>
              <CRow>
                <CCol class="col-9">
                  <CCardTitle>
                    <span>{{ component.name }}</span>
                  </CCardTitle>
                </CCol>
                <CCol class="col-3">
                  <CNav class="justify-content-end">
                    <CNavItem class="clickable-button">
                      <span v-on:click="editComponent(component)"
                        ><CIcon name="cil-pencil" />
                      </span>
                    </CNavItem>
                    <CNavItem class="clickable-button">
                      <span v-on:click="deleteComponent(component)"
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
        @click="finish()"
        :disabled="disabled"
        >{{ $t("referential.finish") }}
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
          <span>Delete component</span>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <span
          >This action will remove the component from the data structure. This
          action cannot be undone. Are you sure you want to delete this
          component?</span
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
import { DataStructureComponentTypes } from "@/common";
import { IdentifierRole } from "@/common";

import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import _ from "lodash";

export default {
  name: "UnitDataStructureComponent",
  props: ["components", "records"],
  emits: ["next"],
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      localId: "",
      name: "",
      description: "",
      isEdit: false,
      componentId: null,
      selectedType: null,
      selectedVariable: null,
      selectedRepresentation: null,
      selectedRecords: [],
      isIdentifierUnique: null,
      isIdetifierComposite: null,
      identifierRole: null,
      showDeleteDialog: false,
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Component Name",
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
    editComponent(item) {
      this.isEdit = true;
      this.componentId = item.id;
      this.localId = item.localId;
      this.name = item.name;
      this.description = item.description;
      this.selectedRepresentation = item.representation;
      this.selectedRecords = item.records;
      this.selectedType = item.type;
      this.isIdentifierUnique = item.isIdentifierUnique;
      this.isIdetifierComposite = item.isIdetifierComposite;
      this.identifierRole = IdentifierRole.entity;
    },
    deleteComponent(item) {
      this.componentId = item.id;
      this.showDeleteDialog = true;
    },
    handleDelete() {
      const data = {
        dataStructureId: this.$route.params.id,
        componentId: this.componentId,
      };
      this.$store
        .dispatch("unitDataStructure/removeComponent", data)
        .then(this.reloadDataStructure);
    },
    handleSave() {
      this.v$.$validate();
      if (!this.v$.$invalid) {
        const formData = {
          dataStructureId: this.$route.params.id,
          localId: this.localId.toUpperCase(),
          name: this.name,
          description: this.description,
          type: this.selectedType,
          isIdentifierUnique: this.isIdentifierUnique,
          isIdetifierComposite: this.isIdentifierUnique,
          identifierRole: this.identifierRole,
          records: this.records.map((record) => record.id),
        };
        if (this.isEdit) {
          formData.componentId = this.componentId;
          this.$store
            .dispatch("unitDataStructure/updateComponent", formData)
            .then(this.reloadDataStructure);
        } else {
          this.$store
            .dispatch("unitDataStructure/addComponent", formData)
            .then(this.reloadDataStructure);
        }
        console.log(formData);
      }
    },
    searchVariable(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        // TODO: This should also return the representations
        vm.$store.dispatch("variable/findByName", escape(name)).then(() => {
          loading(false);
        });
      } else {
        loading(false);
      }
    }, 500),
    finish() {
      this.$router.push("/metadata/structural/unitDataStructures");
    },
    reloadDataStructure() {
      this.$store.dispatch("unitDataStructure/findById", this.$route.params.id);
      this.resetForm();
      this.disabled = false;
    },
    resetForm() {
      this.v$.$reset();
      this.isEdit = true;
      this.componentId = null;
      this.localId = "";
      this.name = "";
      this.description = "";
      this.selectedRepresentation = null;
      this.selectedRecords = [];
      this.selectedType = "";
      this.isIdentifierUnique = null;
      this.isIdetifierComposite = null;
      this.identifierRole = IdentifierRole.entity;
    },
  },
  validations: {
    localId: {
      required,
    },
    name: {
      required,
    },
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("variable", ["variables"]),
    types() {
      var types = [];
      for (const key of Object.keys(DataStructureComponentTypes)) {
        types.push(DataStructureComponentTypes[key]);
      }
      return types;
    },
  },
  created() {},
};
</script>
<style scoped>
.clickable-button {
  cursor: pointer;
}
</style>
