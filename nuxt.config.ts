// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    // Will be available in both server and client
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRES,
    clientIdGoogle: process.env.CLIENT_ID_GOOGLE,
  },
  modules: ["vuetify-nuxt-module", "@pinia/nuxt", "nuxt-vue3-google-signin"],
  googleSignIn: {
    clientId:
      "850534164458-pl7g70tq9bku79qf6u1966a0geov1r6n.apps.googleusercontent.com",
  },
  css: ["~/assets/main.css"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        /*  options: {
          customProperties: true,
          variations: true,
        }, */

        themes: {
          light: {},
          dark: {},
        },
      },
      /* theme: {
        defaultTheme: 'dark'
      } */
    },
  },
});
