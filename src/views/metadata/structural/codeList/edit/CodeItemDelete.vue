<template>
  <CModal backdrop="static" :visible="showDeleteDialog" @close="closeDialog()">
    <CModalHeader>
      <CModalTitle>Delete Code Item: {{ item?.code }}?</CModalTitle>
    </CModalHeader>
    <CModalBody
      >This action will remove the Code Item form the Code List. This action can
      not be undone. Are you sure you want to delete this Code Item?</CModalBody
    >
    <CModalFooter>
      <CButton color="secondary" @click="closeDialog()" :disabled="disabled">
        Close
      </CButton>
      <CButton color="danger" @click="deleteCodeItem()" :disabled="disabled"
        >Delete Code Item</CButton
      >
    </CModalFooter>
  </CModal>
</template>
<script>
export default {
  name: "codeItemDelete",
  props: ["showDeleteDialog", "item"],
  emits: ["closeDialog", "codeItemDeleted"],
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    closeDialog() {
      console.log(this.item);
      this.$emit("closeDialog");
    },
    deleteCodeItem() {
      const codeListId = this.$route.params.id;
      if (codeListId && this.item?.id) {
        this.disabled = true;
        this.$store
          .dispatch("code/removeCodeItem", {
            codeListId,
            codeItemId: this.item.code,
          })
          .then(() => {
            setTimeout(() => {
              this.$emit("codeItemDeleted");
              this.disabled = false;
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
            this.disabled = false;
          });
      }
    },
  },
};
</script>
<style></style>
