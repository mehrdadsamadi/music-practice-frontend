<template>
  <v-app>
    <v-main class="pa-4">
      <transition name="moveX" mode="out-in">
        <router-view/>
      </transition>
      
      <snackbar></snackbar>
      <prompt></prompt>
    </v-main>

  </v-app>
</template>

<script>
import Snackbar from "@/components/tools/Snackbar.vue";
import Prompt from "@/components/tools/Prompt.vue";

export default {
  name: 'App',
  components: {
    Snackbar,
    Prompt
  },
  data: () => ({
    //
  }),
};
</script>
