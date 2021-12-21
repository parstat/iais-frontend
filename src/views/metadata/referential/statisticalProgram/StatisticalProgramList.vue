<template>
  <div class="row">
    <div class="col-12">
      <CCard>
        <CCardHeader v-if="isAuthenticated">
          <CNav variant="pills" class="card-header-pills">
            <CNavItem>
              <span style="padding: 0.75rem 0.4rem">
                <router-link
                  v-if="isAuthenticated"
                  tag="a"
                  to="/metadata/referential/add"
                >
                  <CIcon name="cil-plus" />
                  Add
                </router-link>
              </span>
            </CNavItem>
          </CNav>
        </CCardHeader>
        <CCardBody>
          <CCardTitle> Statistical processes </CCardTitle>
          <CSmartTable
            :items="viewStatisticalPrograms"
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
                <span v-if="isAuthenticated">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalProgramEdit',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-pencil" />
                  </router-link>
                </span>
                <span>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalProgramView',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-magnifying-glass" />
                  </router-link>
                </span>
                <span v-if="isAuthenticated && isAdmin">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalProgramDelete',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-trash" />
                  </router-link>
                </span>
              </td>
            </template>
          </CSmartTable>
        </CCardBody>
      </CCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "StatisticalProgramList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: "Id",
        },
        {
          key: "name",
          label: "Survey name",
        },
        {
          key: "acronym",
        },
        {
          key: "description",
        },
        {
          key: "owner",
        },
        {
          key: "maintainer",
        },
        {
          key: "contact",
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
    ...mapGetters("statisticalProgram", ["viewStatisticalPrograms"]),
  },
  created() {
    this.$store.dispatch("statisticalProgram/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
