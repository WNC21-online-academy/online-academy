<template>
  <div class="flex min-h-screen">
    <div class="container mx-auto">
      <div v-show="!list?.length" class="mx-auto text-gray-400 m-12">Không có dữ liệu</div>
      <div v-show="list?.length" class="mx-auto overflow-auto lg:overflow-visible">
        <table class="table text-gray-400 border-separate space-y-6 mx-auto text-sm">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th v-for="item in fields" class="text-left p-3">{{ item.title }}</th>
              <th class="p-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" class="bg-gray-100">
              <!-- <td class="p-3">
                <div class="flex align-items-center">
                  <img
                    class="rounded-full h-12 w-12 object-cover"
                    src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                    alt="unsplash image"
                  />
                </div>
              </td>-->
              <td
                v-for="field in fields"
                class="p-4 truncate font-semibold text-gray-500"
              >{{ item[field.key] || field.default }}</td>
              <td class="p-4">
                <div class="flex">
                  <a v-if="enableRead" class="text-gray-600 hover:text-gray-400 mr-2">
                    <EyeIcon @click=onClickRead(item) />
                  </a>
                  <a v-if="enableEdit" class="text-gray-600 hover:text-gray-400 mx-2">
                    <PencilIcon @click="onClickEdit(item)" />
                  </a>
                  <a v-if="enableRemove" class="text-gray-600 hover:text-gray-400 ml-2">
                    <TrashIcon @click="onClickRemove(item)" />
                  </a>
                </div>
              </td>
            </tr>
            <!-- <tr class="bg-gray-800">
              <td class="p-3">
                <div class="flex align-items-center">
                  <img
                    class="rounded-full h-12 w-12 object-cover"
                    src="https://images.unsplash.com/photo-1423784346385-c1d4dac9893a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    alt="unsplash image"
                  />
                  <div class="ml-3">
                    <div class>Realme</div>
                    <div class="text-gray-500">mail@rgmail.com</div>
                  </div>
                </div>
              </td>
              <td class="p-3">Technology</td>
              <td class="p-3 font-bold">200.00$</td>
              <td class="p-3">
                <span class="bg-red-400 text-gray-50 rounded-md px-2">no stock</span>
              </td>
              <td class="p-3">
                <a href="#" class="text-gray-400 hover:text-gray-100 mr-2">
                  <i class="material-icons-outlined text-base">visibility</i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-100 mx-2">
                  <i class="material-icons-outlined text-base">edit</i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-100 ml-2">
                  <i class="material-icons-round text-base">delete_outline</i>
                </a>
              </td>
            </tr>
            <tr class="bg-gray-800">
              <td class="p-3">
                <div class="flex align-items-center">
                  <img
                    class="rounded-full h-12 w-12 object-cover"
                    src="https://images.unsplash.com/photo-1600856209923-34372e319a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2135&q=80"
                    alt="unsplash image"
                  />
                  <div class="ml-3">
                    <div class>Samsung</div>
                    <div class="text-gray-500">mail@rgmail.com</div>
                  </div>
                </div>
              </td>
              <td class="p-3">Technology</td>
              <td class="p-3 font-bold">200.00$</td>
              <td class="p-3">
                <span class="bg-yellow-400 text-gray-50 rounded-md px-2">start sale</span>
              </td>
              <td class="p-3">
                <a href="#" class="text-gray-400 hover:text-gray-100 mr-2">
                  <i class="material-icons-outlined text-base">visibility</i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-100 mx-2">
                  <i class="material-icons-outlined text-base">edit</i>
                </a>
                <a href="#" class="text-gray-400 hover:text-gray-100 ml-2">
                  <i class="material-icons-round text-base">delete_outline</i>
                </a>
              </td>
            </tr>-->
          </tbody>
        </table>
        <Pagination class="mt-4 mb-8" :totalPages="totalPages" :currentPage="currentPage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject } from "vue"
import EyeIcon from '../Icons/EyeIcon.vue'
import PencilIcon from '../Icons/PencilIcon.vue'
import TrashIcon from '../Icons/TrashIcon.vue'
import Pagination from '../Grid/Pagination.vue'

const store = inject('store')

// props
defineProps({
  fields: Array,
  list: Array,
  totalPages: Number,
  currentPage: Number,
  enableEdit: Boolean,
  enableRead: Boolean,
  enableRemove: Boolean
})

// emit events
const emit = defineEmit(['onEdit', 'onRead', 'onRemove'])
function onClickEdit(item) {
  emit('onEdit', item)
}
function onClickRead(item) {
  emit('onRead', item)
}
function onClickRemove(id) {
  emit('onRemove', id)
}
</script>

<style>
.table {
  border-spacing: 0 15px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr td:last-child,
tr th:last-child {
  border-radius: 0 0.625rem 0.625rem 0;
}

tr td:nth-child(1),
tr th:nth-child(1) {
  border-radius: 0.625rem 0 0 0.625rem;
}
</style>