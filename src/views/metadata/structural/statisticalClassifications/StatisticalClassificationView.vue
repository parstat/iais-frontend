<template>
  <div class="row">
    <div
      class="jumbotron jumbotron-fluid col-lg-12 p-2"
      v-if="statisticalClassification"
    >
      <div class=" p-3">
        <h2 class="display-5">
          {{ statisticalClassification.name }}
          <span class="lead"
            >(
            {{
              statisticalClassification.definition ||
                statisticalClassification.localId
            }}
            )</span
          >
        </h2>
        <p class="lead">
          <strong>Description:</strong>
          {{ statisticalClassification.description }}
        </p>
      </div>
    </div>

    <div class="card w-100">
      <header class="card-header ">
        <h5>Levels</h5>
      </header>
      <div class="card-body">
        <table
          class="table table-hover table-striped"
          v-if="statisticalClassification.levels"
        >
          <thead class="bg-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">LocalId</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">LevelNumber</th>
              <th scope="col" colspan="2" width="2%">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in statisticalClassification.levels" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.localId }}</td>
              <td>{{ item.name }}</td>
              <td class="justify">{{ item.description }}</td>
              <td>{{ item.levelNumber }}</td>
              <template v-if="isAuthenticated">
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationView',
                      params: { id: statisticalClassification.id }
                    }"
                  >
                    <view-icon />
                  </router-link>
                </td>
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationEdit',
                      params: { id: statisticalClassification.id }
                    }"
                  >
                    <edit-icon />
                  </router-link>
                </td>
                <td v-if="isAdmin">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationDelete',
                      params: { id: statisticalClassification.id }
                    }"
                  >
                    <delete-icon />
                  </router-link>
                </td>
              </template>
              <template v-else>
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationView',
                      params: { id: statisticalClassification.id }
                    }"
                  >
                    <view-icon />
                  </router-link>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- statisticalClassificationItems -->
    <div class="card w-100">
      <header class="card-header ">
        <h5>Statistical Classification Items</h5>
      </header>
      <div class="card-body">
        <table
          class="table table-hover table-striped"
          v-if="statisticalClassification.rootItems"
        >
          <thead class="bg-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col" class="col-1">Code</th>
              <th scope="col" class="col-3">Value</th>
              <th scope="col" class="col-1">Level Number</th>
              <th scope="col" class="col-5">Children</th>
              <th scope="col" colspan="2" width="2%">Actions</th>
            </tr>
          </thead>
          <!--statisticalClassificationItems -->
          <tbody
            v-for="item in statisticalClassification.rootItems"
            :key="item.index"
          >
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.value }}</td>
              <td style="width:2%;">{{ item.levelNumber }}</td>
              <!--<td>{{ item.children.value }}</td>-->

              <td>
                <p v-for="nitem in item.children" :key="nitem.id">
                  <a href="#">
                    <CBadge color="secondary p-1" shape="pill"
                      >Code: {{ nitem.code }}</CBadge
                    >
                    {{ nitem.value }}
                  </a>
                </p>
              </td>

              <template v-if="isAuthenticated">
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationsEdit',
                      params: { id: statisticalClassification.id }
                    }"
                  >
                    <edit-icon />
                  </router-link>
                </td>
                <td v-if="isAdmin">
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationsDelete',
                      params: { id: statisticalClassification.id }
                    }"
                  >
                    <delete-icon />
                  </router-link>
                </td>
              </template>
              <template v-else>
                <td>
                  <router-link
                    tag="a"
                    :to="{
                      name: 'StatisticalClassificationsChildrenView',
                      params: { id: statisticalClassification.id }
                    }"
                  >
                    <view-icon />
                  </router-link>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <CButton
          color="primary"
          shape="square"
          size="sm"
          @click.prevent="handleBack()"
          :disabled="disabled"
          >Back</CButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "StatisticalClassificationView",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("statisticalClassification", ["statisticalClassification"])
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/statisticalClassifications");
    }
  },
  created() {
    this.$store.dispatch(
      "statisticalClassification/findById",
      this.$route.params.id
    );
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  }
};
</script>
