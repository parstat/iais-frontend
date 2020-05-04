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
              :class="{ 'is-invalid': $v.statisticalProcess.name.$error }"
              placeholder="Survey name"
              v-model.trim="statisticalProcess.name"
            />
            <span
              class="help-block"
              :class="{ show: $v.statisticalProcess.name.$error }"
            >
              Please enter survey name.
            </span>
          </div>
          <div class="form-group">
            <label for="acronym">Survey acronym</label>
            <input
              id="acronym"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.statisticalProcess.acronym.$error }"
              placeholder="Survey acronym"
              v-model.trim="statisticalProcess.acronym"
            />
            <span
              class="help-block"
              :class="{ show: $v.statisticalProcess.acronym.$error }"
            >
              Please enter an acronym.
            </span>
          </div>
          <div class="form-group">
            <label for="responsible">Responsible name</label>
            <input
              id="responsibleName"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': $v.statisticalProcess.responsibleName.$error
              }"
              placeholder="Survey responsible"
              v-model.trim="statisticalProcess.responsibleName"
            />
            <span
              class="help-block"
              :class="{ show: $v.statisticalProcess.responsibleName.$error }"
            >
              Please enter responsible name.
            </span>
          </div>
          <div class="form-group">
            <label for="responsible">Responsible division</label>
            <input
              id="responsibleDivision"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': $v.statisticalProcess.responsibleDivision.$error
              }"
              placeholder="Responsible division"
              v-model.trim="statisticalProcess.responsibleDivision"
            />
            <span
              class="help-block"
              :class="{
                show: $v.statisticalProcess.responsibleDivision.$error
              }"
            >
              Please enter responsible division.
            </span>
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
            size="sm"
            style="margin-right:0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Save</CButton
          >
          <CButton
            color="danger"
            shape="square"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            >Reset</CButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters(["statisticalProcess"])
  },
  validations: {
    statisticalProcess: {
      name: {
        required
      },
      acronym: {
        required
      },
      responsibleName: {
        required
      },
      responsibleDivision: {
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
          id: this.statisticalProcess.id,
          name: this.statisticalProcess.name,
          acronym: this.statisticalProcess.acronym,
          responsibleName: this.statisticalProcess.responsibleName,
          responsibleDivision: this.statisticalProcess.responsibleDivision
        };
        this.$store.dispatch("updateStatisticalProcess", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.statisticalProcess.name = "";
      this.statisticalProcess.acronym = "";
      this.statisticalProcess.responsibleName = "";
      this.statisticalProcess.responsibleDivision = "";
      this.$v.$reset();
    }
  },
  created() {
    this.$store.dispatch("getStatisticalProcessById", this.$route.params.id);
  }
};
</script>
<style></style>
