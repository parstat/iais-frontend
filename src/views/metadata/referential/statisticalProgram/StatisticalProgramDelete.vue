<template>
  <div class="row" v-if="statisticalProgram">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
           <CIcon name="cil-trash" />
          <strong class="icon-header">Statistical process</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Survey id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              v-model.trim="statisticalProgram.localId"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="name">Survey name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="statisticalProgram.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="acronym">Survey acronym</label>
            <input
              id="acronym"
              type="text"
              class="form-control"
              v-model.trim="statisticalProgram.acronym"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">Survey description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              v-model.trim="statisticalProgram.description"
              disabled
            />
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
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
  name: "StatisticalProgramDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("statisticalProgram/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
  },
};
</script>
