<template>
  <div class="row" v-if="statisticalProgram">
    <div class="col-sm-12 col-md-6">
      <div class="card ">
        <header class="card-header">
          <strong>Statistical process</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="localId">Local Id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.statisticalProgram.localId.$error }"
              placeholder="Identifier"
              v-model.trim="statisticalProgram.localId"
            />
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.localId.$error }"
            >
              Please enter survey id.
            </span>
          </div>
          <div class="form-group">
            <label for="name">Survey name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.statisticalProgram.name.$error }"
              placeholder="Survey name"
              v-model.trim="statisticalProgram.name"
            />
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.name.$error }"
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
              :class="{ 'is-invalid': $v.statisticalProgram.acronym.$error }"
              placeholder="Survey acronym"
              v-model.trim="statisticalProgram.acronym"
            />
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.acronym.$error }"
            >
              Please enter an acronym.
            </span>
          </div>
          <div class="form-group">
            <label for="description">Survey description</label>
            <input
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
              :class="{ show: $v.statisticalProgram.description.$error }"
            >
              Please enter an description.
            </span>
          </div>
          <div class="form-group" v-if="owners">
            <label for="description">Organization</label>
            <v-select
              label="name"
              :options="owners"
              v-model="statisticalProgram.owner"
            ></v-select>
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.owner.$error }"
              >Please select an Organization.</span
            >
          </div>
          <div class="form-group" v-if="maintainers">
            <label for="description">Division</label>
            <v-select
              label="name"
              :options="maintainers"
              v-model="statisticalProgram.maintainer"
            ></v-select>
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.maintainer.$error }"
              >Please select a division.</span
            >
          </div>
          <div class="form-group" v-if="contacts">
            <label for="description">Contact person</label>
            <v-select
              label="name"
              :options="contacts"
              v-model="statisticalProgram.contact"
            ></v-select>
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.contact.$error }"
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
            >Update</CButton
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
  name: "AgentEdit",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("agent", ["owners", "maintainers", "contacts"])
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
          description: this.statisticalProgram.description,
          owner: this.statisticalProgram.owner.id,
          maintainer: this.statisticalProgram.maintainer.id,
          contact: this.statisticalProgram.contact.id
        };
        this.$store.dispatch("statisticalProgram/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.statisticalProgram.name = "";
      this.statisticalProgram.acronym = "";
      this.statisticalProgram.description = "";
      this.$v.$reset();
    }
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
    this.$store.dispatch("agent/findByType", Agent.Organization);
    this.$store.dispatch("agent/findByType", Agent.Division);
    this.$store.dispatch("agent/findByType", Agent.Individual);
  }
};
</script>
