<template>
    <div>
        <transition name="moveX" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
    name: "homeLayout"
}
</script>

<style>

</style>