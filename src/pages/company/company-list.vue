<template>
  <q-page class="q-pl-lg">
    <div class="row">
      <div class="col-12">
        <q-btn
          class="float-right q-mt-md q-mr-md"
          icon="add"
          color="primary"
          label="Add"
          to="/company-form"
        />
      </div>
      <div class="q-pa-md col">
        <q-table
          title="Company"
          :rows="companies_arr"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <div>
                <q-item
                  clickable
                  tag="a"
                  :to="`/company-form?email=${props.row.email}`"
                >
                  {{ props.row.name }}
                </q-item>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-email="props">
            <q-td :props="props">
              <div>
                <q-item
                  clickable
                  tag="a"
                  :to="`/company-form?email=${props.row.email}`"
                >
                  {{ props.row.email }}
                </q-item>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-uuid="props">
            <q-td :props="props">
              <div>
                <q-btn
                  color="grey-4"
                  text-color="red"
                  glossy
                  unelevated
                  icon="delete"
                  label="Delete"
                  @click="deleteCompany(props.row)"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>

      <q-dialog v-model="openDeletedModal" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="primary" text-color="white" />
            <span class="q-ml-sm"
              >Do you want to Delete
              <b class="text-red">{{ activeRecord.name }} </b> Company ?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              flat
              label="Delete"
              color="primary"
              @click="confirmDeleteCompany"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { useCompanyStore } from "src/stores/company";
import { mapState, mapActions } from "pinia";

const store = useCompanyStore();
export default {
  data() {
    return {
      store: store,
      is_update: false,
      openDeletedModal: false,
      activeRecord: {},
    };
  },
  methods: {
    deleteCompany(record) {
      this.activeRecord = record;
      this.openDeletedModal = true;
    },
    confirmDeleteCompany() {
      this.remove(this.activeRecord.email);
    },

    ...mapActions(useCompanyStore, ["add", "remove"]),
  },
  computed: {
    ...mapState(useCompanyStore, ["companies_arr", "column"]), // to use state and getters
  },
};
</script>
