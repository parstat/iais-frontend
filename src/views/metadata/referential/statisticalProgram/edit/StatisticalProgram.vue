<template>
  <div class="card">
    <div class="card-header">
      <text-icon />
      <strong class="icon-header">Statistical process</strong>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label for="localId">Survey Id*</label>
        <input
          id="localId"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': $v.statisticalProgram.localId.$error
          }"
          placeholder="Identifier"
          v-model.trim="statisticalProgram.localId"
        />
        <span
          class="help-block"
          :class="{ show: $v.statisticalProgram.localId.$error }"
          >Please enter survey id.</span
        >
      </div>
      <div class="form-group">
        <label for="name">Survey name*</label>
        <input
          id="name"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': $v.statisticalProgram.name.$error
          }"
          placeholder="Survey name"
          v-model.trim="statisticalProgram.name"
        />
        <span
          class="help-block"
          :class="{ show: $v.statisticalProgram.name.$error }"
          >Please enter survey name.</span
        >
      </div>
      <div class="form-group">
        <label for="acronym">Survey acronym*</label>
        <input
          id="acronym"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': $v.statisticalProgram.acronym.$error
          }"
          placeholder="Survey acronym"
          v-model.trim="statisticalProgram.acronym"
        />
        <span
          class="help-block"
          :class="{ show: $v.statisticalProgram.acronym.$error }"
          >Please enter an acronym.</span
        >
      </div>
      <div class="form-group">
        <label for="description">Survey description*</label>
        <textarea
          rows="5"
          id="description"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': $v.statisticalProgram.description.$error
          }"
          placeholder="Survey description"
          v-model.trim="statisticalProgram.description"
        />
        <span
          class="help-block"
          :class="{
            show: $v.statisticalProgram.description.$error
          }"
          >Please enter an description.</span
        >
      </div>
      <CButton
        color="primary"
        shape="square"
        size="sm"
        style="margin-right:0.3rem"
        @click.prevent="handleSubmit"
      >
        Next
      </CButton>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "StatisticalProgramEdit",
  data() {
    return {
      disabled: false,
      activeTab: 0
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"])
  },
  validations: {
    statisticalProgram: {
      localId: {
        required
      },
      name: {
        required
      },
      acronym: {
        required
      },
      description: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.statisticalProgram.id,
          localId: this.statisticalProgram.localId,
          name: this.statisticalProgram.name,
          acronym: this.statisticalProgram.acronym,
          description: this.statisticalProgram.description
        };
        //console.log(formData);
        this.$store.dispatch("statisticalProgram/update", formData).then(() => {
          this.$emit("next");
        });
      }
    }
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
    this.activeTab = this.$route.query.step ? this.$route.query.step - 1 : 0;
  }
};
</script>

<style scoped>
.card {
  padding-top: 0rem;
  scroll-padding-bottom: 0rem;
  box-shadow: none !important;
}
.card-header {
  padding-top: 0rem;
}
</style>
