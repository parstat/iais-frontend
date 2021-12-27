<template>
  <div class="row">
      <div class="col-sm-6 col-md-4">
          <div class="card">
              <header class="card-header">
                  <span>GSBPM documentation tool</span>
                  <span class="badge float-right badge-dark p-2">New</span>
              </header>
              <div class="card-body">
                  <span>Description of statistical processes</span>
                    <footer class="card-footer">
                        <p class="section-link" style="float: right;">
                            <router-link tag="a" :to="{name: 'StatisticalProgramList'}">
                                <span class="icon-span">Go to statistical program section</span>
                                <chevron-right-icon/>
                            </router-link>
                        </p>
                    </footer>
              </div>
          </div>
      </div>
      
      <div class="col-sm-6 col-md-4">
          <div class="card">
              <header class="card-header">
                  <span>Quality Reports</span>
                  <span class="badge float-right badge-dark p-2">New</span>
              </header>
              <div class="card-body">
                  <span>Description of Quality Reports</span>
                    
              </div>
          </div>
      </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import { Context } from "@/common";
export default {
  components: {  },
  name: "ReferentialComponents",
  created() {
    this.$store.dispatch("coreui/setContext", Context.Referential);
  }
};
</script>
