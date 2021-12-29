<template>
  <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle> Variables </CCardTitle>
          <CCardText>
            <span>
              The use of a <i>Concept</i> as a characteristic of a
              <i>Population</i> intended to be measured. The
              <i>Variable</i> combines the meaning of a <i>Concept</i> with a
              <i>Unit Type</i>, to define the characteristic that is to be
              measured.<br /><br />
            </span>
          </CCardText>
          <CButton>
            <span>
              <router-link
                tag="a"
                class="text-decoration-none text-primary"
                :to="{ name: 'StructuralVariableList' }"
                ><span class="icon-span">Go to variables section &nbsp;</span
                ><CIcon name="cil-arrow-right"
              /></router-link>
            </span>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Statistical Clasifications</span>
          </CCardTitle>
          <CCardText>
            <!--
          <CProgress animated color="success" height="0.7rem" :value="20" />
          <br />
          -->
            <span>
              A <i>Statistical Classification</i> is a set of
              <i>Categories</i> which may be assigned to one or more variables
              registered in statistical surveys or administrative files, and
              used in the production and dissemination of statistics. In a
              standard <i>Statistical Classification</i>, the
              <i>Categories</i> at each <i>Level</i> of the classification
              structure must be mutually exclusive and jointly exhaustive of all
              objects/units in the population of interest.<br /><br />
            </span>
          </CCardText>
          <CButton>
            <router-link
              class="text-decoration-none text-primary"
              tag="a"
              :to="{ name: 'StructuralStatisticalClassificationsList' }"
              ><span class="icon-span"
                >Go to structural clasifications section &nbsp;</span
              ><CIcon name="cil-arrow-right"
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Code List</span>
          </CCardTitle>
          <CCardText>
            <span>
              A list of <i>Categories</i> where each <i>Category</i> has a
              predefined <i>Code</i> assigned to it.<br /><br />
            </span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'StructuralCodeList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">Go to code list section &nbsp;</span
              ><CIcon name="cil-arrow-right"
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Correspondence Table</span>
          </CCardTitle>
          <CCardText>
            <span>
              A <i>Correspondence Table</i> expresses the relationship between
              two Statistical Classifications. These are typically: two versions
              from the same Classification Series; Statistical Classifications
              from different Classification Series; a variant and the version on
              which it is based; or, different versions of a variant. In the
              first and last examples, the Correspondence Table facilitates
              comparability over time. Correspondence relationships are shown in
              both directions.<br /><br />
            </span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'CorrespondenceTableList' }"
              class="text-decoration-none text-primary"
            >
              <span class="icon-span"
                >Go to corespondence table section &nbsp;</span
              ><CIcon name="cil-arrow-right"
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Data Sets</span>
          </CCardTitle>
          <CCardText>
            <span>
              A collection of data that conforms to a known structure and
              describes aspects of one or more Units.
            </span>
          </CCardText>
          <CButton disabled>
            <!--<router-link tag="a" :to="{ name: 'BusinessFunctionList' }"> -->
            <span class="icon-span">Go to data sets section &nbsp;</span>
            <CIcon name="cil-arrow-right" />
            <!--</router-link>-->
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Unit Types</span>
          </CCardTitle>
          <CCardText>
            <span>
              A <i>Unit Type</i> is a class of objects of interest. A Unit Type
              is used to describe a class or group of Units based on a single
              characteristic, but with no specification of time and geography.
              For example, the Unit Type of “Person” groups together a set of
              Units based on the characteristic that they are <b>Persons</b>.
            </span>
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'UnitTypeList' }"
              class="text-decoration-none text-primary"
            >
              <span class="icon-span">Go to unit types section &nbsp;</span>
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
export default {
  name: "StructuralComponents",
  created() {
    this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
