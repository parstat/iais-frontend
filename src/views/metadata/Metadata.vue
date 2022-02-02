<template>
  <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          {{ $t("common.referential_metadata") }}
        </CCardHeader>
        <CCardBody>
          <CCardText>
            This section contains the list of processes documented according to
            GSBPM standard
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
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
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          Structural metadata
        </CCardHeader>
        <CCardBody>
          <CCardText>
            This section contains the structural metadata of each survey
            documented in the system.
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <router-link
              tag="a"
              class="text-decoration-none text-primary"
              :to="{ name: 'StructuralComponents' }"
              ><span class="icon-span">Go to structural metadata section </span
              ><CIcon name="cil-arrow-right"
            /></router-link>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          Process metadata
        </CCardHeader>
        <CCardBody>
          <CCardText>
            This section contains the process metadata of each survey documented
            in the system.
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton disabled>
            <span class="icon-span">Go to process metadata section</span>
            <CIcon name="cil-arrow-right" />
          </CButton>
        </CCardFooter>
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
