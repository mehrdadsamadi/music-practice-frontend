<template>
    <div class="h-100">
        <div class="ellipse-1 secondary rounded-circle"></div>
        <div class="d-flex flex-column justify-center gap-4 h-100">
            <signup @complete="step++" :step="step"></signup>
            <setPassword @complete="step++" :step="step"></setPassword>
            <setUserInfo :step="step"></setUserInfo>
        </div>
        <div class="ellipse-2 secondary rounded-circle"></div>
    </div>
</template>

<script>
import signup from "@/components/auth/signup.vue"
import setPassword from "@/components/auth/setPassword.vue"
import setUserInfo from "@/components/auth/setUserInfo.vue"

export default {
    name: "authPage",
    components: {
        signup,
        setPassword,
        setUserInfo,
    },
    data() {
        return {
            step: 1
        }
    },

    created() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

        } else {
            return this.prompt({title: "خطا", message: "برای استفاده از این اپلیکیشن ، با موبایل خود وارد شوید", show_btn: false})
        }
    },
}
</script>

<style scoped>
    .ellipse-1 {
        position: absolute;
        width: 634px;
        height: 634px;
        left: -240px;
        top: -358px;
        opacity: 0.5;
        z-index: 0;
    }
    .ellipse-2 {
        position: absolute;
        width: 634px;
        height: 634px;
        left: 0px;
        top: 569px;
        opacity: 0.5;
        z-index: 0;
    }
</style>