<template>
  <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 2 }" :lg="{ cols: 3 }">
    <CCol>
      <CCard xs>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("referential.business_function_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("referential.business_function_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <span>
              <router-link
                tag="a"
                :to="{ name: 'BusinessFunctionList' }"
                class="text-decoration-none text-primary"
                ><span class="icon-span">
                  {{ $t("referential.business_function_link") }}&nbsp;
                </span>
                <CIcon name="cil-arrow-right" />
              </router-link>
            </span>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("referential.agents_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("referential.agents_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'AgentList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("referential.agents_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("referential.process_methods_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("referential.process_methods_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'ProcessMethodList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("referential.process_methods_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("referential.legislative_references_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("referential.legislative_references_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'LegislativeReferenceList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("referential.legislative_references_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("referential.statistical_standard_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("referential.statistical_standard_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'StatisticalStandardList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("referential.statistical_standard_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>

    <CCol xs>
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>{{ $t("referential.business_service_header") }}</span>
        </CCardHeader>
        <CCardBody>
          <CCardText>
            <span>{{ $t("referential.business_service_text") }}</span>
          </CCardText>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'BusinessServiceList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">
                {{ $t("referential.business_service_link") }}&nbsp;
              </span>
              <CIcon name="cil-arrow-right" />
            </router-link>
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>
