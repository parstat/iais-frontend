<template>
  <CCard>
    <CCardHeader class="bg-white">
      <CRow>
        <CCol class="col-9">
          <CCardTitle>
            <CIcon name="cil-description" />
            <span
              >&nbsp;{{ $t("referential.legislative_references_header") }}</span
            >
          </CCardTitle>
        </CCol>
        <CCol class="col-3">
          <CNav class="justify-content-end">
            <CNavItem>
              <router-link
                tag="a"
                to="/metadata/referential/gsim/regulation/add"
                class="text-decoration-none text-primary"
                ><CIcon name="cil-plus" />
                <span class="icon-span">
                  {{ $t("referential.add") }}
                </span>
              </router-link>
            </CNavItem>
          </CNav>
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody>
      <CCardText>
        <div class="form-group mb-3" v-if="legislativeReferences">
          <CFormLabel for="description">
            <span>{{ $t("referential.legislative_references_header") }}</span>
          </CFormLabel>
          <v-select
            label="name"
            :options="legislativeReferences"
            :placeholder="$t('referential.selection.legislative_references')"
            :filterable="false"
            @search="searchLegislativeReference"
            @input="addLegislativeReference"
            ><template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                <span>{{ $t("referential.no_found") }}&nbsp;</span>
                <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                ><span>{{
                  $t("referential.search_for_legislative reference")
                }}</span>
              </em>
            </template>
            <template v-slot:content="option">
              <div class="d-center">
                <span
                  ><strong>{{ option.name }} {{ option.version }}</strong></span
                >
                <p>{{ $filters.truncateString(option.description) }}</p>
              </div>
            </template>
          </v-select>
        </div>
        <CRow>
          <CCol
            class="col-lg-4 col-md-6 col-sm-12"
            v-for="legislativeReference of references"
            :key="legislativeReference.id"
            ><CCard class="card-border bg-lighter mb-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    <CCardTitle component="h6">
                      <span>{{ legislativeReference.name }}</span>
                    </CCardTitle>
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <router-link
                          tag="a"
                          class="text-dark pr-1"
                          :to="{
                            name: 'LegislativeReferenceView',
                            params: { id: legislativeReference.id },
                          }"
                          ><CIcon name="cil-magnifying-glass" />
                        </router-link>
                      </CNavItem>
                      <CNavItem>
                        <span
                          class="text-dark"
                          v-on:click="
                            removeLegislativeReference(legislativeReference)
                          "
                          ><CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CCardText>
                  <span>{{ legislativeReference.description }}</span>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardText>
    </CCardBody>
    <CCardFooter class="bg-white">
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('back')"
        ><span>{{ $t("referential.back") }}</span>
      </CButton>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click="$emit('next', fieldChanged)"
        ><span>{{ $t("referential.next") }}</span>
      </CButton>
    </CCardFooter>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "ReferencesEdit",
  props: ["references"],
  data() {
    return {
      fieldChanged: false,
    };
  },
  computed: {
    ...mapGetters("legislativeReference", ["legislativeReferences"]),
  },
  methods: {
    searchLegislativeReference(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        vm.$store
          .dispatch("legislativeReference/findByName", escape(name))
          .then(() => {
            loading(false);
          });
      } else {
        loading(false);
      }
    }, 500),
    addLegislativeReference(selectedLegislativeReference) {
      if (typeof selectedLegislativeReference.id != "undefined") {
        this.$emit("addLegislativeReference", selectedLegislativeReference);
        this.fieldChanged = true;
      }
    },
    removeLegislativeReference(selectedLegislativeReference) {
      if (typeof selectedLegislativeReference.id != "undefined") {
        this.$emit("removeLegislativeReference", selectedLegislativeReference);
        this.fieldChanged = true;
      }
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: none !important;
}
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
</style>
