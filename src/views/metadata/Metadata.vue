<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header"><span>Referential metadata</span>
          <span class="badge float-right badge-success">New</span>
        </header>
        <div class="card-body">
          This section contains the list of processes documented according to
          GSBPM standard
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'ReferentialComponents' }"
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
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'StructuralComponents' }"
              ><span class="icon-span">Go to structural metadata section </span
              ><chevron-right-icon
            /></router-link>
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
          <p class="section-link section-link-disabled">
            <span class="icon-span">Go to process metadata section</span>
            <chevron-right-icon />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Context } from "@/common";

export default {
  name: "Metadata",
  created() {
    this.$store.dispatch("coreui/setContext", Context.Home);
  }
};
</script>
