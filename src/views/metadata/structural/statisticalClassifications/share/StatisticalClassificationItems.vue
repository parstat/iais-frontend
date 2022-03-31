<template>
  <CCard class="mb-3">
    <CCardBody>
      <CCardTitle> Items </CCardTitle>
      <CCardText>
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

export default {
  name: "StatisticalClassificationItems",
  props: ["items"],

  data() {
    return {
      v$: useValidate(),
      uploadedItems: "",
    };
  },
  validations: {
    uploadedItems: {
      required,
    },
  },
  components: {
    TreeNode,
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
  },
};
</script>
