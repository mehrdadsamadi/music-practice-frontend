<!-- PWAPrompt.vue -->
<template>
     <v-snackbar
        class="pwa"
        content-class="pwa-snackbar px-1 py-0"
        v-model="pwa_dialog"
        :timeout="-1"
        color="primary"
    >
            <v-btn @click="pwa_dialog = false" light icon color="white" aria-label="بستن">
                <svg width="1.4em" height="1.4em" viewBox="0 0 352 512">
                    <path
                        fill="currentColor"
                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                    ></path>
                </svg>
            </v-btn>

            <p class="h6 mb-0">عملکرد بهتر در وب اپ</p>

            <v-btn
                class="font-weight-bold primary--text"
                @click="install_pwa"
                light
                rounded
                depressed
                small
                color="white"
                >نصب کن</v-btn
            >
    </v-snackbar>
</template>
  
<script>
  export default {
    data: () => ({
        pwa_dialog: true,
        deferred_prompt: null,
    }),
  
    mounted() {
      this.handle_custom_pwa_installation();
    },

    methods: {
        handle_custom_pwa_installation() {
            window.addEventListener("beforeinstallprompt", e => {
                e.preventDefault();

                !this.deferred_prompt && (this.pwa_dialog = true);
                this.deferred_prompt = e;

            });

            // window.addEventListener("appinstalled", () => {
            //     this.deferred_prompt = null;
            //     this.pwa_dialog = false;
            // });
        },

        install_pwa() {
            this.pwa_dialog = false;
            this.deferred_prompt.prompt();
            this.deferred_prompt.userChoice.then(res => {

                // res.outcome == "accepted" &&
                //     this.$cookies.set("APP_INSTALLED", 1, {
                //         path: "/",
                //         maxAge: 86400 * 30
                //     });

                // (this as any).$ga.event(
                //     "pwa",
                //     "installation",
                //     res.platform,
                //     res.outcome
                // );
            });
        }
    },
  }
</script>