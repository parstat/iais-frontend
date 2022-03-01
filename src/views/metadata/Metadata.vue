<template>
  <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("common.referential_metadata_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("common.referential_metadata_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <span>
              <router-link
                class="text-decoration-none text-primary"
                tag="a"
                :to="{ name: 'StatisticalProgramList' }"
                ><span class="icon-span">{{ $t("common.referential_metadata_link") }}&nbsp;</span
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
          <span>{{ $t("common.structural_metadata_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("common.structural_metadata_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <router-link
              tag="a"
              class="text-decoration-none text-primary"
              :to="{ name: 'StructuralComponents' }"
              ><span class="icon-span">{{ $t("common.structural_metadata_link") }}&nbsp;</span
              ><CIcon name="cil-arrow-right"
            /></router-link>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("common.process_metadata_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("common.process_metadata_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton disabled>
            <span class="icon-span">{{ $t("common.process_metadata_link") }}&nbsp;</span
            ><CIcon name="cil-arrow-right" />
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
