<template>
  <div class="row" v-if="statisticalProcess">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Statistical process</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Survey name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="statisticalProcess.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="acronym">Survey acronym</label>
            <input
              id="acronym"
              type="text"
              class="form-control"
              v-model.trim="statisticalProcess.acronym"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Responsible name</label>
            <input
              id="responsibleName"
              type="text"
              class="form-control"
              v-model.trim="statisticalProcess.responsibleName"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Responsible division</label>
            <input
              id="responsibleDivision"
              type="text"
              class="form-control"
              v-model.trim="statisticalProcess.responsibleDivision"
              disabled
            />
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            >Delete</CButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters(["statisticalProcess"])
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("deleteStatisticalProcess", this.statisticalProcess);
    }
  },
  created() {
    this.$store.dispatch("getStatisticalProcessById", this.$route.params.id);
  }
};
</script>
<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: #ebedef;
  opacity: 1;
}
</style>
