<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Legislative references
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/gsim/regulation/add"
              class="card-header-action"
            >
              <add-icon />
              <span class="icon-span">New regulation</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Type</th>
                  <th scope="col">Local id</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="legislativeReference in legislativeReferences"
                  :key="legislativeReference.id"
                >
                  <td>{{ legislativeReference.id }}</td>
                  <td>{{ legislativeReference.name }}</td>
                  <td v-if="legislativeReference.description">
                    {{ legislativeReference.description }}
                  </td>
                  <td v-else class="pl-4">&ndash;</td>
                  <td>{{ legislativeReference.type | capitalize }}</td>
                  <td>
                    {{ legislativeReference.localId }}
                  </td>
                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'LegislativeReferenceEdit',
                          params: { id: legislativeReference.id }
                        }"
                      >
                        <edit-icon />
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'LegislativeReferenceDelete',
                          params: { id: legislativeReference.id }
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
                          name: 'LegislativeReferenceView',
                          params: { id: legislativeReference.id }
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Context } from "@/common";

export default {
  name: "LegislativeReferenceList",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("legislativeReference", ["legislativeReferences"])
  },
  created() {
    this.$store.dispatch("legislativeReference/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  }
};
</script>
