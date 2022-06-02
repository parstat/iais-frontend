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
            :class="{
              'is-invalid': v$.selectedType.$error,
              'mb-3': !v$.selectedType.$error,
            }"
            label="name"
            :options="types"
            v-model="selectedType"
            :placeholder="'Select the type of the component'"
          ></v-select>
          <div class="text-danger mb-3" v-if="v$.selectedType.$error">
            Please select a type.
          </div>
        </CForm>
        <CFormSwitch
          v-if="selectedType === dataStructureComponentTypes?.identifier"
          id="isIdentifierUnique"
          size="lg"
          class="mb-3"
          v-model="isIdentifierUnique"
          :checked="isIdentifierUnique"
          label="Unique"
        />
        <CFormSwitch
          v-if="selectedType === dataStructureComponentTypes?.identifier"
          size="lg"
          id="isIdentifierComposite"
          class="mb-3"
          v-model="isIdentifierComposite"
          :checked="isIdentifierComposite"
          label="Composite"
        />
        <CForm>
          <CFormLabel for="variable">
            <span>Variable*</span>
          </CFormLabel>
          <v-select
            id="variable"
            :class="{
              'is-invalid': v$.selectedVariable.$error,
              'mb-3': !v$.selectedVariable.$error,
            }"
            label="name"
            :options="variables"
            v-model="selectedVariable"
            @search="searchVariable"
            @input="getVariable"
            :placeholder="'Select the variable'"
          ></v-select>
          <div class="text-danger mb-3" v-if="v$.selectedVariable.$error">
            Please select a variable.
          </div>
        </CForm>
        <CForm v-if="selectedVariable && variable?.representations?.length">
          <CFormLabel for="variable-representation">
            <span>Representation</span>
          </CFormLabel>
          <v-select
            id="variable-representation"
            :class="{
              'is-invalid': v$.selectedRepresentation.$error,
              'mb-3': !v$.selectedRepresentation.$error,
            }"
            label="name"
            :options="variable.representations"
            v-model="selectedRepresentation"
            :placeholder="'Select the variable representation'"
          ></v-select>
          <div class="text-danger mb-3" v-if="v$.selectedRepresentation.$error">
            Please select a variable representation.
          </div>
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
        <CButton
          color="danger"
          size="sm"
          @click="resetForm()"
          :disabled="disabled"
          >{{ $t("referential.reset") }}</CButton
        >
      </div>
      <hr />
      <CRow>
        <div class="table-responsive">
          <CSmartTable
            v-if="components?.length"
            :items="components"
            :activePage="1"
            header
            :columns="columns"
            columnFilter
            cleaner
            itemsPerPageSelect
            :itemsPerPage="5"
            columnSorter
            :sorterValue="{ column: 'localId', state: 'asc' }"
            pagination
          >
            <template #isIdentifierUnique="{ item }">
              <td style="text-align: center">
                <CFormCheck
                  id="flexCheckDefault"
                  disabled
                  v-model="item.isIdentifierUnique"
                />
              </td>
            </template>
            <template #isIdentifierComposite="{ item }">
              <td style="text-align: center">
                <CFormCheck
                  id="flexCheckDefault"
                  disabled
                  v-model="item.isIdentifierComposite"
                />
              </td>
            </template>
            <template #actions="{ item }">
              <td style="text-align: right; width: 10%; padding-right: 20px">
                <span v-if="isAuthenticated" class="pl-2">
                  <span
                    v-on:click="editComponent(item)"
                    class="clickable-button"
                    ><CIcon name="cil-pencil" />
                  </span>
                </span>

                <span v-if="isAuthenticated && isAdmin" class="pl-2">
                  <span
                    v-on:click="deleteComponent(item)"
                    class="clickable-button"
                    ><CIcon name="cil-trash" />
                  </span>
                </span>
              </td>
            </template>
          </CSmartTable>
        </div>
        <!-- <CCol
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
        </CCol> -->
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
      isIdentifierComposite: null,
      identifierRole: {
        name: IdentifierRole.entity,
        value: IdentifierRole.entity,
      },
      showDeleteDialog: false,
      dataStructureComponentTypes: DataStructureComponentTypes,
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Component name",
        },
        {
          key: "type",
          label: "Component type",
        },
        {
          key: "isIdentifierUnique",
          label: "Unique",
          _style: "",
          sorter: false,
          filter: false,
        },
        {
          key: "isIdentifierComposite",
          label: "Composite",
          _style: "",
          sorter: false,
          filter: false,
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
      this.isIdentifierComposite = item.isIdentifierComposite;
      this.identifierRole = item.identifierRole
        ? {
            name: item.identifierRole,
            value: item.identifierRole,
          }
        : null;
      if (item?.representation?.variableName) {
        this.$store
          .dispatch(
            "variable/findByName",
            escape(item?.representation?.variableName)
          )
          .then((data) => {
            if (data?.length > 0) {
              this.selectedVariable = data[0];
              this.getVariable(data[0]);
            }
          });
      }
    },
    deleteComponent(item) {
      console.log(item);
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
          isIdentifierComposite: this.isIdentifierComposite,
          identifierRole: this.identifierRole?.value ?? null,
          records: this.selectedRecords.map((record) => record.id),
          representedVariableId: this.selectedRepresentation?.id ?? null,
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
        vm.$store.dispatch("variable/findByName", escape(name)).then(() => {
          loading(false);
        });
      } else {
        loading(false);
      }
    }, 500),
    getVariable(variable) {
      if (variable?.id) {
        this.$store.dispatch("variable/findById", variable.id);
      }
    },
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
      this.showDeleteDialog = false;
      this.isEdit = false;
      this.componentId = null;
      this.localId = "";
      this.name = "";
      this.description = "";
      this.selectedVariable = null;
      this.selectedRepresentation = null;
      this.selectedRecords = [];
      this.selectedType = "";
      this.isIdentifierUnique = null;
      this.isIdentifierComposite = null;
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
    selectedType: {
      required,
    },
    selectedVariable: {
      required,
    },
    selectedRepresentation: {
      required,
    },
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("variable", ["variables", "variable"]),
    types() {
      var types = [];
      for (const key of Object.keys(DataStructureComponentTypes)) {
        types.push(DataStructureComponentTypes[key]);
      }
      return types;
    },
    roles() {
      var roles = [];
      for (const key of Object.keys(IdentifierRole)) {
        roles.push(IdentifierRole[key]);
      }
      return roles;
    },
  },
  created() {},
};
</script>
<style scoped>
.clickable-button {
  cursor: pointer;
}
.capitalize {
  text-transform: uppercase;
}
</style>
