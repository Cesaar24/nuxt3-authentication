<template>
  <!-- profile -->
  <v-container class="profile h-screen mt-4">
    <v-form>
      <v-text-field
        v-model="(userForm as userProfileForm).name"
        :counter="10"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="(userForm as userProfileForm).lastName"
        label="lastName"
        required
      ></v-text-field>
      <v-text-field
        v-model="(userForm as userProfileForm).username"
        label="username"
        required
      ></v-text-field>
      <v-text-field
        v-model="(userForm as userProfileForm).email"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="(userForm as userProfileForm).role"
        :items="roles"
        label="Role"
        required
      ></v-select>
      <v-select
        v-model="(userForm as userProfileForm).subscription"
        :items="subscriptions"
        label="Subscriptions"
        required
      ></v-select>

      <v-btn
        class="me-4"
        variant="elevated"
        color="primary"
        @click="updateUserProfile"
      >
        submit
      </v-btn>
      <v-btn> clear </v-btn>
    </v-form>
  </v-container>
  <v-snackbar v-model="snackbar">
    {{ text }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import user from "~/server/middleware/user";

const { updateUser } = useAuth();

definePageMeta({
  layout: "dash",
  middleware: "auth",
});
const userState = userStore();
const snackbar = ref(false);
const text = ref("");

// user profile form <User>
const userForm = <userProfileForm | {}>ref({});

const state = ref({
  ...userForm,
});

// mounted
onMounted(() => {
  console.log(userState);

  if (userState.user.credentials.logged) {
    const { password, ..._user } = userState.getUserProfile as User;
    //@ts-ignore
    userForm.value = _user;
    /* userForm = _user as userProfileForm;

    // add subscription if not exist
    if (!(userForm as userProfileForm).subscription) {
      (userForm as userProfileForm).subscription = "Free";
    } */
  }
});

// update user profile
const updateUserProfile = async () => {
  //@ts-ignore
  const _user: userProfileForm = userForm.value as userProfileForm;

  const newData: userProfileForm = {
    id: _user.id,
    name: _user.name,
    lastName: _user.lastName,
    username: _user.username,
    email: _user.email,
    role: _user.role,
    subscription: _user.subscription,
  };
  await updateUser(newData)
    .then((response) => {
      // console.log(response);
      snackbar.value = true;
      text.value = "User updated successfully";
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = true;
      text.value = error.statusMessage;
    });
};

const roles = ["User", "Admin"];
const subscriptions = ["Free", "Basic", "Standard", "Premium"];
</script>
