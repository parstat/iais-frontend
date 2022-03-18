<template>
  <div class="row" v-if="statisticalProgram">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <CIcon name="cil-trash" />
          <span>
            <strong class="icon-header">{{
              $t("referential.statistical_process")
            }}</strong>
          </span>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">
              <span>{{ $t("referential.survey_ID") }}</span>
            </label>
            <input
              id="localId"
              type="text"
              class="form-control"
              v-model.trim="statisticalProgram.localId"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="name">
              <span>{{ $t("referential.survey_name") }}</span>
            </label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model.trim="statisticalProgram.name"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="acronym">
              <span>{{ $t("referential.survey_acronym") }}</span>
            </label>
            <input
              id="acronym"
              type="text"
              class="form-control"
              v-model.trim="statisticalProgram.acronym"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="responsible">
              <span>{{ $t("referential.survey_description") }}</span>
            </label>
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
            ><span>{{ $t("referential.delete") }}</span></CButton
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
