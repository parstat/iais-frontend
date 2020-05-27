<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Referential metadata</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the list of processes documented according to
          GSBPM standard
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'StatisticalProgramList' }"
              ><span class="icon-span">Go to referential metadata section </span
              ><chevron-right-icon
            /></router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">Structural metadata</header>
        <div class="card-body">
          This section contains the structural metadata of each survey
          documented in the system.
          <br />
          <p class="section-link disabled">
            <span>Go to structural metadata section &nbsp;</span>
            <CIcon name="cilArrowCircleRight"></CIcon>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">Process metadata</header>
        <div class="card-body">
          This section contains the process metadata of each survey documented
          in the system.
          <p class="section-link disabled">
            Go to process metadata section
            <CIcon name="cilArrowCircleRight"></CIcon>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Metadata"
};
</script>
<style scoped>
.section-link {
  margin-top: 15px;
}

.section-link a {
  padding-right: 0.3rem;
  padding-top: 3px;
}
.disabled {
  color: #ced2d8;
}
</style>
