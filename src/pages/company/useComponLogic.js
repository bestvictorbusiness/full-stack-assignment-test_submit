import { useQuasar, Notify } from "quasar";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCompanyStore } from "src/stores/company";
import { mapState, mapActions } from "pinia";
export default function useCompanyLogic() {
  const $q = useQuasar();
  const router = useRouter();
  const route = useRoute();
  const form = ref({
    name: "",
    email: "",
    address: "",
    country: "",
    contact_number: "",
    website: "",
    uuid: "",
  });
  const is_edit = ref(false);
  const emailPattern =
    "/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}.){1,8}[a-zA-Z]{2,63}$/";
  const myForm = ref(null);

  const store = useCompanyStore();

  const onSubmit = () => {
    myForm.value.validate().then((success) => {
      if (success) {
        let action = "";
        if (is_edit.value) {
          action = "update";
        } else {
          action = "add";
        }
        store[action](form.value)
          .then((response) => {
            messageAlert("positive", response.message);
            router.push({ path: "/company" });
          })
          .catch((error) => {
            messageAlert("negitavie", error.message);
          });
        // yay, models are correct
      } else {
        messageAlert("positive", "Some filed is missing please check it first");
      }
    });
  };
  const onReset = () => {
    form.value.name = "";
    form.value.email = "";
    form.value.address = "";
    form.value.country = "";
    form.value.contact_number = "";
    form.value.website = "";
  };
  const messageAlert = (color, message) => {
    Notify.create({
      position: "top",
      color,
      message,
    });
  };

  return {
    form,
    emailPattern,
    myForm,
    store,
    router,
    route,
    is_edit,
    onSubmit,
    onReset,
    messageAlert,
  };
}
