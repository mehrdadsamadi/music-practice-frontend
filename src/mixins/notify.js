export default {
    methods: {
        /**
         * Show the small snackbar at the bottom of the page
         *
         * @param content html content message
         * @param color material color name
         * @param timeout when to close snackbar in milisecounds
         */
        notify(content, color = "primary", timeout = 5000) {
            this.$store.commit("set_data", {
                key: "snackbar",
                data: { content, show: true, color, timeout }
            });
        },

        /**
         * Show the prompt dialog to the user and
         * resolve promise if user accept that
         *
         * @param options options of prompt
         */
        prompt(options = {}) {
            return new Promise(resolve => {
                this.$store.commit("set_data", {
                    key: "prompt",
                    data: this.get_prompt_options(options, resolve)
                });
            });
        },

        /**
         * return prompt options with some default values
         *
         * @param options options of prompt
         * @param resolve resolve closure of promise
         */
        get_prompt_options(options, resolve) {
            return {
                title: options.title || "برای انجام این فرآیند مطمین هستید ؟",
                message: options.message,
                accept_btn: options.accept_btn || "بله",
                reject_btn: options.reject_btn || "خیر",
                resolve,
                show: true
            };
        }
    }
}