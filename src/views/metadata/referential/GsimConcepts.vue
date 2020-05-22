/* eslint-disable prettier/prettier */
<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <CIcon name="cilPuzzle"></CIcon>
          <span>Business Functions</span>
        </header>
        <div class="card-body">
          <span>
            Something an enterprise does, or needs to do, in order to achieve
            its objectives.
          </span>
          <p class="section-link disabled">
            <span>Go to business functions section &nbsp;</span>
            <CIcon name="cilArrowCircleRight"></CIcon>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <CIcon name="cilPuzzle"></CIcon>
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
              >Go to agents section</router-link
            >
            <CIcon class="icon-link" name="cilArrowCircleRight"></CIcon>
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <CIcon name="cilPuzzle"></CIcon>
          <span>Legislative references</span>
        </header>
        <div class="card-body">
          This section contains the list of regulations.
          <p class="section-link disabled">
            <span>Go to legislative reference section &nbsp;</span>
            <CIcon name="cilArrowCircleRight"></CIcon>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header .c-icon {
  padding-right: 0.3rem;
}
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
