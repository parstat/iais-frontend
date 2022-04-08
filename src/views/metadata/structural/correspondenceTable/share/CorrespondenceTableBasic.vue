<template>
  <CCard>
    <CCardBody>
      <CCardText v-if="codeLists && statisticalClassifications">
        <CForm>
          <CFormLabel for="nodesetType">
            <span>{{
              $t("structural.correspondence_table_nodeset_type")
            }}</span>
          </CFormLabel>
          <v-select
            class="mb-3"
            :options="nodeSetTypes"
            v-model="selectedNodeSetType"
          >
          </v-select>
        </CForm>
        <CForm>
          <CFormLabel for="source">
            <span>{{ $t("structural.correspondence_table_source") }}</span>
          </CFormLabel>
          <v-select
            class="mb-3"
            label="name"
            :options="
              selectedNodeSetType === 'STATISTICAL_CLASSIFICATION'
                ? statisticalClassifications
                : codeLists
            "
            @search="searchNodeset"
            @input="setSourceNodeset"
            :filterable="false"
          />
        </CForm>
        <CForm>
          <CFormLabel for="target">
            <span>{{ $t("structural.correspondence_table_target") }}</span>
          </CFormLabel>
          <v-select
            class="mb-3"
            label="name"
            :filterable="false"
            :options="
              selectedNodeSetType === 'STATISTICAL_CLASSIFICATION'
                ? statisticalClassifications
                : codeLists
            "
            @search="searchNodeset"
            @input="setTargetNodeset"
          />
        </CForm>
        <CForm>
          <CFormLabel for="relationship">
            <span>{{
              $t("structural.correspondence_table_relationship")
            }}</span>
          </CFormLabel>
          <v-select :options="relationships" v-model="selectedRelationship">
          </v-select>
        </CForm>
      </CCardText>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click.prevent="next"
        :disabled="disabled"
        ><span>{{ $t("referential.next") }}</span>
      </CButton>
    </CCardBody>
  </CCard>
</template>
<script>
import { NodeSetType } from "@/common";
import { Relationship } from "@/common";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "CorrespondenceTableBasic",
  props: ["sourceId", "targetId", "relationship"],

  data() {
    return {
      selectedNodeSetType: "",
      selectedRelationship: "ONE_TO_ONE",
      targetNodeset: {},
      sourceNodeSet: {},
      disabled: false,
    };
  },
  methods: {
    searchNodeset(name, loading) {
      loading(true);
      this.search(name, loading, this);
    },
    search: _.debounce((name, loading, vm) => {
      if (name.length > 0) {
        if (vm.selectedNodeSetType === "STATISTICAL_CLASSIFICATION") {
          vm.$store
            .dispatch("statisticalClassification/findByName", escape(name))
            .then(() => {
              loading(false);
            });
        } else {
          vm.$store.dispatch("codeList/findByName", escape(name)).then(() => {
            loading(false);
          });
        }
      } else {
        loading(false);
      }
    }, 500),
    next() {
      console.log("next");
    },
    setSourceNodeset(selectedSourceNodeset) {
      this.sourceNodeSet = selectedSourceNodeset;
      console.log(this.sourceNodeSet);
    },
    setTargetNodeset(selectedTargetNodeset) {
      this.targetNodeSet = selectedTargetNodeset;
      console.log(this.targetNodeSet);
    },
  },
  computed: {
    nodeSetTypes() {
      var types = [];
      for (const key of Object.keys(NodeSetType)) {
        types.push(NodeSetType[key]);
      }
      return types;
    },
    relationships() {
      var relationships = [];
      for (const key of Object.keys(Relationship)) {
        relationships.push(Relationship[key]);
      }
      return relationships;
    },
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("codeList", ["codeLists"]),
    ...mapGetters("statisticalClassification", ["statisticalClassifications"]),
  },
};
</script>
