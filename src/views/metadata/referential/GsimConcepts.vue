<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Business Functions</span>
        </header>
        <div class="card-body">
          <span>
            Something an enterprise does, or needs to do, in order to achieve
            its objectives.
          </span>
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'BusinessFunctionList' }">
              <span class="icon-span">Go to business functions section</span>
              <chevron-right-icon />
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Agents</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          <span>
            An Agent is someone or something that bears some form of
            responsibility for a
            <i>Business Process</i> taking place, for the existence of an
            entity, or for another agent <i>Business Process</i>.
          </span>
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'AgentList' }"
              ><span class="icon-span">Go to agents section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </p>
        </div>
      </div>
    </div>

     <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Process methods</span>
        </header>
        <div class="card-body">
          A specification of the technique which will be used to perform the work.
          This section contains the list of process method.
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'ProcessMethodList' }"
              ><span class="icon-span"
                >Go to process method section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Legislative references</span>
        </header>
        <div class="card-body">
          This section contains the list of regulations.
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'LegislativeReferenceList' }"
              ><span class="icon-span"
                >Go to legislative reference section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Statistical standard</span>
        </header>
        <div class="card-body">
          This section contains the list of statistical standards.
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'StatisticalStandardList' }"
              ><span class="icon-span"
                >Go to statistical standard section&nbsp;</span
              ><chevron-right-icon
            /></router-link>
          </p>
        </div>
      </div>
    </div>

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
  </div>
</template>
