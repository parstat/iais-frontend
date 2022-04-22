<template>
  <CCard>
    <CCardBody>
      <CCardText v-if="sourceCodeList && targetCodeList">
        <CCardTitle> Add/Remove Mappings </CCardTitle>
        <CRow>
          <CCol class="col-6">
            <CForm>
              <CFormLabel for="sourceId">
                <span>Source item</span>
              </CFormLabel>
              <v-select
                id="sourceId"
                class="mb-3"
                label="code"
                :options="sourceCodeList.codeItems"
                v-model="sourceCodeItem"
              >
              </v-select>
            </CForm>
          </CCol>
          <CCol class="col-6">
            <CForm>
              <CFormLabel for="sourceId">
                <span>Target item</span>
              </CFormLabel>
              <v-select
                id="sourceId"
                class="mb-3"
                label="code"
                :options="targetCodeList.codeItems"
                v-model="targetCodeItem"
              >
              </v-select>
            </CForm>
          </CCol>
        </CRow>
        <CFormLabel class="mb-3">
          <input type="file" accept=".csv" @change="handleFileUpload($event)" />
        </CFormLabel>
        <CAlert color="primary" v-if="isLoading">
          <CSpinner color="primary" size="sm" />
          <span>{{ $t("structural.uploading_wait") }}</span>
        </CAlert>
        <br />
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="addMapping"
          :disabled="disabled"
          ><span>Add mapping</span>
        </CButton>
      </CCardText>
      <div class="table-responsive" v-if="correspondence">
        <CSmartTable
          v-if="correspondence.mappings?.length"
          :activePage="1"
          :items="correspondence.mappings"
          :columns="correspondenceColumns"
          columnFilter
          cleaner
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          pagination
        >
          <template #actions="{ item }">
            <td style="text-align: right; width: 10%; padding-right: 20px">
              <span
                v-if="isAuthenticated"
                class="pl-2 clickable"
                @click="openDeleteDialog(item)"
              >
                <CIcon name="cil-trash" />
              </span>
            </td>
          </template>
        </CSmartTable>
      </div>
    </CCardBody>
    <CModal :visible="visibleCsvModal" @close="closeModal">
      <CModalHeader>
        <CModalTitle>
          <span>{{ $t("structural.CSV_items") }}</span>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CSmartTable
          v-if="content?.data?.length"
          :items="content.data"
          :activePage="1"
          :columns="content.meta.fields"
          columnFilter
          itemsPerPageSelect
          :itemsPerPage="5"
          pagination
        ></CSmartTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal">
          <span>{{ $t("structural.close") }}</span>
        </CButton>
        <CButton
          color="primary"
          @click="uploadItems"
          :disabled="disabled"
          ><span>{{ $t("structural.upload_items") }}</span>
        </CButton>
      </CModalFooter>
    </CModal>
    <CModal
      backdrop="static"
      :visible="showDeleteDialog"
      @close="showDeleteDialog = false"
    >
      <CModalHeader>
        <CModalTitle
          >Delete mapping: {{ mapping?.sourceCode }} -
          {{ mapping.targetCode }}?</CModalTitle
        >
      </CModalHeader>
      <CModalBody
        >This action will remove the mapping form the correspondence. This
        action can not be undone. Are you sure you want to delete this
        mapping?</CModalBody
      >
      <CModalFooter>
        <CButton
          color="secondary"
          @click="() => (showDeleteDialog = false)"
          :disabled="disabled"
        >
          Close
        </CButton>
        <CButton color="danger" @click="removeMapping()" :disabled="disabled"
          >Delete mapping</CButton
        >
      </CModalFooter>
    </CModal>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
import Papa from "papaparse";

export default {
  name: "CorrespondenceTableMappings",
  props: ["sourceId", "targetId"],
  computed: {
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("correspondence", ["correspondence"]),
  },
  data() {
    return {
      correspondenceColumns: [
        {
          key: "sourceCode",
          label: "Source Code",
        },
        {
          key: "targetCode",
          label: "Target Code",
        },
        {
          key: "actions",
          label: "Actions",
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ],
      sourceCodeList: null,
      targetCodeList: null,
      sourceCodeItem: "",
      targetCodeItem: "",
      disabled: false,

      mapping: null,
      showDeleteDialog: false,

      file: "",
      content: null,
      parsed: false,
      visibleCsvModal: false,
    };
  },
  methods: {
    addMapping() {
      const formData = {
        correspondenceId: this.correspondence.id,
        sourceId: this.sourceCodeItem.id,
        targetId: this.targetCodeItem.id,
      };
      this.$store.dispatch("correspondence/addMapping", formData).then(() => {
        this.resetForm();
      });
    },
    openDeleteDialog(mapping) {
      this.mapping = mapping;
      this.showDeleteDialog = true;
    },
    removeMapping() {
      if (this.mapping) {
        const formData = {
          correspondenceId: this.correspondence.id,
          mappingId: this.mapping.id,
        };
        this.$store
          .dispatch("correspondence/removeMapping", formData)
          .then(() => {
            this.resetForm();
          });
      }
    },
    resetForm() {
      this.sourceCodeItem = "";
      this.targetCodeItem = "";
      this.disabled = false;
      this.showDeleteDialog = false;
      this.visibleCsvModal = false;
      this.parsed = false;
      this.content = null;
    },
    async uploadItems() {
      if (this.content) {
        this.disabled = true;
        const mappingCsv = this.content.data.map((element) => {
          return {
            sourceCode: element.source,
            targetCode: element.target,
          };
        });
        const formData = {
          mappingCsv,
          correspondenceId: this.correspondence.id,
        };
        this.$store
          .dispatch("correspondence/uploadMapping", formData)
          .then(() => {
            this.resetForm();
          })
          .catch(() => {
            this.resetForm();
          });
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.parseFile();
      }
    },
    parseFile() {
      this.visibleCsvModal = true;
      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          this.content = results;
          this.parsed = true;
          this.visibleCsvModal = true;
          console.log(results);
        }.bind(this),
      });
    },
    closeModal() {
      this.content = null;
      this.visibleCsvModal = false;
    },
  },
  created() {
    if (this.sourceId) {
      this.$store.dispatch("codeList/findById", this.sourceId).then((data) => {
        if (data) {
          this.sourceCodeList = data;
        }
      });
    }
    if (this.targetId) {
      this.$store.dispatch("codeList/findById", this.targetId).then((data) => {
        if (data) {
          this.targetCodeList = data;
        }
      });
    }
  },
};
</script>
<style>
.clickable {
  cursor: pointer;
}
</style>
