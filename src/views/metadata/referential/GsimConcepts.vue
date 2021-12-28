<template>
  <CRow>
    <CCol class="col-sm-6 col-md-4">
      <CCard class="mb-3">
        <CCardBody>
          <CCardTitle> Business Functions </CCardTitle>

          <CCardText>
            Something an enterprise does, or needs to do, in order to achieve
            its objectives.
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'BusinessFunctionList' }"
              class="text-decoration-none text-primary"
            >
              <span class="icon-span">Go to business functions section</span>
              <chevron-right-icon />
            </router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol class="col-sm-6 col-md-4">
      <CCard class="mb-3">
        <CCardBody>
          <CCardTitle> Agents </CCardTitle>
          <CCardText>
            An Agent is someone or something that bears some form of
            responsibility for a
            <i>Business Process</i> taking place, for the existence of an
            entity, or for another agent <i>Business Process</i>.
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'AgentList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">Go to agents section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol class="col-sm-6 col-md-4">
      <CCard class="mb-3">
        <CCardBody>
          <CCardTitle> Process methods </CCardTitle>
          <CCardText>
            A specification of the technique which will be used to perform the
            work. This section contains the list of process method.
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'ProcessMethodList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span">Go to process method section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol class="col-sm-6 col-md-4">
      <CCard class="mb-3">
        <CCardBody>
          <CCardTitle> Legislative references </CCardTitle>
          <CCardText>
            This section contains the list of regulations.
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'LegislativeReferenceList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span"
                >Go to legislative reference section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol class="col-sm-6 col-md-4">
      <CCard class="mb-3">
        <CCardBody>
          <CCardTitle> Statistical standard </CCardTitle>
          <CCardText>
            This section contains the list of statistical standards.
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'StatisticalStandardList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span"
                >Go to statistical standard section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

    <CCol class="col-sm-6 col-md-4">
      <CCard class="mb-3">
        <CCardBody>
          <CCardTitle> Business service </CCardTitle>
          <CCardText>
            This section contains the list of business services (Software).
          </CCardText>
          <CButton>
            <router-link
              tag="a"
              :to="{ name: 'BusinessServiceList' }"
              class="text-decoration-none text-primary"
              ><span class="icon-span"
                >Go to business service section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
