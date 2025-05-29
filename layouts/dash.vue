<template>
  <div class="dash">
    <!-- <AppHeader /> -->
    <header class="w-100 border" dark>
      <nav class="nav h-100 w-100 d-flex justify-space-between">
        <div class="align-center d-flex">
          <v-app-bar-nav-icon
            class="menu-bar"
            @click="modal = !modal"
          ></v-app-bar-nav-icon>
          <h1 class="ml-2"><NuxtLink to="/">Authentication</NuxtLink></h1>
        </div>

        <div class="menu align-content-center">
          <ul>
            <!-- <li><NuxtLink to="/">Home</NuxtLink></li> -->
            <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
            <li><NuxtLink to="/admin">Admin</NuxtLink></li>
            <li><NuxtLink to="/guest">Guests</NuxtLink></li>
          </ul>
        </div>

        <div class="d-flex pr-5 pl-10 align-center">
          <Transition name="slide-up">
            <v-icon
              v-if="isDarkModeActivated"
              @click="handleDarkMode"
              icon="mdi-white-balance-sunny"
              size="large"
              class=""
            ></v-icon>
            <v-icon
              v-else
              @click="handleDarkMode"
              icon="mdi-moon-waxing-crescent"
              size="large"
              class=""
            ></v-icon>
          </Transition>
          <!-- profile buttom  -->
          <NuxtLink to="/profile">
            <v-icon icon="mdi-account-circle" size="large" class="ml-2">
            </v-icon>
          </NuxtLink>

          <v-btn class="text-sm" @click="logout" prepend-icon="mdi-export">
            Logout
          </v-btn>
        </div>
      </nav>
      <v-navigation-drawer v-model="modal" location="left" temporary>
        <v-list lines="two">
          <v-list-item v-for="(link, i) in links" :key="i">
            <NuxtLink :to="link.path" class="menu-bar-link">{{
              link.title
            }}</NuxtLink>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </header>

    <slot />

    <!-- <AppFooter /> -->
    <footer class="w-100"><span>@2024</span></footer>
  </div>
</template>

<script setup>
import { useTheme } from "vuetify";
const theme = useTheme();

const { logout } = await useAuth();
const modal = ref(false);
const isDarkModeActivated = ref(false);
const links = ref([
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Dashboard",
    path: "/",
  },
  {
    title: "Admin",
    path: "/",
  },
  {
    title: "Users",
    path: "/",
  },
  {
    title: "Guests",
    path: "/",
  },
]);

const handleDarkMode = () => {
  isDarkModeActivated.value = !isDarkModeActivated.value;
  if (isDarkModeActivated.value) {
    theme.global.name.value = "dark";
  } else {
    theme.global.name.value = "light";
  }
};
</script>
<style scoped>
header {
  height: 75px;
  position: relative;
}
.dash {
  /* overflow-y: scroll; */
  height: calc(100% - 100px);
  /* height: 100%; */
  position: relative;
}
.icon {
  top: 30%;
}
a {
  text-decoration: none;
  color: currentcolor;
  padding: 16px;
}
li {
  float: left;
  /* background: blue; */
  text-align: center;
  padding: 16px;
  list-style: none;
  transition: all 0.3s;
}
li:hover {
  scale: 1.2;
  /* background: rgb(33, 134, 33); */
}
li:hover a {
  color: rgb(46, 177, 46);
}
.menu-bar {
  display: none;
}
.menu-bar-link {
  transition: all 0.3s;
}
.menu-bar-link:hover {
  scale: 1.2;
  color: rgb(46, 177, 46);
}
@media (max-width: 900px) {
  .menu {
    display: none;
  }
  .menu-bar {
    display: block;
  }
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
