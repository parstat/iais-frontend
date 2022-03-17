<template>
  <CCard v-if="statisticalStandards.length">
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <span>{{ $t("referential.statistical_standard_header") }}</span>
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <router-link
                v-if="isAuthenticated"
                tag="a"
                to="/metadata/referential/gsim/standard/add"
                class="text-decoration-none text-primary"
              >
                <CIcon name="cil-plus" />
                <span class="icon-span">
                  {{ $t("referential.new_standard") }}
                </span>
              </router-link>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <div class="table-responsive">
        <CSmartTable
          :items="statisticalStandards"
          :columns="columns"
          column-filter
          items-per-page-select
          :items-per-page="5"
          hover
          sorter
          pagination
          ><template #actions="{ item }">
            <td>
              <span v-if="isAuthenticated">
                <router-link
                  tag="a"
                  :to="{
                    name: 'StatisticalStandardEdit',
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
                    name: 'StatisticalStandardView',
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
                    name: 'StatisticalStandardDelete',
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
    </CCardBody>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "StatisticalStandardList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: this.$i18n.t("referential.ID"),
        },
        {
          key: "name",
          label: this.$i18n.t("referential.agent_name"),
        },
        {
          key: "type",
          label: this.$i18n.t("referential.type"),
        },
        {
          key: "actions",
          label: this.$i18n.t("referential.actions"),
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("statisticalStandard", ["statisticalStandards"]),
  },
  created() {
    this.$store.dispatch("statisticalStandard/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
