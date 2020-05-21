<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Statistical process</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="localId">Survey id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.localId.$error }"
              placeholder="Survey id"
              v-model.trim="localId"
            />
            <span class="help-block" :class="{ show: $v.localId.$error }"
              >Please enter survey id.</span
            >
          </div>
          <div class="form-group">
            <label for="name">Survey name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.name.$error }"
              placeholder="Survey name"
              v-model.trim="name"
            />
            <span class="help-block" :class="{ show: $v.name.$error }"
              >Please enter survey name.</span
            >
          </div>
          <div class="form-group">
            <label for="acronym">Survey acronym</label>
            <input
              id="acronym"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.acronym.$error }"
              placeholder="Survey acronym"
              v-model.trim="acronym"
            />
            <span class="help-block" :class="{ show: $v.acronym.$error }"
              >Please enter an acronym.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Survey description</label>
            <input
              id="description"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.description.$error }"
              placeholder="Survey description"
              v-model.trim="description"
            />
            <span class="help-block" :class="{ show: $v.description.$error }"
              >Please enter survey description.</span
            >
          </div>
          <div class="form-group" v-if="owners">
            <label for="description">Organization</label>
            <v-select label="name" :options="owners" v-model="owner"></v-select>
            <span class="help-block" :class="{ show: $v.owner.$error }"
              >Please select an Organization.</span
            >
          </div>
          <div class="form-group" v-if="maintainers">
            <label for="description">Division</label>
            <v-select
              label="name"
              :options="maintainers"
              v-model="maintainer"
            ></v-select>
            <span class="help-block" :class="{ show: $v.maintainer.$error }"
              >Please select a division.</span
            >
          </div>
          <div class="form-group" v-if="contacts">
            <label for="description">Contact person</label>
            <v-select
              label="name"
              :options="contacts"
              v-model="contact"
            ></v-select>
            <span class="help-block" :class="{ show: $v.contact.$error }"
              >Please select a contact person.</span
            >
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
import { Agent } from "@/common";

export default {
  data() {
    return {
      localId: "",
      name: "",
      acronym: "",
      description: "",
      owner: "",
      maintainer: "",
      contact: "",
      disabled: false
    };
  },
  computed: {
    ...mapGetters("agent", ["owners", "maintainers", "contacts"])
  },
  validations: {
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
    },
    owner: {
      required
    },
    maintainer: {
      required
    },
    contact: {
      required
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          localId: this.localId,
          name: this.name,
          acronym: this.acronym,
          description: this.description,
          owner: this.owner.id,
          maintainer: this.maintainer.id,
          contact: this.contact.id
        };
        this.$store.dispatch("statisticalProgram/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.localId = "";
      this.name = "";
      this.acronym = "";
      this.description = "";
      this.owner = "";
      this.maintainer = "";
      this.contact = "";
      this.$v.$reset();
    }
  },
  created() {
    this.$store.dispatch("agent/findByType", Agent.Organization);
    this.$store.dispatch("agent/findByType", Agent.Division);
    this.$store.dispatch("agent/findByType", Agent.Individual);
  }
};
</script>

<style scoped>
.vs__selected-options {
  padding: 0 2px 6px 2px;
}
</style>
