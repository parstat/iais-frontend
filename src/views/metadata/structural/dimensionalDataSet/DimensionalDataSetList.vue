<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle>Card title</CCardTitle>
            </CCol>
            <CCol class="col-3">
              <!-- <CNav class="justify-content-end">
                <CNavItem>
                  <router-link
                    v-if="isAuthenticated"
                    tag="a"
                    to="/metadata/structural/dimensionalDataSet/add"
                    class="text-decoration-none text-primary"
                    ><CIcon name="cil-plus" />
                    <span class="icon-span">
                      Add new dimensional data set
                    </span>
                  </router-link>
                </CNavItem>
              </CNav> -->
            </CCol>
          </CRow>
          <CCardText>
            <div class="table-responsive" v-if="!isLoading">
              <CSmartTable
                v-if="dimensionalDataSets?.length"
                :items="dimensionalDataSets"
                :activePage="1"
                header
                :columns="columns"
                columnFilter
                cleaner
                itemsPerPageSelect
                :itemsPerPage="5"
                columnSorter
                :sorterValue="{ column: 'localId', state: 'asc' }"
                pagination
              >
                <template #show_program="{ item }">
                  <td class="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      square
                      size="sm"
                      @click="showProgram(item)"
                      ><span>{{ $t("structural.show") }}</span>
                    </CButton>
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
                          name: 'DimensionalDataSetView',
                          params: { id: item.id },
                        }"
                        ><CIcon name="cil-magnifying-glass" />
                      </router-link>
                    </span>
                    <!-- <span v-if="isAuthenticated" class="pl-2">
                      <router-link
                        tag="a"
                        title="Edit"
                        :to="{
                          name: 'UnitDataSetEdit',
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
                          name: 'UnitDataSetDelete',
                          params: { id: item.id },
                        }"
                        ><CIcon name="cil-trash" />
                      </router-link>
                    </span> -->
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
  name: "DimensionalDataSetList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: this.$i18n.t("structural.ID"),
        },
        {
          key: "name",
          label: this.$i18n.t("structural.unit_data_set_name"),
        },
        {
          key: "type",
          label: this.$i18n.t("structural.type"),
        },
        {
          key: "exchangeChannel",
          label: this.$i18n.t("structural.channel"),
        },
        {
          key: "exchangeDirection",
          label: this.$i18n.t("structural.direction"),
        },
        {
          key: "show_program",
          label: this.$i18n.t("structural.program"),
          _style: { width: "1%" },
          filter: false,
          sorter: false,
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
    ...mapGetters("dimensionalDataSet", ["dimensionalDataSets"]),
  },
  methods: {
    showProgram(item) {
      this.$router.push(item.statisticalProgramLink);
    },
  },
  created() {
    this.$store.dispatch("dimensionalDataSet/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
