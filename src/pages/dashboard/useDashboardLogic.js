import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default function useDashboardLogic() {
  const $q = useQuasar();
  const catRow = ref([]);

  const catColumns = [
    {
      name: "user",
      align: "left",
      label: "User",
      field: "user",
      sortable: true,
    },
    {
      name: "type",
      align: "left",
      label: "Type",
      field: "type",
      sortable: true,
    },
    {
      name: "text",
      align: "left",
      label: "Name",
      field: "text",
      sortable: true,
      style: "width: 200px",
    },
  ];

  const loadData = () => {
    api
      .get("/facts/random?animal_type=cat&amount=50")
      .then((response) => {
        catRow.value = response.data;
      })
      .catch(() => {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem",
        });
      });
  };
  return { catRow, catColumns, loadData };
}
