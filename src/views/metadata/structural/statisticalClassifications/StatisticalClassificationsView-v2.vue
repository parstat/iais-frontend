<template>
  <CCardBody>
    <CDataTable
      :items="items.Nodes || items.Nodes.Category"
      :fields="fields"
      column-filter
      table-filter
      items-per-page-select
      :items-per-page="10"
      hover
      sorter
      pagination
    >
      <template #status="{item}">
        <td>
          <CBadge :color="getBadge(item.status)">
            {{ item.status }}
          </CBadge>
        </td>
      </template>
      <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item, index)"
          >
            {{ Boolean(item._toggled) ? "Hide" : "Show" }}
          </CButton>
        </td>
      </template>
      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 102 }">
              <h4>
                {{ item.username }}
              </h4>
              <p class="text-muted">User since: {{ item.registered }}</p>
              <CButton size="sm" color="info" class="">
                User Settings
              </CButton>
              <CButton size="sm" color="danger" class="ml-1">
                Delete
              </CButton>
            </CMedia>
          </CCardBody>
        </CCollapse>
      </template>
    </CDataTable>
  </CCardBody>
</template>
<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";
import axios from "axios";

//const items = ['items'];

const fields = [
  { key: "id", _style: "width:20px" },
  { key: "Code", _style: "width:90px;" },
  { key: "Category.Name", _style: "min-width:100px;", label: "Category Name" },
  {
    key: "Category.id",
    _style: "min-width:100px;",
    label: "Category Description"
  },
  {
    key: "show_details",
    label: "Actions",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];

export default {
  name: "StatisticalClassificationsView",
  data() {
    return {
      /*items: items.map((item, id) => {
      return { ...item, id };
      }),
      */

      fields,
      details: [],
      collapseDuration: 0,
      loading: false,
      disabled: false,
      items: ["items"],
      citems: []
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:5300/statisticalClassifications/" +
          this.$route.params.id
      )
      .then(response => (this.items = response.data))
      .catch(response => console.log(response))
      .finally(() => (this.loading = false));
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"])
    //...mapGetters("items", ["items"])
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/statisticalClassifications");
    }

    /*getItems() {
      this.loading = true;
      try {
        const items = axios.get(
          "http://localhost:5300/statisticalClassifications/" +
            this.$route.params.id
        );
        this.items = items.data;
        this.loading = false;
      } catch (err) {
        console.log(err); // handle errors here...
      }
     
    },*/
  }
  /*
  created() {
    axios
      .get(
        "http://localhost:5300/statisticalClassifications/" +
          this.$route.params.id
      )

      .then(response => (this.items = response.data))
      .catch(response => console.log(response))
      //.catch(error => console.log(error))
      .finally(() => (this.loading = false));
  }
  */
};
</script>
<style scoped>
.form-control:disabled,
.form-control[readonly] {
  background-color: #ebedef;
  opacity: 1;
}
.center {
  text-align: center;
  margin: 0 auto;
}
.w-20 {
  width: 20%;
}
.w-40 {
  width: 40%;
}
.justify {
  text-align: justify;
}
</style>
