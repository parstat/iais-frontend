<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle>
                <span>{{ $t("structural.correspondance_tables") }}</span>
              </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end">
                <CNavItem>
                  <router-link
                    v-if="isAuthenticated"
                    tag="a"
                    to="/metadata/structural/correspondences/add"
                    class="text-decoration-none text-primary"
                    ><CIcon name="cil-plus" />
                    <span class="icon-span">
                      {{ $t("structural.new_correspondance") }}
                    </span>
                  </router-link>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>
          <CCardText>
            <div class="table-responsive" v-if="!isLoading">
              <CSmartTable
                v-if="correspondences.length"
                :items="correspondences"
                :activePage="1"
                :columns="columns"
                columnFilter
                itemsPerPageSelect
                :itemsPerPage="5"
                pagination
                ><template #sourcename="{ item }">
                  <td>
                    {{ item.source.name }}
                  </td>
                </template>
                <template #sourceversion="{ item }">
                  <td>
                    {{ item.source.version }}
                  </td>
                </template>
                <template #targetname="{ item }">
                  <td>
                    {{ item.target.name }}
                  </td>
                </template>
                <template #targetversion="{ item }">
                  <td>
                    {{ item.target.version }}
                  </td>
                </template>
                <template #actions="{ item }">
                  <td
                    style="text-align: right; width: 10%; padding-right: 20px"
                  >
                    <span class="pl-2">
                      <router-link
                        tag="a"
                        title="View"
                        :to="{
                          name: 'CorrespondenceTableView',
                          params: { id: item.id },
                        }"
                        ><CIcon name="cil-magnifying-glass" />
                      </router-link>
                    </span>
                    <span v-if="isAuthenticated" class="pl-2">
                      <router-link
                        tag="a"
                        title="Edit"
                        :to="{
                          name: 'CorrespondenceTableEdit',
                          params: { id: item.id },
                        }"
                        ><CIcon name="cil-pencil" />
                      </router-link>
                    </span>
                    <span
                      v-if="isAuthenticated && isAdmin"
                      class="pl-2"
                      v-c-tooltip="'Delete'"
                      ><router-link
                        tag="a"
                        title="Delete"
                        :to="{
                          name: 'CorrespondenceTableDelete',
                          params: { id: item.id },
                        }"
                        ><CIcon name="cil-trash" />
                      </router-link>
                    </span>
                  </td>
                </template>
              </CSmartTable>
            </div>
            <CSpinner v-else color="primary" size="sm" />
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
  name: "CorrespondenceTableList",
  data() {
    return {
      columns: [
        {
          key: "sourcename",
          label: this.$i18n.t("structural.source_name"),
        },
        {
          key: "sourceversion",
          label: this.$i18n.t("structural.source_version"),
        },
        {
          key: "targetname",
          label: this.$i18n.t("structural.target_name"),
        },
        {
          key: "targetversion",
          label: this.$i18n.t("structural.target_version"),
        },
        {
          key: "relationship",
          label: this.$i18n.t("structural.relationship"),
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
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("correspondence", ["correspondences"]),
  },
  created() {
    this.$store.dispatch("correspondence/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
