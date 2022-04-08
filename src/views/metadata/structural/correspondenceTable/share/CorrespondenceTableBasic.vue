<template>
  <CCard>
    <CCardBody>
      <CCardText>
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
          <v-select class="mb-3"> </v-select>
        </CForm>
        <CForm>
          <CFormLabel for="target">
            <span>{{ $t("structural.correspondence_table_target") }}</span>
          </CFormLabel>
          <v-select class="mb-3"> </v-select>
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

export default {
  name: "CorrespondenceTableBasic",
  props: ["sourceId", "targetId", "relationship"],

  data() {
    return {
      selectedNodeSetType: "STATISTICAL_CLASSIFICATION",
      selectedRelationship: "ONE_TO_ONE",
    };
  },
  methods: {},
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
  },
};
</script>
