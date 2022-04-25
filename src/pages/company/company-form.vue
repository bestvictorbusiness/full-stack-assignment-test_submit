<template>
  <div class="q-pa-xl">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Company Form</div>
      </q-card-section>
      <div class="row">
        <div class="col"></div>
        <div class="col-8">
          <div class="q-pa-md">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              ref="myForm"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="form.name"
                label="Name *"
                hint="Company Name"
                lazy-rules
                :rules="[
                  $rules.required('Your name is required'),
                  $rules.alpha('Your name should not have numbers/space'),
                  $rules.minLength(
                    3,
                    'Your name should have at least 3 letters'
                  ),
                  $rules.maxLength(
                    10,
                    'Your name should not be larger than 10 letters'
                  ),
                ]"
              />

              <q-input
                filled
                type="email"
                v-model="form.email"
                label="Email *"
                hint="Company E-mail "
                lazy-rules
                :disable="is_edit"
                :rules="[
                  $rules.required('Your name is required'),
                  $rules.email('Email address must be vaild'),
                ]"
              />
              <q-input
                filled
                type="text"
                v-model="form.address"
                label="Address *"
                hint="Company Address "
                lazy-rules
                :rules="[
                  $rules.required('Company address is required'),
                  $rules.minLength(3, 'Address should have at least 3 letters'),
                  $rules.maxLength(
                    70,
                    'Address should not be larger than 60 letters'
                  ),
                ]"
              />

              <q-input
                filled
                type="text"
                v-model="form.country"
                maxlength="100"
                label="Country *"
                hint="Country Name"
                lazy-rules
                :rules="[
                  $rules.required('Country name is required'),
                  $rules.maxLength(
                    60,
                    'Country Name should not be larger than 60 letters'
                  ),
                ]"
              />
              <q-input
                filled
                type="number"
                v-model="form.contact_number"
                label="Contact Number *"
                hint="Contact Number"
                lazy-rules
                :rules="[
                  $rules.required('Contact number is required'),
                  $rules.numeric('Contact number should be numberic'),
                  $rules.maxLength(11, 'Contact number must be 11 digit'),
                  $rules.minLength(11, 'Contact number must be 11 digit'),
                ]"
              />
              <q-input
                filled
                type="text"
                v-model="form.website"
                label="Website *"
                hint="Company Website Url"
                lazy-rules
                :rules="[
                  $rules.required('Contact number is required'),
                  $rules.url('Website address must be a valid url'),
                ]"
              />

              <div>
                <q-btn
                  :label="!is_edit ? 'Submit' : 'Update'"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  v-if="!is_edit"
                />
              </div>
            </q-form>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </q-card>
  </div>
</template>

<script>
import useCompanyLogic from "./useComponLogic";
export default {
  setup() {
    const { myForm, form, is_edit, route, store, onSubmit, onReset } =
      useCompanyLogic();

    if (route.query.email) {
      is_edit.value = true;
      const obj = JSON.stringify(store.getCompanyByEmail(route.query.email));
      if (obj) {
        form.value = JSON.parse(obj);
      }
    }

    return {
      myForm,
      form,
      is_edit,
      route,
      store,
      onSubmit,
      onReset,
    };
  },
};
</script>
