<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
defineProps<{
  title: string
  icon: string
  iconDescription: string
  path: string
}>()
const getImageUrl = (path: string) => {
  return new URL('../../' + path, import.meta.url).href
}
</script>
<template>
  <div
    class="flex flex-col w-max md:w-5/12 h-80 gap-5 items-center justify-center drop-shadow bg-slate-100 hover:bg-slate-200 cursor-pointer"
    @click="router.push($props.path)"
  >
    <img class="w-1/5" :src="getImageUrl($props.icon)" :alt="$props.iconDescription" />
    <h2 class="font-normal text-4xl">{{ $props.title }}</h2>
  </div>
</template>
