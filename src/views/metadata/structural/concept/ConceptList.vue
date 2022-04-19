<template>
  <CRow>
    <CCol class="col-12">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol class="col-9">
              <CCardTitle>
                <span>{{ $t("structural.concepts_title") }}</span>
              </CCardTitle>
            </CCol>
            <CCol class="col-3">
              <CNav class="justify-content-end">
                <CNavItem>
                  <router-link
                    v-if="isAuthenticated"
                    tag="a"
                    to="/metadata/structural/concepts/add"
                    class="text-decoration-none text-primary"
                  >
                    <CIcon name="cil-plus" />
                    <span class="icon-span">
                      {{ $t("structural.new_concept") }}
                    </span>
                  </router-link>
                </CNavItem>
              </CNav>
            </CCol>
          </CRow>

          <CCardText>
            <div class="table-responsive" v-if="!isLoading">
              <CSmartTable
                v-if="concepts.length"
                :items="concepts"
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
                >
                <template #actions="{ item }">
                  <td>
                    <span>
                      <router-link
                        tag="a"
                        title="View"
                        :to="{
                          name: 'ConceptView',
                          params: { id: item.id },
                        }"
                        ><CIcon name="cil-magnifying-glass" />
                      </router-link>
                    </span>
                    <span v-if="isAuthenticated">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'ConceptEdit',
                          params: { id: item.id },
                        }"
                        ><CIcon name="cil-pencil" />
                      </router-link>
                    </span>
                    <span v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'ConceptDelete',
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
  name: "ConceptList",
  data() {
    return {
      columns: [
        {
          key: "localId",
          label: this.$i18n.t("structural.local_ID"),
        },
        {
          key: "name",
          label: this.$i18n.t("structural.concept_name"),
        },
        {
          key: "description",
          label: this.$i18n.t("structural.description"),
          filter: false,
          sorter: false,
        },
        // {
        //   key: "version",
        //   filter: false,
        //   sorter: false,
        // },
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
    ...mapGetters("concept", ["concepts"]),
  },
  created() {
    this.$store.dispatch("concept/findAll");
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
