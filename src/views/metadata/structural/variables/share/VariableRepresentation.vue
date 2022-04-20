<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CRow>
          <CCol class="col-9">
            <CCardTitle>
              <span>Represented Variable</span>
            </CCardTitle>
          </CCol>
        </CRow>
        <CRow>
          <CForm class="mb-3">
            <CFormLabel for="localId">
              <span>{{ $t("structural.local_ID") }}*</span>
            </CFormLabel>
            <input
              id="localId"
              type="text"
              class="form-control capitalize"
              :class="{ 'is-invalid': v$.localId.$error }"
              :placeholder="$t('structural.local_ID')"
              v-model.trim="localId"
              :disabled="isEdit"
            />
            <span class="text-danger" v-if="v$.localId.$error">
              <span>{{ $t("structural.validations.local_ID") }}</span>
            </span>
          </CForm>
          <CForm class="mb-3">
            <CFormLabel for="name">
              <span>{{ $t("structural.name") }}*</span>
            </CFormLabel>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': v$.name.$error }"
              :placeholder="'Variable Representation name'"
              v-model.trim="name"
            />
            <span class="text-danger" v-if="v$.name.$error">
              Please enter a name for the Variable Representation.
            </span>
          </CForm>
          <CForm class="mb-3">
            <CFormLabel for="description">
              <span>{{ $t("structural.description") }}</span>
            </CFormLabel>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              :placeholder="'Variable Representation description'"
              v-model.trim="description"
            />
          </CForm>

          <CForm>
            <CRow>
              <CCol class="col-8">
                <CFormLabel for="source">
                  <span>Sentinel Value Domain</span>
                </CFormLabel>
              </CCol>
              <CCol class="col-4">
                <CNav class="justify-content-end">
                  <CNavItem>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'VariableRepresentationsAdd',
                        params: { id: variable?.id ?? '11' },
                      }"
                      class="text-decoration-none text-primary"
                    >
                      <CIcon name="cil-plus" />
                      <span class="icon-span"> Sentinel Value Domain </span>
                    </router-link>
                  </CNavItem>
                </CNav>
              </CCol>
            </CRow>
            <v-select
              class="mb-3"
              label="name"
              :options="sentinelValueDomains"
              @search="searchSentinelValueDomain"
              @input="setSentinelValueDomain"
              :filterable="false"
              v-model="sentinelValueDomain"
              :disabled="isEdit"
            />
          </CForm>

          <CForm>
            <CRow>
              <CCol class="col-8">
                <CFormLabel for="target">
                  <span>Substantive Value Domain *</span>
                </CFormLabel>
              </CCol>
              <CCol class="col-4">
                <CNav class="justify-content-end">
                  <CNavItem>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'VariableRepresentationsAdd',
                        params: { id: variable?.id ?? '11' },
                      }"
                      class="text-decoration-none text-primary"
                    >
                      <CIcon name="cil-plus" />
                      <span class="icon-span"> Substantive Value Domain </span>
                    </router-link>
                  </CNavItem>
                </CNav>
              </CCol>
            </CRow>
            <v-select
              class="mb-3"
              label="name"
              :filterable="false"
              :options="substantiveValueDomains"
              @search="searchSubstantiveValueDomain"
              @input="setSubstantiveValueDomain"
              v-model="substantiveValueDomain"
              :disabled="isEdit"
            />
          </CForm>
          <div class="form-mandatory mt-3">
            <span>*{{ $t("structural.mandatory_fields") }}</span>
          </div>
        </CRow>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="handleSave"
          :disabled="disabled"
          ><span>{{ $t("referential.add") }}</span>
        </CButton>

        <CSmartTable
          v-if="variable?.representations?.length"
          :activePage="1"
          :items="variable?.representations"
          :columns="variableColumns"
          columnFilter
          cleaner
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          pagination
        >
          <template #actions="{ item }">
            <span v-if="isAuthenticated" class="pl-2">
              <!-- <router-link
                tag="a"
                title="Edit"
                :to="{
                  name: 'VariableRepresentationEdit',
                  params: { id: variable.id, representationId: item.id },
                }"
              > -->
              <CIcon name="cil-pencil" />
              <!-- </router-link> -->
            </span>
            <span v-if="isAuthenticated" class="pl-2">
              <!-- <router-link
                tag="a"
                title="Delete"
                :to="{
                  name: 'VariableRepresentationDelete',
                  params: { id: variable.id, representationId: item.id },
                }"
              > -->
              <CIcon name="cil-trash" />
              {{ item.name }}
              <!--</router-link> -->
            </span>
          </template>
        </CSmartTable>
      </CCardText>
    </CCardBody>
  </CCard>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "VariableRepresentation",
  computed: {
    ...mapGetters("variable", ["variable"]),
    ...mapGetters("valueDomain", [
      "substantiveValueDomains",
      "sentinelValueDomains",
    ]),
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
  },
  data() {
    return {
      disabled: false,
      v$: useValidate(),
      name: "",
      description: "",
      localId: "",
      sentinelValueDomain: "",
      substantiveValueDomain: "",
      sentinelValueDomainId: null,
      substantiveValueDomainId: null,
      isEdit: false,
      variableColumns: [
        {
          key: "localId",
          label: "Local ID",
        },
        {
          key: "name",
          label: "Name",
        },
        {
          key: "actions",
          label: "Actions",
          _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ],
    };
  },
  validations: {
    name: {
      required,
    },
    localId: {
      required,
    },
  },
  methods: {
    searchSubstantiveValueDomain(name, loading) {
      loading(true);
      this.search(name, "SUBSTANTIVE", loading, this);
    },
    searchSentinelValueDomain(name, loading) {
      loading(true);
      this.search(name, "SENTINEL", loading, this);
    },
    search: _.debounce((name, scope, loading, vm) => {
      if (name.length > 0) {
        var formData = {
          name: name,
          scope: scope,
        };
        vm.$store.dispatch("valueDomain/findByName", formData).then(() => {
          loading(false);
        });
      } else {
        loading(false);
      }
    }, 500),
    setSentinelValueDomain(selectedValueDomain) {
      if (typeof selectedValueDomain !== "undefined") {
        this.sentinelValueDomainId = selectedValueDomain.id;
      }
    },
    setSubstantiveValueDomain(selectedValueDomain) {
      if (typeof selectedValueDomain !== "undefined") {
        this.substantiveValueDomainId = selectedValueDomain.id;
      }
    },
    async handleSave() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          variableId: this.variable.id,
          name: this.name,
          description: this.description,
          definition: this.definition ?? "",
          localId: this.localId.toUpperCase(),
          sentinelValueDomainId: this.sentinelValueDomainId,
          substantiveValueDomainId: this.substantiveValueDomainId,
        };
        console.log(formData);
        await this.$store.dispatch("variableRepresentation/save", formData);
        this.resetRepresentationFields();
        this.$store.dispatch("variable/findById", this.variable.id);
      }
    },

    resetRepresentationFields() {
      this.name = "";
      this.description = "";
      this.localId = "";
      this.sentinelValueDomain = "";
      this.substantiveValueDomain = "";
      this.sentinelValueDomainId = null;
      this.substantiveValueDomainId = null;
      this.isEdit = false;
      this.disabled = false;
      this.v$.$reset();
    },
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: uppercase;
}
</style>
