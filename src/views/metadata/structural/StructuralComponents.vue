<template>
  <div class="row">
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Variables</span>
          <span class="badge float-right badge-success p-2">read</span>
        </header>
        <div class="card-body">
          <!--
          <CProgress
            animated
            color="warning"
            height="0.7rem"
            :value="65"
          /><br />
          -->
          <span>
            The use of a <i>Concept</i> as a characteristic of a
            <i>Population</i> intended to be measured. The
            <i>Variable</i> combines the meaning of a <i>Concept</i> with a
            <i>Unit Type</i>, to define the characteristic that is to be
            measured.<br /><br />
          </span>

          <footer class="card-footer">
            <p class="section-link" style="float:right;">
              <router-link tag="a" :to="{ name: 'StructuralVariableList' }"
                ><span class="icon-span">Go to variables section &nbsp;</span
                ><chevron-right-icon
              /></router-link>
            </p>
          </footer>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Statistical Clasifications</span>
          <span class="badge float-right badge-success p-2">read</span>
        </header>
        <div class="card-body">
          <!--
          <CProgress animated color="success" height="0.7rem" :value="20" />
          <br />
          -->
          <span>
            A <i>Statistical Classification</i> is a set of
            <i>Categories</i> which may be assigned to one or more variables
            registered in statistical surveys or administrative files, and used
            in the production and dissemination of statistics. In a standard
            <i>Statistical Classification</i>, the <i>Categories</i> at each
            <i>Level</i> of the classification structure must be mutually
            exclusive and jointly exhaustive of all objects/units in the
            population of interest.<br /><br />
          </span>

          <footer class="card-footer">
            <p class="section-link" style="float:right;">
              <router-link
                tag="a"
                :to="{ name: 'StructuralStatisticalClassificationsList' }"
                ><span class="icon-span"
                  >Go to structural clasifications section &nbsp;</span
                ><chevron-right-icon
              /></router-link>
            </p>
          </footer>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Code List</span>
          <span class="badge float-right badge-success p-2">read</span>
        </header>
        <div class="card-body">
          <!--
          <CProgress
            animated
            color="success"
            height="0.7rem"
            :value="38"
          /><br />
          -->
          <span>
            A list of <i>Categories</i> where each <i>Category</i> has a
            predefined <i>Code</i> assigned to it.<br /><br />
          </span>

          <footer class="card-footer">
            <p class="section-link" style="float:right;">
              <router-link tag="a" :to="{ name: 'StructuralCodeList' }"
                ><span class="icon-span">Go to code list section &nbsp;</span
                ><chevron-right-icon
              /></router-link>
            </p>
          </footer>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Correspondence Table</span>
          <span class="badge float-right badge-success p-2">read</span>
        </header>
        <div class="card-body">
          <span>
            <strong>Correspondence Table Description:</strong>A Correspondence
            Table expresses the relationship between two Statistical
            Classifications. These are typically: two versions from the same
            Classification Series; Statistical Classifications from different
            Classification Series; a variant and the version on which it is
            based; or, different versions of a variant. In the first and last
            examples, the Correspondence Table facilitates comparability over
            time. Correspondence relationships are shown in both directions.<br /><br />
          </span>
          <footer class="card-footer">
            <p class="section-link" style="float:right;">
              <router-link tag="a" :to="{ name: 'CorrespondenceTableList' }">
                <span class="icon-span"
                  >Go to corespondence table section &nbsp;</span
                ><chevron-right-icon
              /></router-link>
            </p>
          </footer>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Data Sets</span>
        </header>
        <div class="card-body">
          <span>
            <strong>Data Sets Description:</strong> A collection of data that
            conforms to a known structure and describes aspects of one or more
            Units.
          </span>
          <p class="section-link section-link-disabled">
            <!--<router-link tag="a" :to="{ name: 'BusinessFunctionList' }"> -->
            <span class="icon-span">Go to data sets section &nbsp;</span>
            <chevron-right-icon />
            <!--</router-link>-->
          </p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4">
      <div class="card">
        <header class="card-header">
          <span>Unit Types</span>
        </header>
        <div class="card-body">
          <span>
            <strong>Unit Types Description:</strong> A Unit Type is a class of
            objects of interest. A Unit Type is used to describe a class or
            group of Units based on a single characteristic, but with no
            specification of time and geography. For example, the Unit Type of
            “Person” groups together a set of Units based on the characteristic
            that they are <b>Persons</b>.
          </span>
          <p class="section-link">
            <router-link tag="a" :to="{ name: 'UnitTypeList' }">
              <span class="icon-span">Go to unit types section &nbsp;</span>
              <chevron-right-icon />
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <!--
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
    -->
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import { Context } from "@/common";
export default {
  name: "StructuralComponents",
  created() {
    this.$store.dispatch("coreui/setContext", Context.Structural);
  }
};
</script>
