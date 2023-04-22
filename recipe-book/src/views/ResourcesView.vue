<script setup lang="ts">
import { useResourcesStore } from '@/stores/resources'
import { computed, ref, onMounted } from 'vue'
import type { UNIT } from '@/types'
const resourcesStore = useResourcesStore()

const resources = computed(() => resourcesStore.resources)

onMounted(async () => {
  await resourcesStore.getResources()
})
const loading = ref<boolean>(false)
const creatingResource = ref<boolean>(false)
const resourceName = ref<string>('')
const resourceDescription = ref<string>('')
const resourceAmount = ref<number>(0)
const resourceUnit = ref<UNIT>('PCS')

const canCreate = computed(
  () => !loading.value && resourceName.value.length > 4 && resourceAmount.value > 0
)

const createResource = async () => {
  loading.value = true
  const newResource = {
    name: resourceName.value,
    description: resourceDescription.value,
    amount: resourceAmount.value,
    unit: resourceUnit.value
  }
  console.log(newResource)
  await resourcesStore.addResource(newResource)
  creatingResource.value = false
  loading.value = false
}
</script>
<template>
  <h1 class="text-center w-full text-6xl mb-4">Resources</h1>
  <!--Table of resource-->
  <table class="w-full table-auto border-collapse border border-gray-200">
    <thead
      class="border-b-2 border-gray-200 bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider"
    >
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Amount</th>
        <th class="text-left">Unit</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="resource in resources" :key="resource.id" class="hover:bg-gray-50">
        <td>{{ resource.name }}</td>
        <td>{{ resource.amount }}</td>
        <td>{{ resource.unit }}</td>
      </tr>
    </tbody>
  </table>
  <!--Add new resource modal-->
  <div
    v-if="creatingResource"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-lg p-8 w-1/2">
      <h2 class="text-center text-2xl mb-4">New Resource</h2>
      <form class="flex flex-col gap-4">
        <label class="flex flex-col gap-1">
          <span>Name</span>
          <input v-model="resourceName" class="border-slate-200 border-2 rounded p-1" type="text" />
        </label>
        <label class="flex flex-col gap-1">
          <span>Description</span>
          <textarea v-model="resourceDescription" class="border-slate-200 border-2 rounded p-1" />
        </label>
        <label class="flex flex-col gap-1">
          <span>Quantity</span>
          <input
            v-model="resourceAmount"
            class="border-slate-200 border-2 rounded p-1"
            type="number"
          />
        </label>
        <label class="flex flex-col gap-1">
          <span>Type</span>
          <select v-model="resourceUnit" class="border-slate-200 border-2 rounded p-1">
            <option value="G">G</option>
            <option value="ML">ML</option>
            <option value="PCS">PCS</option>
          </select>
        </label>
        <div class="flex justify-end">
          <button
            type="button"
            :disabled="!canCreate"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:bg-purple-100 disabled:cursor-not-allowed"
            @click="canCreate && createResource()"
          >
            Add
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg ml-4"
            @click="creatingResource = false"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>

  <!--Add new resource button-->
  <span
    class="absolute bottom-6 right-6 w-12 h-12 rounded-full text-center text-4xl bg-purple-500 text-white cursor-pointer"
    @click="creatingResource = true"
  >
    +
  </span>
</template>
