<template>
  <CCard>
    <CCardBody>
      <CCardText v-if="correspondence">
        <CForm>
          <label>
            <span>{{ $t("structural.correspondence_table_source") }}</span>
          </label>
          <input
            class="mb-3 form-control"
            :value="
              correspondence.source.name +
              ' | version: ' +
              correspondence.source.version
            "
            :disabled="true"
          />
        </CForm>
        <CForm>
          <label>
            <span>{{ $t("structural.correspondence_table_target") }}</span>
          </label>
          <input
            class="mb-3 form-control"
            :value="
              correspondence.target.name +
              ' | version: ' +
              correspondence.target.version
            "
            :disabled="true"
          />
        </CForm>
        <CForm>
          <label>
            <span>{{
              $t("structural.correspondence_table_relationship")
            }}</span>
          </label>
          <input
            class="form-control"
            v-model="correspondence.relationship"
            :disabled="true"
          />
        </CForm>
      </CCardText>
      <CButton
        color="primary"
        size="sm"
        style="margin-right: 0.3rem"
        @click.prevent="deleteCorrespondence"
        :disabled="disabled"
        ><span>{{ $t("referential.delete") }}</span>
      </CButton>
    </CCardBody>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CorrespondenceTableDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("correspondence", ["correspondence"]),
  },
  methods: {
    deleteCorrespondence() {
      this.disabled = true; //disable button
      this.$store.dispatch("correspondence/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("correspondence/findById", this.$route.params.id);
  },
};
</script>
<style scoped>
.default-value {
  color: lightgray;
}

.jumbotron {
  border: 1px solid #ced2d8;
  box-shadow: 0 1px 1px 0 rgba(60, 75, 100, 0.14),
    0 2px 1px -1px rgba(60, 75, 100, 0.12), 0 1px 3px 0 rgba(60, 75, 100, 0.2);
}
@media (min-width: 576px) {
  .jumbotron {
    padding: 1.5rem 2rem;
  }
}
</style>
