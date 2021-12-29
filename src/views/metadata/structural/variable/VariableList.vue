<template>
  <CRow>
    <CCol class="col-12">
      <CCard v-if="variables">
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle> Variables </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end">
                <CNavItem>
                  <router-link
                    v-if="isAuthenticated"
                    tag="a"
                    to="/metadata/structural/variable/add"
                    class="text-decoration-none text-primary"
                  >
                    <CIcon name="cil-plus" />
                    <span class="icon-span">New Variable</span>
                  </router-link>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>

          <CCardText>
            <div class="table-responsive">
              <CSmartTable
                :items="variables"
                :columns="columns"
                column-filter
                table-filter
                items-per-page-select
                :items-per-page="5"
                hover
                sorter
                pagination
              >
                <template #actions="{ item }">
                  <td>
                    <span>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'VariableView',
                          params: { id: item.id },
                        }"
                      >
                        <CIcon name="cil-magnifying-glass" />
                      </router-link>
                    </span>
                    <span v-if="isAuthenticated">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'VariableEdit',
                          params: { id: item.id },
                        }"
                      >
                        <CIcon name="cil-pencil" />
                      </router-link>
                    </span>
                    <span v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'VariableDelete',
                          params: { id: item.id },
                        }"
                      >
                        <CIcon name="cil-trash" />
                      </router-link>
                    </span>
                  </td>
                </template>
              </CSmartTable>
            </div>
          </CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "VariableList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Variable Name",
        },
        {
          key: "description",
        },
        {
          key: "version",
        },
        {
          key: "measures",
        },
        {
          key: "actions",
          label: "Actions",
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("variable", ["variables"]),
  },
  created() {
    this.$store.dispatch("variable/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
