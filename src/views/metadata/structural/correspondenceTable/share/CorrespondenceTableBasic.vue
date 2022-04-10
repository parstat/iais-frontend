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
            :disabled="isEdit"
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
            v-model="selectedSource"
            :disabled="isEdit"
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
            v-model="selectedTarget"
            :disabled="isEdit"
          />
        </CForm>
        <CForm>
          <CFormLabel for="relationship">
            <span>{{
              $t("structural.correspondence_table_relationship")
            }}</span>
          </CFormLabel>
          <v-select
            :options="relationships"
            v-model="selectedRelationship"
            :disabled="isEdit"
          >
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
  props: ["source", "target", "relationship", "isEdit"],

  data() {
    return {
      selectedNodeSetType: "STATISTICAL_CLASSIFICATION",
      selectedRelationship: this.relationship ?? "ONE_TO_ONE",
      selectedSource: this.source,
      selectedTarget: this.target,
      targetNodeSetId: "",
      sourceNodeSetId: "",
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
        console.log(vm.selectedNodeSetType);
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
      this.disabled = true; //disable buttons
      console.log(this.sourceNodeSet);
      const formData = {
        sourceId: this.sourceNodeSetId,
        targetId: this.targetNodeSetId,
        relationship: this.selectedRelationship,
      };
      this.$emit("next", formData);
      this.disabled = false;
    },
    setSourceNodeset(selectedSourceNodeset) {
      if (typeof selectedSourceNodeset !== "undefined") {
        this.sourceNodeSetId = selectedSourceNodeset.id;
      }
    },
    setTargetNodeset(selectedTargetNodeset) {
      if (typeof selectedTargetNodeset !== "undefined") {
        this.targetNodeSetId = selectedTargetNodeset.id;
      }
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
