<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">پیام ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "userMessagePage",
    created() {
        axios.patch(`user/message/seen/${this.$store.state.user._id}`)
            .then(({data}) => {
                this.$store.dispatch("loginUser")
                this.timeOut = setTimeout(() => {
                    this.$store.dispatch("checkUnreadMessages")
                }, 500);
            })
            .catch(err => this.handle_error(err))
    },
    beforeDestroy() {
        clearTimeout(this.timeOut)
    },
    data() {
        return {
            timeOut: null,
        }
    },
}
</script>

<style>

</style>