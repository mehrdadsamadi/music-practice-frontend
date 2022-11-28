<template>
    <div class="h-100">
        <div class="ellipse-1 secondary rounded-circle"></div>
        <div class="d-flex flex-column justify-center gap-4 h-100">
            <signup @signup="completeSignup = true" :completeSignup="completeSignup"></signup>
            <setPassword :completeSignup="completeSignup"></setPassword>
        </div>
        <div class="ellipse-2 secondary rounded-circle"></div>
    </div>
</template>

<script>
import signup from "@/components/auth/signup.vue"
import setPassword from "@/components/auth/setPassword.vue"

export default {
    name: "authPage",
    components: {
        signup,
        setPassword,
    },
    data() {
        return {
            completeSignup: false
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