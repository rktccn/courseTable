<template>
    <div class="app">
        <!-- <transition name="zoom-in">
            <router-view></router-view>
        </transition> -->

        <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transitionName || 'zoom-in'" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import { useCourseStore } from '@/store/course'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseStore = useCourseStore()
courseStore.initCourse()
</script>

<style lang="scss">
.app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>
