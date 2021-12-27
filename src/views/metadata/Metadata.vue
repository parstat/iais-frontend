<template>
  <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle> Referential metadata </CCardTitle>
          <CCardText>
            This section contains the list of processes documented according to
            GSBPM standard
          </CCardText>
          <CButton>
            <span>
              <router-link
                class="text-decoration-none text-primary"
                tag="a"
                :to="{ name: 'StatisticalProgramList' }"
                ><span class="icon-span"
                  >Go to referential metadata section </span
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
          <CCardTitle> Structural metadata </CCardTitle>
          <CCardText>
            This section contains the structural metadata of each survey
            documented in the system.
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              class="text-decoration-none text-primary"
              :to="{ name: 'StructuralComponents' }"
              ><span class="icon-span">Go to structural metadata section </span
              ><CIcon name="cil-arrow-right"
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardBody>
          <CCardTitle> Process metadata </CCardTitle>
          <CCardText>
            This section contains the process metadata of each survey documented
            in the system.
          </CCardText>
          <CButton disabled>
            <span class="icon-span">Go to process metadata section</span>
            <CIcon name="cil-arrow-right" />
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { Context } from "@/common";

export default {
  name: "StatisticsMetadata",
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  },
};
</script>
