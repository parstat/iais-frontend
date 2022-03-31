<template>
  <CCard class="mb-3">
    <CCardBody>
      <CCardTitle> Upload Items </CCardTitle>
      <CCardText>
        <CFormLabel for="localId">
          <span>{{
            $t("structural.statistical_classification_aggregation_type")
          }}</span>
        </CFormLabel>
        <v-select
          label="Aggregation Type"
          :options="aggregationTypes"
          v-model="localAggregationType"
          class="mb-3"
          :class="{ 'is-invalid': v$.localAggregationType.$error }"
          :placeholder="
            $t('structural.statistical_classification_aggregation_type')
          "
        ></v-select>
        <span class="text-danger" v-if="v$.localAggregationType.$error">{{
          $t("referential.validations.type")
        }}</span>
        <label>
          <input type="file" accept=".csv" @change="handleFileUpload($event)" />
        </label>
        <br />
        <br />
        <CModal
          :visible="visibleCsvModal"
          @close="
            () => {
              visibleCsvModal = false;
            }
          "
        >
          <CModalHeader>
            <CModalTitle>CSV items</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <!--<div class="table-responsive">
              <table v-if="parsed">
                <thead>
                  <tr>
                    <th
                      v-for="(header, key) in content.meta.fields"
                      v-bind:key="'header-' + key"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, rowKey) in content.data"
                    v-bind:key="'row-' + rowKey"
                  >
                    <td
                      v-for="(column, columnKey) in content.meta.fields"
                      v-bind:key="'row-' + rowKey + '-column-' + columnKey"
                    >
                      <input v-model="content.data[rowKey][column]" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> -->
            <div class="table-responsive">
              <CSpinner v-if="!parsed" color="primary" size="sm" />
              <CFormLabel v-if="!parsed"> Parsing csv file </CFormLabel>
              <CSmartTable
                v-if="rootItems.length"
                :items="rootItems"
                :activePage="1"
                :columns="columns"
                columnFilter
                cleaner
                itemsPerPageSelect
                :itemsPerPage="5"
                columnSorter
                :sorterValue="{ column: 'localId', state: 'asc' }"
                pagination
              >
              </CSmartTable>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              @click="
                () => {
                  visibleCsvModal = false;
                }
              "
            >
              Close
            </CButton>
            <CButton color="primary" @click="getItemsRecursivly"
              >Preview items</CButton
            >
          </CModalFooter>
        </CModal>

        <CFormSwitch
          label="Show uploaded items"
          id="formSwitchCheckDefault"
          v-model="visible"
        />
        <CCollapse :visible="visible">
          <CCard v-if="items.length" class="mb-3">
            <CCardBody>
              <CCardTitle> Statistical Classification Items </CCardTitle>
              <CCardText>
                <TreeNode v-for="node in items" :key="node.id" :node="node">
                </TreeNode>
              </CCardText>
            </CCardBody>
          </CCard>
          <CCard v-else>
            <CCardText>
              There are no itmes yet in the statistical classifciation
            </CCardText>
          </CCard>
        </CCollapse>
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
          @click="$emit('finish')"
          ><span>Finish</span>
        </CButton>
      </CCardText>
    </CCardBody>
  </CCard>
</template>
<script>
import Papa from "papaparse";
import TreeNode from "@/components/TreeNode";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { AggregationType } from "@/common";

export default {
  name: "StatisticalClassificationItems",
  props: ["items", "aggregationType"],

  data() {
    return {
      v$: useValidate(),
      visible: false,
      localAggregationType: this.aggregationType,
      file: "",
      content: [],
      parsed: false,
      visibleCsvModal: false,
      rootItems: [],
      columns: [
        {
          key: "LevelNumber",
          label: "Level Number",
        },
        {
          key: "Code",
          label: "Code",
        },
        {
          key: "Parent",
          label: "Parent",
        },
        {
          key: "LabelEn",
          label: "EN",
        },
        {
          key: "LabelRu",
          label: "RU",
        },
        {
          key: "LabelRo",
          label: "RO",
        },
      ],
    };
  },
  validations: {
    uploadedItems: {
      required,
    },
    localAggregationType: {
      required,
    },
  },
  components: {
    TreeNode,
  },
  computed: {
    aggregationTypes() {
      var types = [];
      for (const key of Object.keys(AggregationType)) {
        types.push(AggregationType[key]);
      }
      return types;
    },
  },
  methods: {
    uploadItems() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          aggregationType: this.localAggregationType,
          rootItens: this.rootItems,
        };
        console.log(formData);
        this.$emit("handleUploadItems", formData);
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.parseFile();
    },
    parseFile() {
      this.visibleCsvModal = true;
      Papa.parse(this.file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          this.content = results;
          this.parsed = true;
        }.bind(this),
      });
    },
    getItemsRecursivly() {
      this.content.data.forEach((row) => {
        if (row.Parent === "") {
          this.rootItems.push(row);
        }
      });
      this.rootItems.forEach(this.getChildren);
      console.log(this.rootItems);
    },
    getChildren(parent) {
      parent.children = [];
      this.content.data.forEach((row) => {
        if (row.Parent === parent.Code) {
          parent.children.push(row);
          this.getChildren(row);
        }
      });
    },
  },
};
</script>
