<template>
    <div class="h-100">
        <div class="ellipse-1 secondary rounded-circle"></div>
        <div class="d-flex justify-center align-center h-100">
            <signin></signin>
        </div>
        <div class="ellipse-2 secondary rounded-circle"></div>
    </div>
</template>

<script>
import signin from "@/components/auth/signin.vue"

export default {
    name: "loginPage",
    components: {
        signin,
    },
    data() {
        return {
            
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