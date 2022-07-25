<template>
    <div class="w-full" @scroll="scrollList">
        <div
            class="week flex justify-between snap-proximity snap-x overflow-scroll scroll-smooth"
            id="weekList"
        >
            <div
                class="flex flex-col mx-4"
                :class="{
                    grayscale: day < currentWeek,
                    ' brightness-90': day > currentWeek
                }"
                v-for="(day, index) in totalWeeks"
                :key="index"
                @click="setToCenter(index)"
            >
                <div
                    class="p-6 snap-start relative bg-secondary rounded-full hover:brightness-110 hover:cursor-pointer text-primary"
                >
                    <span class="week-info flex flex-col items-center absolute">
                        <p class="font-semibold brightness-70">{{ day }}</p>
                        <p class="text-xs leading-3">周</p>
                    </span>
                </div>

                <ul class="day-list flex justify-between w-full mt-1">
                    <li class="bg-secondary rounded-full"></li>
                    <li class="bg-primary rounded-full"></li>
                    <li class="bg-primary rounded-full"></li>
                    <li class="bg-primary rounded-full"></li>
                    <li class="bg-primary rounded-full"></li>
                    <li class="bg-secondary rounded-full"></li>
                    <li class="bg-secondary rounded-full"></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue'
import { useAppStore } from '@/store/app'
import { useCourseStore } from '@/store/course'
import { storeToRefs } from 'pinia'

export default defineComponent({
    name: 'WeekTable',
    setup() {
        const appStore = useAppStore()
        const courseStore = useCourseStore()
        let EList: Element | null = null

        let currentWeek = computed<number>({
            get: (): number => {
                return appStore.currentWeek
            },
            set: (value: number) => {
                appStore.setCurrentWeek(value)
            }
        })

        const { totalWeeks } = storeToRefs(courseStore)

        const setToCenter = (index: number) => {
            let el = EList?.children[index]

            if (!el) return
            currentWeek.value = index + 1

            el.scrollIntoView({
                behavior: 'smooth',
                inline: 'center'
            })
        }

        const scrollList = (e: any) => {
            e.preventDefault()
        }

        onMounted(() => {
            EList = document.querySelector('#weekList')
        })

        return {
            setToCenter,
            scrollList,
            currentWeek,
            totalWeeks
        }
    }
})
</script>

<style lang="scss" scoped>
.week {
    width: 100%;
    height: 100%;

    -webkit-overflow-scrolling: touch;
    user-select: none;

    &::-webkit-scrollbar {
        display: none;
    }

    &-info {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.day-list {
    li {
        padding: 3px;
    }
}
</style>
