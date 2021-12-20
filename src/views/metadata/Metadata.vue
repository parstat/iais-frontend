<template>
  <CCardGroup>
    <CCard>
      <CCardHeader component="h5"> Referential metadata </CCardHeader>
      <CCardBody>
        <CCardText>
          This section contains the list of processes documented according to
          GSBPM standard
        </CCardText>
        <CCardLink>
          <span>
            <router-link tag="a" :to="{ name: 'StatisticalProgramList' }"
              ><span class="icon-span">Go to referential metadata section </span
              ><CIcon name="cil-arrow-right" /></router-link>
          </span>
        </CCardLink>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader component="h5">Structural metadata</CCardHeader>
      <CCardBody>
        <CCardText>
          This section contains the structural metadata of each survey
          documented in the system.
        </CCardText>
        <CCardLink>
          <router-link tag="a" :to="{ name: 'StructuralComponents' }"
            ><span class="icon-span">Go to structural metadata section </span
            ><CIcon name="cil-arrow-right" /></router-link>
        </CCardLink>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader component="h5">Process metadata</CCardHeader>
      <CCardBody>
        <CCardText>
          This section contains the process metadata of each survey documented
          in the system.
        </CCardText>
        <CCardLink disabled>
          <span class="icon-span">Go to process metadata section</span>
          <CIcon name="cil-arrow-right" />
        </CCardLink>
      </CCardBody>
    </CCard>
  </CCardGroup>
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
