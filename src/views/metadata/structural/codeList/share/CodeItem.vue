<template>
  <div>
    <CCard v-if="code">
      <CCardBody>
        <CCardText>
          <CForm>
            <label for="code">Code*</label>
            <input
              id="code"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': v$.codeName.$error,
                'mb-3': !v$.codeName.$error,
              }"
              placeholder="Code item code"
              v-model.trim="codeName"
            />
            <div class="text-danger mb-3" v-if="v$.codeName.$error">
              Please enter a code for the code item.
            </div>
          </CForm>
          <CForm>
            <label for="label">Label*</label>
            <input
              id="label"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': v$.label.$error,
                'mb-3': !v$.label.$error,
              }"
              placeholder="Code label"
              v-model.trim="label"
            />
            <div class="text-danger mb-3" v-if="v$.label.$error">
              Please enter a label.
            </div>
          </CForm>
          <CForm>
            <label for="description">Description*</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': v$.description.$error,
                'mb-3': !v$.description.$error,
              }"
              placeholder="Unit type description"
              v-model.trim="description"
            />
            <div class="text-danger mb-3" v-if="v$.description.$error">
              Please enter a description.
            </div>
          </CForm>
          <div class="form-mandatory">
            <span>*Mandatory fields</span>
          </div>
        </CCardText>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click.prevent="handleSubmit()"
          :disabled="disabled"
          ><span>Add code item</span>
        </CButton>
        <hr />
        <div class="code-items-section">
          <div class="table-responsive">
            <CSmartTable
              v-if="code.codeItems?.length"
              :activePage="1"
              :items="code.codeItems"
              :columns="codeItemsColumns"
              columnFilter
              cleaner
              itemsPerPageSelect
              :itemsPerPage="5"
              columnSorter
              pagination
            >
              <template #actions="{ item }">
                <td style="text-align: right; width: 10%; padding-right: 20px">
                  <!-- <span
                    v-if="isAuthenticated"
                    class="pl-2 clickable"
                    @click="openEditDialog(item)"
                  >
                    <CIcon name="cil-pencil" />
                  </span> -->

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
        </div>
      </CCardBody>
    </CCard>
    <CModal
      backdrop="static"
      :visible="showDeleteDialog"
      @close="showDeleteDialog = false"
    >
      <CModalHeader>
        <CModalTitle>Delete Code Item: {{ item?.code }}?</CModalTitle>
      </CModalHeader>
      <CModalBody
        >This action will remove the Code Item form the Code List. This action
        can not be undone. Are you sure you want to delete this Code
        Item?</CModalBody
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
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "CodeEditBasic",
  props: ["code"],
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      codeName: "",
      description: "",
      label: "",
      showEditDialog: false,
      showDeleteDialog: false,
      item: null,
      codeItemsColumns: [
        "code",
        "value",
        {
          key: "actions",
          label: "Actions",
          _style: "",
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  validations: {
    codeName: {
      required,
    },
    description: {
      required,
    },
    label: {
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          nodeSetId: this.code.id,
          codeName: this.codeName,
          description: this.description,
          label: this.label,
        };
        this.$store.dispatch("code/addCodeItem", formData).then(() => {
          setTimeout(() => {
            this.reloadCodeList();
          }, 1000);
        });
        console.log(formData);
      }
    },
    reloadCodeList() {
      this.item = null;
      this.showEditDialog = false;
      this.showDeleteDialog = false;
      this.disabled = false;
      this.codeName = "";
      this.description = "";
      this.label = "";
      this.v$.$reset();
      this.$store.dispatch("code/findById", this.$route.params.id);
    },
    openEditDialog(item) {
      console.log(item);
      this.item = item;
      this.showEditDialog = true;
    },
    openDeleteDialog(item) {
      this.item = item;
      this.showDeleteDialog = true;
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
              this.reloadCodeList();
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
<style>
.code-items-section {
  margin-top: 20px;
}
.clickable {
  cursor: pointer;
}
</style>
