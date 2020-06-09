<template>
  <div class="row" v-if="statisticalProgram">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <edit-icon />
          <strong class="icon-header">Statistical process</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="localId">Survey Id*</label>
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
              >Please enter survey id.</span
            >
          </div>
          <div class="form-group">
            <label for="name">Survey name*</label>
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
              >Please enter survey name.</span
            >
          </div>
          <div class="form-group">
            <label for="acronym">Survey acronym*</label>
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
              :class="{ show: $v.statisticalProgram.description.$error }"
              >Please enter an description.</span
            >
          </div>
          <div class="form-mandatory">*Mandatory fields</div>
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
    <div class="col-sm-12 col-md-6">
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
              :class="{ 'is-invalid': $v.statisticalProgram.owner.$error }"
              v-model="statisticalProgram.owner"
            ></v-select>
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.owner.$error }"
              >Please select an Organization.</span
            >
          </div>
          <div class="form-group" v-if="maintainers">
            <label for="description">Division*</label>
            <v-select
              label="name"
              :options="maintainers"
              :class="{ 'is-invalid': $v.statisticalProgram.maintainer.$error }"
              v-model="statisticalProgram.maintainer"
            ></v-select>
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.maintainer.$error }"
              >Please select a division.</span
            >
          </div>
          <div class="form-group" v-if="contacts">
            <label for="description">Contact person*</label>
            <v-select
              label="name"
              :options="contacts"
              :class="{ 'is-invalid': $v.statisticalProgram.contact.$error }"
              v-model="statisticalProgram.contact"
            ></v-select>
            <span
              class="help-block"
              :class="{ show: $v.statisticalProgram.contact.$error }"
              >Please select a contact person.</span
            >
          </div>
        </div>
      </div>
      <div class="card">
        <header class="card-header">
          <regulation-icon />
          <strong class="icon-header">Legislative references</strong>
          <div class="card-header-actions">
            <router-link
              tag="a"
              to="/metadata/referential/gsim/regulation/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">Add</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="form-group" v-if="legislativeReferences">
            <label for="description">Legislative references</label>
            <v-select
              label="name"
              @search="searchLegislativeReference"
              :options="legislativeReferences"
              placeholder="Select legislative references"
              @input="addLegislativeReference"
            ></v-select>
            <span class="help-block"
              >Please select legislative references.</span
            >
          </div>

          <div
            class="card-slot"
            v-for="legislativeReference of statisticalProgram.legislativeReferences"
            :key="legislativeReference.id"
          >
            <p class="heading">
              {{ legislativeReference.name }}
              <router-link
                tag="a"
                :to="{
                  name: 'LegislativeReferenceView',
                  params: { id: legislativeReference.id }
                }"
              >
                <view-icon />
              </router-link>
            </p>
            <p class="card-text">{{ legislativeReference.description }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <header class="card-header">
          <regulation-icon />
          <strong class="icon-header">Statistical Standard</strong>
          <div class="card-header-actions">
            <router-link
              tag="a"
              to="/metadata/referential/gsim/standard/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">Add</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="form-group" v-if="statisticalStandards">
            <label for="statisticalStandard">Statistical Standard</label>
            <v-select
              label="name"
              :options="statisticalStandards"
              v-model="statisticalProgram.statisticalStandards"
              placeholder="Select statistical standards"
              multiple
            ></v-select>
            <span class="help-block">Please select statistical standards.</span>
          </div>
          <div
            class="card-slot"
            v-for="statisticalStandard of statisticalProgram.statisticalStandards"
            :key="statisticalStandard.id"
          >
            <p class="heading">
              {{ statisticalStandard.name }}
              <router-link
                tag="a"
                :to="{
                  name: 'StatisticalStandardView',
                  params: { id: statisticalStandard.id }
                }"
              >
                <view-icon />
              </router-link>
            </p>
            <p class="card-text">{{ statisticalStandard.description }}</p>
          </div>
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
  name: "StatisticalProgramEdit",

  data() {
    return {
      disabled: false,
      legislativeReferences: []
    };
  },
  computed: {
    ...mapGetters("statisticalProgram", ["statisticalProgram"]),
    ...mapGetters("agent", ["owners", "maintainers", "contacts"]),
    ...mapGetters("statisticalStandard", ["statisticalStandards"])
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
          owner: this.statisticalProgram.owner,
          maintainer: this.statisticalProgram.maintainer,
          contact: this.statisticalProgram.contact,
          statisticalStandards: this.statisticalProgram.statisticalStandards
        };
        this.$store.dispatch("statisticalProgram/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.statisticalProgram.localId = "";
      this.statisticalProgram.name = "";
      this.statisticalProgram.acronym = "";
      this.statisticalProgram.description = "";
      this.statisticalProgram.owner = null;
      this.statisticalProgram.maintainer = null;
      this.statisticalProgram.contact = null;
      this.legislativeReferences = [];
      this.statisticalStandards = [];
      this.$v.$reset();
    },
    searchLegislativeReference(search) {
      fetch(
        `http://iais.francecentral.cloudapp.azure.com:8080/api/v1/referential/legislative/references?name=${escape(
          search
        )}`
      ).then(res => {
        res.json().then(json => (this.legislativeReferences = json));
      });
    },
    addLegislativeReference(selectedLegislativeReference) {
      const formData = {
        id: this.statisticalProgram.id,
        legislative: selectedLegislativeReference.id
      };
      this.$store.dispatch(
        "statisticalProgram/addLegislativeReference",
        formData
      );
    }
  },
  created() {
    this.$store.dispatch("statisticalProgram/findById", this.$route.params.id);
    this.$store.dispatch("agent/findByType", Agent.Organization);
    this.$store.dispatch("agent/findByType", Agent.Division);
    this.$store.dispatch("agent/findByType", Agent.Individual);
    this.$store.dispatch("legislativeReference/findAll");
    this.$store.dispatch("statisticalStandard/findAll");
  }
};
</script>
