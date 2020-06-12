<template>
  <div class="row">
    <div class="col-12">
      <CTabs
        variant="pills"
        :vertical="{ navs: 'col-md-3', content: 'col-md-9' }"
        :active-tab="activeTab"
        @update:activeTab="updateStep"
      >
        <CTab title="Basic">
          <div class="card">
            <header class="card-header">
              <text-icon />
              <strong class="icon-header">Statistical process</strong>
            </header>
            <div class="card-body">
              <div class="form-group">
                <label for="localId">Survey id*</label>
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
                <label for="name">Survey name*</label>
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
                <label for="acronym">Survey acronym*</label>
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
                <label for="description">Survey description*</label>
                <textarea
                  rows="5"
                  id="description"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': $v.description.$error }"
                  placeholder="Survey description"
                  v-model.trim="description"
                />
                <span
                  class="help-block"
                  :class="{ show: $v.description.$error }"
                  >Please enter survey description.</span
                >
              </div>
              <div class="form-mandatory">*Mandatory fields</div>
            </div>
            <div class="card-footer"></div>
          </div>
          <CButton
            color="primary"
            shape="pill"
            size="sm"
            style="margin-right:0.3rem"
            @click="next"
            >Next
          </CButton>
        </CTab>

        <CTab title="Agent">
          <div class="card">
            <header class="card-header">
              <user-icon />
              <strong class="icon-header">Agents</strong>
              <div class="card-header-actions">
                <router-link
                  tag="a"
                  to="/metadata/referential/gsim/agent/add"
                  class="card-header-action"
                >
                  <add-icon />
                  <span class="icon-span">Add</span>
                </router-link>
              </div>
            </header>
            <div class="card-body">
              <div class="form-group" v-if="owners">
                <label for="description">Organization*</label>
                <v-select
                  label="name"
                  :options="owners"
                  v-model="owner"
                  :class="{ 'is-invalid': $v.owner.$error }"
                  placeholder="Select an organization"
                ></v-select>
                <span class="help-block" :class="{ show: $v.owner.$error }"
                  >Please select an Organization.</span
                >
              </div>
              <div class="form-group" v-if="maintainers">
                <label for="description">Division*</label>
                <v-select
                  label="name"
                  :options="maintainers"
                  v-model="maintainer"
                  :class="{ 'is-invalid': $v.maintainer.$error }"
                  placeholder="Select a division"
                ></v-select>
                <span class="help-block" :class="{ show: $v.maintainer.$error }"
                  >Please select a division.</span
                >
              </div>
              <div class="form-group" v-if="contacts">
                <label for="description">Contact person*</label>
                <v-select
                  label="name"
                  :options="contacts"
                  v-model="contact"
                  :class="{ 'is-invalid': $v.contact.$error }"
                  placeholder="Select a contact person"
                ></v-select>
                <span class="help-block" :class="{ show: $v.contact.$error }"
                  >Please select a contact person.</span
                >
              </div>
            </div>
            <div class="card-footer"></div>
          </div>
          <CButton
            color="primary"
            shape="pill"
            size="sm"
            style="margin-right:0.3rem"
            @click="back"
            :disabled="disabled"
            >Back</CButton
          >
          <CButton
            color="primary"
            shape="pill"
            size="sm"
            style="margin-right:0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Next</CButton
          >
        </CTab>
        <CTab title="Legislative References" disabled> </CTab>
        <CTab title="Statistical Standards" disabled> </CTab>
        <CTab title="Process Documentations" disabled> </CTab>
      </CTabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import { Agent } from "@/common";

export default {
  name: "StatisticalProgramAdd",
  data() {
    return {
      localId: "",
      name: "",
      acronym: "",
      description: "",
      owner: "",
      maintainer: "",
      contact: "",
      disabled: false,
      activeTab: 0
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
      this.legislativeReferences = [];
      this.$v.$reset();
    },
    next() {
      this.activeTab++;
    },
    back() {
      this.activeTab--;
    },
    updateStep(active) {
      this.activeTab = active;
    }
  },

  created() {
    this.$store.dispatch("agent/findByType", Agent.Organization);
    this.$store.dispatch("agent/findByType", Agent.Division);
    this.$store.dispatch("agent/findByType", Agent.Individual);
  }
};
</script>
