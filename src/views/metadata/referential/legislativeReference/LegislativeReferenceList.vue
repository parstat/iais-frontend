<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <span>{{ $t("referential.legislative_references_header") }}</span>
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <router-link
                v-if="isAuthenticated"
                tag="a"
                to="/metadata/referential/gsim/regulation/add"
                class="text-decoration-none text-primary"
              >
                <CIcon name="cil-plus" />
                <span class="icon-span">
                  {{ $t("referential.new_regulation") }}
                </span>
              </router-link>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
      <CCardText>
        <div class="table-responsive" v-if="!isLoading">
          <CSmartTable
            v-if="legislativeReferences.length"
            :items="legislativeReferences"
            :columns="columns"
            column-filter
            items-per-page-select
            :items-per-page="5"
            columnSorter
            pagination
          >
            <template #actions="{ item }">
              <td>
                <span>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'LegislativeReferenceView',
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
                      name: 'LegislativeReferenceEdit',
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
                      name: 'LegislativeReferenceDelete',
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
        <CSpinner v-else color="primary" size="sm" />
      </CCardText>
    </CCardBody>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "LegislativeReferenceList",
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
    ...mapGetters("legislativeReference", ["legislativeReferences"]),
    ...mapGetters("coreui", ["isLoading"]),
  },
  created() {
    this.$store.dispatch("legislativeReference/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  },
};
</script>
