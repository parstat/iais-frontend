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
      <CButton color="secondary" @click="closeDialog()"> Close </CButton>
      <CButton color="danger" @click="deleteCodeItem()"
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
  watch: {
    item: function (newVal) {
      this.itemId = newVal.id;
    },
  },
  data() {
    return {
      itemId: null,
    };
  },
  methods: {
    closeDialog() {
      console.log(this.item);
      this.$emit("closeDialog");
    },
    deleteCodeItem() {
      if (this.item?.id) {
        this.$store.dispatch("code/removeCodeItem", this.item.id).then(() => {
          this.$emit("codeItemDeleted");
        });
      }
    },
  },
};
</script>
<style></style>
