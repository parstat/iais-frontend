<template>
  <CRow v-if="variable">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ variable.name }}</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <CFormLabel for="description">
                <span>{{ $t("structural.local_ID") }}</span>
              </CFormLabel>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="variable.localId"
                disabled
              />
            </CForm>
            <CForm v-if="variable.account">
              <CFormLabel for="responsible">
                <span>{{ $t("structural.name") }}</span>
              </CFormLabel>
              <input
                id="account"
                type="text"
                class="form-control"
                v-model.trim="variable.name"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="type">
                <span>{{ $t("structural.description") }}</span>
              </CFormLabel>
              <input
                id="type"
                type="text"
                class="form-control"
                v-model.trim="variable.description"
                disabled
              />
            </CForm>
            <CForm>
              <CFormLabel for="type">
                <span>{{ $t("structural.definition") }}</span>
              </CFormLabel>
              <input
                id="type"
                type="text"
                class="form-control"
                v-model.trim="variable.definition"
                disabled
              />
            </CForm>
            <div class="table-responsive" v-if="variable">
              <CSmartTable
                v-if="variable.representations?.length"
                :activePage="1"
                :items="variable.representations"
                :columns="variableColumns"
                columnFilter
                cleaner
                itemsPerPageSelect
                :itemsPerPage="5"
                columnSorter
                pagination
              ></CSmartTable>
            </div>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            ><span>{{ $t("structural.delete") }}</span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "VariableDelete",
  data() {
    return {
      variableColumns: [
        {
          key: "localId",
          label: this.$i18n.t("structural.local_ID"),
        },
        {
          key: "Name",
          label: this.$i18n.t("structural.name"),
        },
      ],
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("variable", ["variable"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("variable/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
  },
};
</script>
