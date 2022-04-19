<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle>
                <span>
                  {{ $t("structural.statistical_classification_title") }}
                </span>
              </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end">
                <CNavItem>
                  <router-link
                    v-if="isAuthenticated"
                    tag="a"
                    to="/metadata/structural/classifications/add"
                    class="text-decoration-none text-primary"
                    ><CIcon name="cil-plus" />
                    <span class="icon-span">
                      {{ $t("structural.new_statistical_classification") }}
                    </span>
                  </router-link>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>
          <CCardText>
            <div class="table-responsive" v-if="!isLoading">
              <CSmartTable
                v-if="statisticalClassifications"
                :items="statisticalClassifications"
                :activePage="1"
                :columns="columns"
                columnFilter
                cleaner
                itemsPerPageSelect
                :itemsPerPage="5"
                columnSorter
                :sorterValue="{ column: 'localId', state: 'asc' }"
                pagination
                ><template #actions="{ item }">
                  <td
                    style="text-align: right; width: 10%; padding-right: 20px"
                  >
                    <span class="pl-2">
                      <router-link
                        tag="a"
                        title="View"
                        :to="{
                          name: 'StatisticalClassificationView',
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
                          name: 'StatisticalClassificationEdit',
                          params: { id: item.id },
                        }"
                        ><CIcon name="cil-pencil" />
                      </router-link>
                    </span>

                    <span v-if="isAuthenticated && isAdmin" class="pl-2">
                      <router-link
                        tag="a"
                        title="Delete"
                        :to="{
                          name: 'StatisticalClassificationDelete',
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
  name: "StatisticalClassificationsList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: this.$i18n.t("structural.local_ID"),
        },
        {
          key: "name",
          label: this.$i18n.t("structural.name"),
        },
        {
          key: "version",
          label: this.$i18n.t("structural.version"),
        },
        {
          key: "versionDate",
          label: this.$i18n.t("structural.version_date"),
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
  components: {},
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("statisticalClassification", ["statisticalClassifications"]),
  },
  created() {
    this.$store.dispatch("statisticalClassification/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
