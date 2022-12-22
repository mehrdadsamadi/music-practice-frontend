<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">پیام ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <div class="row">
            <template v-if="messages.length">
                <div class="col-12 mb-3" v-for="message in messages" :key="message._id">
                    <div class="d-flex gap-2">
                        <v-avatar color="primary">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                        <v-sheet
                            rounded="xl"
                            width="100%"
                            elevation="2"
                            class="py-3 px-5 opacity-05"
                            :class="{'opacity-1' : !message.seen}"
                        >
                            <div class="d-flex flex-column">
                                <p class="text-muted">{{message.createdAt | calender}}</p>
                                <p v-text="message.message"></p>
                            </div>
                        </v-sheet>
                    </div>
                </div>
            </template>
            <div class="col-12" v-else>
                <v-alert
                    border="left"
                    colored-border
                    type="error"
                    elevation="1"
                >
                    هیچ پیامی نداری
                </v-alert>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import filters from '@/mixins/filters.js';

export default {
    name: "userMessagePage",
    mixins: [filters],
    created() {
        this.seen()
    },
    beforeDestroy() {
        clearTimeout(this.timeOut)
    },
    data() {
        return {
            timeOut: null,
            messages: []
        }
    },
    methods: {
        seen() {
            this.$store.commit("set_state", { group: "loading", field: "show", value: true })

            axios.patch(`user/message/seen/${this.$store.state.user._id}`)
                .then(({data}) => {
                    this.messages = data.data.messages
                    this.$store.dispatch("loginUser")
                    this.timeOut = setTimeout(() => {
                        this.$store.dispatch("checkUnreadMessages")
                    }, 500);
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.$store.commit("set_state", { group: "loading", field: "show", value: false }))
        }
    },
}
</script>

<style scoped>
    .opacity-05 {
        opacity: .5;
    }
    .opacity-1 {
        opacity: 1 !important;
    }
</style>