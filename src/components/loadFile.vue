<template>
    <div
        class="load-file px-8 py-4 bg-off-base shadow-lg rounded-lg select-none text-base"
    >
        <div class="load-file__box">
            <header class="font-semibold text-base">导入课表</header>
            <div
                class="flex justify-center items-center w-48 h-24 mt-2 outline-dashed rounded-lg text-primary text-center cursor-pointerF"
                @click="loadFile"
            >
                <span> 点击选择文件 </span>
            </div>
            <div>
                <span>fileName</span>
                <span>{{ fileName }}</span>
            </div>
            <RoButton @click="loadData">添加</RoButton>
        </div>
    </div>
</template>

<script lang="ts">
import { useFileSystemAccess } from '@vueuse/core'
import { defineComponent, reactive, toRefs } from 'vue'
import RoButton from './roButton.vue'
// import ical from 'ical'

export default defineComponent({
    name: 'LoadFile',
    setup() {
        const res = useFileSystemAccess({
            types: [
                {
                    accept: {
                        'text/ics': ['.ics']
                    }
                }
            ],
            excludeAcceptAllOption: true
        })

        const str = reactive({
            isSupported: res.isSupported,
            file: res.file,
            fileName: res.fileName,
            fileMIME: res.fileMIME,
            fileSize: res.fileSize,
            fileLastModified: res.fileLastModified,
            fileData: res.data
        })

        const loadFile = () => {
            res.open()
        }

        const loadData = () => {
            // console.log(str.fileData)
            // let dadsad = ical.parseICS(str.fileData)
            // console.log(dadsad)
        }

        return { ...toRefs(str), loadFile, loadData }
    },
    components: { RoButton }
})
</script>

<style lang="scss">
.load-file {
    position: absolute;
    top: 0;
}
</style>
