<template>
    <div class="">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { useCourseStore } from '@/store/course'

const courseStore = useCourseStore()
for (let i = 0; i < 20; i++) {
    courseStore.weekInfo.push([])
    for (let j = 0; j < 7; j++) {
        courseStore.weekInfo[i].push([])
        for (let k = 0; k < 20; k++) {
            courseStore.weekInfo[i][j].push(null)
        }
    }
}
</script>

<style lang="scss"></style>
