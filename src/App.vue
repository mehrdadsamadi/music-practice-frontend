<template>
  <v-app>
    <v-main class="pa-4" style="padding-bottom: 6rem !important;">
      <transition name="moveX" mode="out-in">
        <router-view/>
      </transition>
      
      <snackbar></snackbar>
      <prompt></prompt>
      <loading></loading>
    </v-main>

  </v-app>
</template>

<script>
import Snackbar from "@/components/tools/Snackbar.vue";
import Prompt from "@/components/tools/Prompt.vue";
import Loading from "@/components/tools/LoadingDialog.vue";

export default {
  name: 'App',
  components: {
    Snackbar,
    Prompt,
    Loading
  },
  data: () => ({
    //
  }),
};
</script>
