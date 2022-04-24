<template>
  <CCard>
    <CCardBody>
      <CCardText>
        <CRow>
          <CCol class="col-9">
            <CCardTitle>
              <span>{{ $t("structural.represented_variable") }}</span>
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
              {{ $t("structural.validations.local_ID") }}
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
              :placeholder="$t('structural.variable_representation_name')"
              v-model.trim="name"
            />
            <span class="text-danger" v-if="v$.name.$error">
              {{ $t("structural.validations.variable_representation_name") }}
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
              :placeholder="
                $t('structural.variable_representation_description')
              "
              v-model.trim="description"
            />
          </CForm>

          <CForm>
            <CRow>
              <CCol class="col-8">
                <CFormLabel for="source">
                  <span>{{ $t("structural.sentinel_value") }}</span>
                </CFormLabel>
              </CCol>
              <CCol class="col-4">
                <CNav class="justify-content-end">
                  <CNavItem>
                    <a
                      class="link-button"
                      @click.prevent="openValueDomainDialog('sentinel')"
                    >
                      <CIcon name="cil-plus" />{{
                        $t("structural.sentinel_value")
                      }}
                    </a>
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
                  <span>{{ $t("structural.substantive_value") }}*</span>
                </CFormLabel>
              </CCol>
              <CCol class="col-4">
                <CNav class="justify-content-end">
                  <CNavItem>
                    <a
                      class="link-button"
                      @click.prevent="openValueDomainDialog('substantive')"
                    >
                      <CIcon name="cil-plus" />{{
                        $t("structural.substantive_value")
                      }}
                    </a>
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
          ><span v-if="!isEdit">{{ $t("referential.add") }}</span>
          <span v-else> {{ $t("referential.update") }}</span>
        </CButton>
        <hr />
        <CRow v-if="variable?.representations?.length">
          <CCol
            class="col-4"
            v-for="representation in variable.representations"
            :key="representation.id"
            ><CCard class="mb-3">
              <CCardBody>
                <CRow>
                  <CCol class="col-9">
                    <CCardTitle>
                      <span>{{ representation.name }}</span>
                    </CCardTitle>
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span
                          v-on:click="
                            editVariableRepresentation(representation)
                          "
                          ><CIcon name="cil-pencil" />
                        </span>
                      </CNavItem>
                      <CNavItem>
                        <span
                          v-on:click="
                            deleteVariableRepresentation(representation)
                          "
                          ><CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CCard v-else>
          <CCardText>
            <span>There are no items yet in the variable.</span>
          </CCardText>
        </CCard>
      </CCardText>
    </CCardBody>
    <CModal
      backdrop="static"
      :visible="showDeleteDialog"
      @close="
        () => {
          showDeleteDialog = false;
        }
      "
      ><CModalHeader>
        <CModalTitle>Delete representation</CModalTitle>
      </CModalHeader>
      <CModalBody
        >This action will remove the representation from the variable. This
        action cannot be undone. Are you sure you want to doelete this
        representation?
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          @click="
            () => {
              showDeleteDialog = false;
            }
          "
          ><span>{{ $t("structural.close") }}</span>
        </CButton>
        <CButton color="danger" @click="handleDelete">
          <span>{{ $t("referential.delete") }}</span>
        </CButton>
      </CModalFooter>
    </CModal>

    <app-value-domain-form
      :showDiealog="showValueDomainDialog"
      :selectedValueDomainType="valueDomainType"
      @success="handleSuccess"
      @close="closeValueDomainDialog"
    ></app-value-domain-form>
  </CCard>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import _ from "lodash";

import ValueDomainForm from "./ValueDomainForm.vue";

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
  components: {
    "app-value-domain-form": ValueDomainForm,
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
      representationId: "",
      showDeleteDialog: false,

      showValueDomainDialog: false,
      valueDomainType: "",
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
    editVariableRepresentation(representation) {
      this.isEdit = true;
      this.name = representation.name;
      this.description = representation.description;
      this.localId = representation.localId;
      this.representationId = representation.id;
      this.substantiveValueDomain = representation.substantiveValueDomain;
      this.sentinelValueDomain = representation.sentinelValueDomain;
    },
    deleteVariableRepresentation(representation) {
      this.representationId = representation.id;
      this.showDeleteDialog = true;
    },
    openValueDomainDialog(valueDomainType) {
      this.valueDomainType = valueDomainType;
      this.showValueDomainDialog = true;
    },
    closeValueDomainDialog() {
      this.valueDomainType = null;
      this.showValueDomainDialog = false;
    },
    handleSuccess(data) {
      if (data.scope === "SENTINEL") {
        this.sentinelValueDomain = data;
        this.sentinelValueDomainId = data.id;
      } else {
        this.substantiveValueDomain = data;
        this.substantiveValueDomainId = data.id;
      }
    },
    handleDelete() {
      this.$store
        .dispatch("variableRepresentation/delete", this.representationId)
        .then(() => {
          this.$store.dispatch("variable/findById", this.$route.params.id);
          this.disabled = false;
          this.showDeleteDialog = false;
        });
    },
    handleSave() {
      this.disabled = true;
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          variableId: this.variable.id,
          name: this.name,
          description: this.description,
          localId: this.localId.toUpperCase(),
          sentinelValueDomainId: this.sentinelValueDomainId,
          substantiveValueDomainId: this.substantiveValueDomainId,
        };
        if (this.isEdit) {
          formData.id = this.representationId;
          this.$store
            .dispatch("variableRepresentation/update", formData)
            .then(() => {
              this.$store.dispatch("variable/findById", this.$route.params.id);
              this.disabled = false;
            });
        } else {
          this.$store
            .dispatch("variableRepresentation/save", formData)
            .then(() => {
              this.$store.dispatch("variable/findById", this.$route.params.id);
              this.disabled = false;
            });
        }

        this.resetRepresentationFields();
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
.link-button {
  text-decoration: none;
  color: #0d6efd;
  cursor: pointer;
}
</style>
