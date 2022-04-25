import { defineStore } from "pinia";
import { Notify } from "quasar";
export const useCompanyStore = defineStore("company", {
  state: () => ({
    column: [
      {
        name: "name",
        align: "center",
        label: "Name",
        field: "name",
        sortable: true,
      },

      {
        name: "email",
        align: "center",
        label: "E-mail",
        field: "email",
        sortable: true,
      },
      {
        name: "address",
        align: "center",
        label: "Address",
        field: "address",
        sortable: true,
      },
      {
        name: "country",
        align: "center",
        label: "Country",
        field: "country",
        sortable: true,
      },
      {
        name: "contact_number",
        align: "center",
        label: "Contact Number",
        field: "contact_number",
        sortable: true,
      },
      {
        name: "website",
        align: "center",
        label: "Website",
        field: "website",
        sortable: true,
      },
      // {
      //   name: "edit",
      //   align: "center",
      //   label: "Edit",
      // },
      {
        name: "uuid",
        align: "center",
        label: "Delete",
        field: "uuid",
      },
    ],
    companies: [
      // {
      //   name: "",
      //   email: "",
      //   address: "",
      //   country: "",
      //   contact_number: "",
      //   website: "",
      // },
    ],
  }),
  getters: {
    companies_arr: (state) => state.companies,
    column: (state) => state.column,
    getCompanyByEmail: (state) => {
      return (email) =>
        state.companies.find((company) => company.email === email);
    },
  },
  actions: {
    add(company) {
      return new Promise((resolve, reject) => {
        if (!this.getCompanyByEmail(company.email)) {
          this.companies.push(JSON.parse(JSON.stringify(company)));
          resolve({
            status: true,
            message: "Company has been added Successfully!",
          });
        } else {
          reject({
            status: false,
            message: "Company with this email is already exists",
          });
        }
      });
    },
    update(company) {
      return new Promise((resolve, reject) => {
        const index = this.companies.findIndex((comp) => {
          return comp.email === comp.email;
        });
        if (index !== -1) {
          this.companies.splice(index, 1, JSON.parse(JSON.stringify(company)));
          resolve({
            status: true,
            message: "Company updated successfully!",
          });
        } else {
          reject({
            status: false,
            message: "Company with this email is already exists",
          });
        }
      });
    },
    // update(company) {
    //   const index = this.companies.findIndex((comp) => {
    //     return comp.email === comp.email;
    //   });
    //   if (index !== -1) {
    //      this.companies.splice(index, 1, JSON.parse(JSON.stringify(company)));
    //      Notify.create({
    //        position: "top",
    //        color: "positive",
    //        message: "Company updated successfully!",
    //      });
    //   }
    // },
    remove(email) {
      const index = this.companies.findIndex((comp) => {
        return comp.email === email;
      });
      if (index !== -1) this.companies.splice(index, 1);
      Notify.create({
        position: "top",
        color: "positive",
        message: "Company deleted successfully!",
      });
    },
  },
});
