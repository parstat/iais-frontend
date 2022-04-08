<template>
  <CCard class="mb-3">
    <CCardBody>
      <CCardTitle>
        <span>{{ $t("structural.upload_items") }}</span>
      </CCardTitle>
      <CCardText>
        <CFormLabel for="aggregationType">
          <span>
            {{ $t("structural.statistical_classification_aggregation_type") }}
          </span>
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
        <span class="text-danger" v-if="v$.localAggregationType.$error">
          {{ $t("referential.validations.type") }}
        </span>
        <CFormLabel class="mb-3">
          <input type="file" accept=".csv" @change="handleFileUpload($event)" />
        </CFormLabel>
        <CAlert color="primary" v-if="isLoading">
          <CSpinner color="primary" size="sm" />
          <span>{{ $t("structural.uploading_wait") }}</span>
        </CAlert>
        <CButton color="info" variant="ghost" v-if="file" @click="parseFile">
          <span>{{ $t("structural.parse_file") }}</span>
        </CButton>
        <br />
        <br />
        <CModal :visible="visibleCsvModal" @close="closeModal">
          <CModalHeader>
            <CModalTitle>
              <span>{{ $t("structural.CSV_items") }}</span>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CButton
              color="primary"
              class="mb-3"
              @click.prevent="getItemsRecursivly"
              :disabled="parseDisabled"
              ><span>{{ $t("structural.parse_CSV") }}</span>
            </CButton>
            <div style="height: 450px; overflow: scroll">
              <TreeNode v-for="node in rootItems" :key="node.id" :node="node">
              </TreeNode>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" @click="closeModal">
              <span>{{ $t("structural.close") }}</span>
            </CButton>
            <CButton
              color="primary"
              @click.prevent="uploadItems"
              :disabled="disabled"
              ><span>{{ $t("structural.upload_items") }}</span>
            </CButton>
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
              <CCardTitle>
                <span>
                  {{ $t("structural.statistical_classification_items") }}
                </span>
              </CCardTitle>
              <CCardText>
                <TreeNode v-for="node in items" :key="node.id" :node="node">
                </TreeNode>
              </CCardText>
            </CCardBody>
          </CCard>
          <CCard v-else>
            <CCardText>
              <span>{{ $t("structural.no_items") }}</span>
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
          ><span>{{ $t("referential.finish") }}</span>
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
import { mapGetters } from "vuex";

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
      parseDisabled: false,
      disabled: false,
      columns: [
        {
          key: "levelNumber",
          label: this.$i18n.t("structural.level_number"),
        },
        {
          key: "code",
          label: this.$i18n.t("structural.code"),
        },
        {
          key: "parent",
          label: this.$i18n.t("structural.parent"),
        },
        {
          key: "labelEn",
          label: "EN",
        },
        {
          key: "labelRu",
          label: "RU",
        },
        {
          key: "labelRo",
          label: "RO",
        },
      ],
    };
  },
  validations: {
    rootItems: {
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
    ...mapGetters("coreui", ["isLoading"]),
  },
  methods: {
    async uploadItems() {
      this.localIsLoading = true;
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          aggregationType: this.localAggregationType,
          rootItems: this.rootItems,
        };
        console.log(formData);
        this.$emit("uploadItems", formData);
        this.resetItemFields();
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
        }.bind(this),
      });
    },
    getItemsRecursivly() {
      this.parseDisabled = true;
      this.content.data.forEach((row) => {
        if (row.parent === "") {
          //row.value = row.labelEn;
          delete row.parent;
          var label = {
            en: row.labelEn,
            ro: row.labelRo,
            ru: row.labelRu,
          };
          var desc = {
            en: row.descriptionEn ? row.descriptionEn : "",
            ro: row.descriptionRo ? row.descriptionRo : "",
            ru: row.descriptionRu ? row.descriptionRu : "",
          };
          delete row.labelEn;
          delete row.labelRo;
          delete row.labelRu;
          delete row.descriptionEn;
          delete row.descriptionRo;
          delete row.descriptionRu;
          row.label = label;
          row.desc = desc;
          this.rootItems.push(row);
        }
      });
      this.rootItems.forEach(this.getChildren);
    },
    getChildren(parent) {
      parent.children = [];
      this.content.data.forEach((row) => {
        if (row.parent === parent.code) {
          //row.value = row.labelEn;
          delete row.parent;
          var label = {
            En: row.labelEn,
            Ro: row.labelRo,
            Ru: row.labelRu,
          };
          delete row.labelEn;
          delete row.labelRo;
          delete row.labelRu;
          var desc = {
            en: row.descriptionEn ? row.descriptionEn : "",
            ro: row.descriptionRo ? row.descriptionRo : "",
            ru: row.descriptionRu ? row.descriptionRu : "",
          };
          delete row.labelEn;
          delete row.labelRo;
          delete row.labelRu;
          delete row.descriptionEn;
          delete row.descriptionRo;
          delete row.descriptionRu;
          row.label = label;
          row.desc = desc;
          parent.children.push(row);
          this.getChildren(row);
        }
      });
    },
    closeModal() {
      this.rootItems = [];
      this.visibleCsvModal = false;
      //this.parsed = false;
    },
    resetItemFields() {
      this.rootItems = [];
      this.file = "";
      this.content = [];
      //this.parsed = false;
      this.localAggregationType = this.aggregationType;
      this.visibleCsvModal = false;
      this.disabled = false;
      this.parseDisabled = false;
      this.v$.$reset();
    },
  },
};
</script>
