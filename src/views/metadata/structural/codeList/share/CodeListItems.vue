<template>
  <div>
    <CCard v-if="codeList">
      <CCardBody>
        <CCardText>
          <CForm>
            <CFormLabel for="code">
              <span>{{ $t("structural.code") }}*</span>
            </CFormLabel>
            <input
              id="code"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': v$.code.$error,
                'mb-3': !v$.code.$error,
              }"
              :placeholder="$t('structural.code')"
              v-model.trim="code"
            />
            <span class="text-danger mb-3" v-if="v$.code.$error">
              {{ $t("structural.validations.code") }}
            </span>
          </CForm>
          <CForm>
            <CFormLabel for="label">
              <span>{{ $t("structural.label_en") }}</span>
              <span v-if="locale === 'en'">*</span>
            </CFormLabel>
            <input
              id="label"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': v$.label.en.$error,
                'mb-3': !v$.label.en.$error,
              }"
              :placeholder="$t('structural.label_english')"
              v-model.trim="label.en"
            />
            <span class="text-danger mb-3" v-if="v$.label.en.$error">
              {{ $t("structural.validations.label_english") }}
            </span>
          </CForm>
          <CForm>
            <CFormLabel for="label">
              <span>{{ $t("structural.label_ro") }}</span>
              <span v-if="locale === 'ro'">*</span>
            </CFormLabel>
            <input
              id="label"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': v$.label.ro.$error,
                'mb-3': !v$.label.ro.$error,
              }"
              :placeholder="$t('structural.label_romanian')"
              v-model.trim="label.ro"
            />
            <span class="text-danger mb-3" v-if="v$.label.ro.$error">
              {{ $t("structural.validations.label_romanian") }}
            </span>
          </CForm>
          <CForm>
            <CFormLabel for="label">
              <span>{{ $t("structural.label_ru") }}</span>
              <span v-if="locale === 'ru'">*</span>
            </CFormLabel>
            <input
              id="label"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': v$.label.ru.$error,
                'mb-3': !v$.label.ru.$error,
              }"
              :placeholder="$t('structural.label_russian')"
              v-model.trim="label.ru"
            />
            <span class="text-danger mb-3" v-if="v$.label.ru.$error">
              {{ $t("structural.validations.label_russian") }}
            </span>
          </CForm>
          <CForm>
            <CFormLabel for="description">
              <span>{{ $t("structural.description") }}</span>
            </CFormLabel>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              :placeholder="$t('structural.unit_type_description')"
              v-model.trim="description"
            />
          </CForm>
          <div class="form-mandatory">
            <span>*{{ $t("structural.mandatory_fields") }}</span>
          </div>
        </CCardText>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="handleSubmit()"
          :disabled="disabled"
          ><span>{{ $t("structural.add_code_item") }}</span>
        </CButton>
        <hr />
        <div class="code-items-section">
          <div class="table-responsive">
            <CSmartTable
              v-if="codeList.codeItems?.length"
              :activePage="1"
              :items="codeList.codeItems"
              :columns="codeItemsColumns"
              columnFilter
              cleaner
              itemsPerPageSelect
              :itemsPerPage="5"
              columnSorter
              pagination
              ><template #actions="{ item }">
                <td style="text-align: right; width: 10%; padding-right: 20px">
                  <span
                    v-if="isAuthenticated"
                    class="pl-2 clickable"
                    @click="openDeleteDialog(item)"
                    ><CIcon name="cil-trash" />
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
      ><CModalHeader>
        <CModalTitle>
          <span
            >{{ $t("structural.delete_code_item") }}: {{ item?.code }}?</span
          >
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <span>{{ $t("structural.delete_code_item_text") }}</span>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          @click="() => (showDeleteDialog = false)"
          :disabled="disabled"
          ><span>{{ $t("structural.close") }}</span>
        </CButton>
        <CButton color="danger" @click="deleteCodeItem()" :disabled="disabled"
          ><span>{{ $t("structural.delete_code_item") }}</span>
        </CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  name: "CodeListItems",
  props: ["codeList"],
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("localization", ["locale"]),
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      code: "",
      description: "",
      label: {
        en: "",
        ro: "",
        ru: "",
      },
      showDeleteDialog: false,
      item: null,
      codeItemsColumns: [
        {
          key: "code",
          label: this.$i18n.t("structural.code"),
        },
        {
          key: "value",
          label: this.$i18n.t("structural.value"),
        },
        {
          key: "actions",
          label: this.$i18n.t("structural.actions"),
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  validations: {
    code: {
      required,
    },
    label: {
      en: {
        required: function () {
          return !(this.locale === "en" && this.label.en === "");
        },
      },
      ro: {
        required: function () {
          return !(this.locale === "ro" && this.label.ro === "");
        },
      },
      ru: {
        required: function () {
          return !(this.locale === "ru" && this.label.ru === "");
        },
      },
    },
  },
  methods: {
    async handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          nodeSetId: this.codeList.id,
          code: this.code,
          description: this.description,
          label: this.label,
        };
        this.$store.dispatch("codeList/addCodeItem", formData);
        this.resetForm();
      }
    },
    resetForm() {
      this.item = null;
      this.showEditDialog = false;
      this.showDeleteDialog = false;
      this.disabled = false;
      this.code = "";
      this.description = "";
      this.label = {
        en: "",
        ro: "",
        ru: "",
      };
      this.v$.$reset();
    },
    openEditDialog(item) {
      console.log(item);
      this.item = item;
      this.showEditDialog = true;
    },
    openDeleteDialog(item) {
      console.log(item);
      this.item = item;
      this.showDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
    },
    deleteCodeItem() {
      const codeListId = this.$route.params.id;
      if (codeListId && this.item?.id) {
        this.disabled = true;
        this.$store.dispatch("codeList/removeCodeItem", {
          codeListId,
          codeItemId: this.item.code,
        });
        this.reloadCodeList();
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
