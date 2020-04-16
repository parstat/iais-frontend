<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card ">
        <header class="card-header">
          Referential metadata
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the list of processes documented according to
          GSBPM standard
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'StatisticalProcessList' }"
              >Go to referential metadata section</router-link
            ><CIcon name="cilArrowCircleRight"></CIcon>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          Structural metadata
        </header>
        <div class="card-body">
          This section contains the structural metadata of each survey
          documented in the system.
          <br />
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'Structural' }"
              >Go to structural metadata section</router-link
            ><CIcon name="cilArrowCircleRight"></CIcon>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          Process metadata
        </header>
        <div class="card-body">
          This section contains the process metadata of each survey documented
          in the system.
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'Process' }"
              >Go to process metadata section</router-link
            ><CIcon name="cilArrowCircleRight"></CIcon>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
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
</style>
