<template>
  <CRow>
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3" v-if="variable">
      <div class="p-3">
        <h2 class="display-5">
          <span>{{ variable.name }}</span>
          <span class="lead">( {{ variable.version }} )</span>
        </h2>
        <p class="lead">
          <span>
            <strong>{{ $t("structural.description") }}:</strong>
            {{ variable.description }}
          </span>
        </p>
      </div>
    </div>

    <CCard class="col-12">
      <CCardBody>
        <CCardTitle>
          <span>{{ $t("structural.representations") }}</span>
        </CCardTitle>
        <CCardText>
          <table class="table table-hover" v-if="variable">
            <thead>
              <tr>
                <th scope="col">
                  <span>{{ $t("structural.local_ID") }}</span>
                </th>
                <th scope="col">
                  <span>{{ $t("structural.name") }}</span>
                </th>
                <th scope="col" colspan="2" width="2%">
                  <span>{{ $t("structural.actions") }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in variable.representations" :key="item.index">
                <td>
                  <span>{{ item.localId }}</span>
                </td>
                <td>
                  <span>{{ item.name }}</span>
                </td>
                <template v-if="isAuthenticated">
                  <td>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'VariableRepresentationsView',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-magnifying-glass" />
                    </router-link>
                  </td>
                  <td>
                    <!--   <router-link
                    tag="a"
                    :to="{
                      name: 'VariableRepresentationsEdit',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-pencil" />
                  </router-link> -->
                  </td>
                  <td v-if="isAdmin">
                    <!--  <router-link
                    tag="a"
                    :to="{
                      name: 'VariableRepresentationsDelete',
                      params: { id: item.id },
                    }"
                  >
                    <CIcon name="cil-trash" />
                  </router-link> -->
                  </td>
                </template>
                <template v-else>
                  <td>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'VariableRepresentationsView',
                        params: { id: item.id },
                      }"
                    >
                      <CIcon name="cil-magnifying-glass" />
                    </router-link>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </CCardText>
        <CButton
          color="primary"
          size="sm"
          @click.prevent="handleBack()"
          :disabled="disabled"
          ><span>{{ $t("structural.back") }}</span>
        </CButton>
      </CCardBody>
    </CCard>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "VariableView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("variable", ["variable"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/variable");
    },
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
<style scoped>
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
