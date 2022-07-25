<template>
    <div class="">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { useCourseStore } from '@/store/course'

const courseStore = useCourseStore()
courseStore.initCourse()
</script>

<style lang="scss"></style>
