<template>
  <v-app>
    <v-main>
      <transition name="moveX" mode="out-in">
        <router-view/>
      </transition>
    </v-main>

      <snackbar></snackbar>
      <prompt></prompt>
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
