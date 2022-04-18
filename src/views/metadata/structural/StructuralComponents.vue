<template>
  <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }" :lg="{ cols: 3 }">
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.variables_title") }}</span>
          </CCardTitle>
          <CCardText>
            <span>{{ $t("structural.variables_text") }}</span>
          </CCardText>
          <CButton>
            <span>
              <router-link
                tag="a"
                class="text-decoration-none text-primary"
                :to="{ name: 'StructuralVariableList' }"
                ><span class="icon-span">
                  {{ $t("structural.variables_link") }}&nbsp;
                </span>
                <CIcon name="cil-arrow-right" />
              </router-link>
            </span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.concepts_title") }}</span>
          </CCardTitle>
          <CCardText>
            <span>{{ $t("structural.concepts_text") }}</span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'ConceptList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("structural.concepts_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.statistical_classification_title") }}</span>
          </CCardTitle>
          <CCardText>
            <!--
          <CProgress animated color="success" height="0.7rem" :value="20" />
          <br />
          -->
            <span>{{ $t("structural.statistical_classification_text") }}</span>
          </CCardText>
          <CButton>
            <router-link
              class="text-decoration-none text-primary"
              tag="a"
              :to="{ name: 'StructuralStatisticalClassificationsList' }"
              ><span class="icon-span">
                {{ $t("structural.statistical_classification_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.code_list_title") }}</span>
          </CCardTitle>
          <CCardText>
            <span>{{ $t("structural.code_list_text") }}</span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'StructuralCodeList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("structural.code_list_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.correspondance_table_title") }}</span>
          </CCardTitle>
          <CCardText>
            <span>{{ $t("structural.correspondance_table_text") }}</span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'CorrespondenceTableList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("structural.correspondance_table_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.data_sets_title") }}</span>
          </CCardTitle>
          <CCardText>
            <span>{{ $t("structural.data_sets_text") }}</span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'UnitDataSetList' }"
              class="text-decoration-none text-primary"
            >
              <span class="icon-span">
                {{ $t("structural.data_sets_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs v-if="isAuthenticated">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.measurementUnit_title") }}</span>
          </CCardTitle>
          <CCardText>
            <span>{{ $t("structural.measurementUnit_text") }}</span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'MeasurementUnitList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("structural.measurementUnit_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs v-if="isAuthenticated">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.measurementType_title") }}</span>
          </CCardTitle>
          <CCardText>
            <span>{{ $t("structural.measurementType_text") }}</span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'MeasurementTypeList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("structural.measurementType_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard v-if="isAuthenticated">
        <CCardBody>
          <CCardTitle>
            <span>{{ $t("structural.unit_types_title") }}</span>
          </CCardTitle>
          <CCardText>
            <span>{{ $t("structural.unit_types_text") }}</span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'UnitTypeList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("structural.unit_types_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

    <!--
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Business service</span>
        </header>
        <div class="card-body">
          This section contains the list of business services (Software).
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'BusinessServiceList' }"
              ><span class="icon-span"
                >Go to business service section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </p>
        </div>
      </div>
    </div>
    -->
  </CRow>
</template>

<script>
//import { mapGetters } from "vuex";
import { Context } from "@/common";
import { mapGetters } from "vuex";

export default {
  name: "StructuralComponents",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
  },
  created() {
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
