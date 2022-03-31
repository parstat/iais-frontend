<template>
  <CRow>
    <CCol class="col-12">
      <CCard v-if="statisticalClassification">
        <CCardHeader class="bg-white" component="h5">
          <span>
            {{ statisticalClassification.name }}
            {{ statisticalClassification.localId }}
            {{ statisticalClassification.version }}</span
          >
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol class="col-3 mr-2">
              <CNav class="flex-column" variant="pills" role="tab">
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 0"
                    @click="
                      () => {
                        activeTab = 0;
                      }
                    "
                  >
                    <span>{{ $t("referential.basic") }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 1"
                    @click="
                      () => {
                        activeTab = 1;
                      }
                    "
                  >
                    <span>{{
                      $t("structural.statistical_classification_levels")
                    }}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="javascript:void(0);"
                    :active="activeTab === 2"
                    @click="
                      () => {
                        activeTab = 2;
                      }
                    "
                  >
                    <span>{{
                      $t("structural.statistical_classification_items")
                    }}</span>
                  </CNavLink>
                </CNavItem>
              </CNav>
            </CCol>
            <CCol class="col-9 ml-2">
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 0"
                >
                  <template #title>
                    <span>{{ $t("referential.basic") }}</span>
                    <span class="float-right" v-if="editedBasic"
                      ><CIcon name="cil-check-alt"
                    /></span>
                  </template>
                  <app-statistical-classification-basic
                    :localId="statisticalClassification.localId"
                    :name="statisticalClassification.name"
                    :version="statisticalClassification.version"
                    :description="statisticalClassification.description"
                    :link="statisticalClassification.link"
                    :definition="statisticalClassification.definition"
                    @next="handleUpdateBasic"
                  />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 1"
                >
                  <template #title>
                    <span>{{
                      $t("structural.statistical_classification_levels")
                    }}</span>
                    <span class="float-right" v-if="editedLevels"
                      ><CIcon nam="cil-check-alt"
                    /></span>
                  </template>
                  <app-statistical-classificaition-levels
                    :levels="statisticalClassification.levels"
                    @addLevel="handleAddLevel"
                    @next="nextLevels"
                    @back="back"
                  />
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  :visible="activeTab === 2"
                >
                  <template #title>
                    <span>{{
                      $t("structural.statistical_classification_items")
                    }}</span>
                    <span class="float-right" v-if="editedItems"
                      ><CIcon nam="cil-check-alt"
                    /></span>
                  </template>
                  <app-statistical-classificaition-items
                    :items="statisticalClassification.rootItems"
                    @uploadItems="handleUploadItems"
                    @finish="finish"
                    @back="back"
                  />
                </CTabPane>
              </CTabContent>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import StatisticalClassificationBasic from "./share/StatisticalClassificationBasic";
import StatisticalClassificationLevels from "./share/StatisticalClassificationLevels";
import StatisticalClassificationItems from "./share/StatisticalClassificationItems.vue";

import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "StatisticalClassificationEdit",
  data() {
    return {
      activeTab: 0,
      editedBasic: false,
      editedLevels: false,
      editedItems: false,
    };
  },
  components: {
    "app-statistical-classification-basic": StatisticalClassificationBasic,
    "app-statistical-classificaition-levels": StatisticalClassificationLevels,
    "app-statistical-classificaition-items": StatisticalClassificationItems,
  },
  methods: {
    handleUpdateBasic(basic, fieldsChanged) {
      if (fieldsChanged) {
        const formData = {
          id: this.statisticalClassification.id,
          localId: basic.localId,
          name: basic.name,
          vesion: basic.version,
          description: basic.description,
          definition: basic.definition,
          link: basic.link,
        };
        this.$store
          .dispatch("statisticalClassification/update", formData)
          .then(() => {
            this.editedBasic = true;
            this.next();
          });
      } else {
        //do nothing
        this.next();
      }
    },
    handleAddLevel(level) {
      const formData = {
        statisticalClassificationId: this.statisticalClassification.id,
        localId: level.localId,
        name: level.name,
        description: level.description,
        levelNumber: level.levelNumber,
      };
      this.$store
        .dispatch("statisticalClassification/addLevel", formData)
        .then((data) => {
          console.log(data);
          this.$store.dispatch(
            "statisticalClassification/findById",
            data.value
          );
        });
    },
    handleUploadItems(uploadedItems) {
      const formData = {
        statisticalClassificationId: this.statisticalClassification.id,
        rootItems: uploadedItems.rootItems,
        aggregationType: uploadedItems.aggregationType,
      };
      this.$store
        .dispatch("statisticalClassification/uploadItems", formData)
        .then((data) => {
          this.$store.dispatch(
            "statisticalClassification/findById",
            data.value
          );
        });
    },
    nextLevels(fieldChanged) {
      this.editedLevels = fieldChanged;
      this.next();
    },
    nextItems(fieldChanged) {
      this.editedItems = fieldChanged;
      this.next();
    },
    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
    finish() {
      this.$router.push("/metadata/structural/classifications/");
    },
  },
  computed: {
    ...mapGetters("statisticalClassification", ["statisticalClassification"]),
  },

  created() {
    this.$store.dispatch(
      "statisticalClassification/findById",
      this.$route.params.id
    );
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
