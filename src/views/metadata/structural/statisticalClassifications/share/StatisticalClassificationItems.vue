<template>
  <CCard class="mb-3">
    <CCardBody>
      <CCardTitle> Items </CCardTitle>
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

        <CButton
          class="mb-3"
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="browseItems"
          ><span>Upload csv file</span>
        </CButton>
        <CCard v-if="items.length" class="mb-3">
          <CCardBody>
            <CCardTitle> Statistical Classification Items </CCardTitle>
            <CCardText>
              <TreeNode v-for="node in items" :key="node.id" :node="node">
              </TreeNode>
            </CCardText>
          </CCardBody>
        </CCard>
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
      localAggregationType: this.aggregationType,
      uploadedItems: "",
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
          aggregationType: "PARENT_CHILD",
          rootItens: this.uploadedItems,
        };
        console.log(formData);
        this.$emit("handleUploadItems", formData);
      }
    },
    browseItems() {
      console.log("browse items clicked");
    },
    radioValue(value) {
      console.log(value);
    },
  },
};
</script>
