<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle> Code List </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end">
                <CNavItem>
                  <router-link
                    v-if="isAuthenticated"
                    tag="a"
                    to="/metadata/structural/code/add"
                    class="text-decoration-none text-primary"
                  >
                    <CIcon name="cil-plus" />
                    <span class="icon-span">New Code</span>
                  </router-link>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>
          <CCardText>
            <div class="table-responsive">
              <CSmartTable
                :items="codes"
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
                  <td
                    style="text-align: right; width: 10%; padding-right: 20px"
                  >
                    <span class="pl-2">
                      <router-link
                        tag="a"
                        title="View"
                        :to="{
                          name: 'CodeView',
                          params: { id: item.id },
                        }"
                      >
                        <CIcon name="cil-magnifying-glass" />
                      </router-link>
                    </span>
                    <span v-if="isAuthenticated" class="pl-2">
                      <!-- <router-link
                      tag="a"
                      title="Edit"
                      :to="{
                        name: 'CodeEdit',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-pencil" />
                    </router-link> -->
                    </span>

                    <span v-if="isAuthenticated && isAdmin" class="pl-2">
                      <!--  <router-link
                      tag="a"
                      title="Delete"
                      :to="{
                        name: 'CodeDelete',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-trash" />
                    </router-link> -->
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
  name: "CodeList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Code Name",
        },
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
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("code", ["codes"]),
  },
  created() {
    this.$store.dispatch("code/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
