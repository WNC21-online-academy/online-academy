<template>
  <div
    class="relative flex flex-col sm:flex-row items-end justify-end space-x-4 space-y-4 sm:space-y-0 mt-4 px-5"
  >
    <button
      v-if="enableAdd"
      type="button"
      class="flex flex-none text-white px-3 py-2 rounded font-medium bg-blue-800 hover:bg-blue-600 transition duration-200 each-in-out focus:outline-none"
      @click="onClickBtnAdd"
    >
      <PlusIcon class="mr-1" />Thêm mới
    </button>
    <input
      v-model="state.keyword"
      type="search"
      class="w-full sm:w-auto bg-gray-200 shadow rounded border-0 pl-3 pr-10 py-2 outline-none"
      placeholder="Tìm theo tên..."
      @keyup.enter="onSearch"
    />
    <a class="absolute bottom-2 right-8 text-gray-400 hover:text-gray-700 p-0">
      <SearchIcon @click="onSearch" />
    </a>
  </div>
  <Table
    :fields="props.fields"
    :list="state.list"
    :totalPages="+totalPages"
    :currentPage="+currentPage"
    :enableEdit="enableEdit"
    :enableRead="enableRead"
    :enableRemove="enableRemove"
    :enableRedirectDetail="enableRedirectDetail"
    @onEdit="onShowEditor"
    @onRead="onShowDetail"
    @onRemove="onShowConfirmRemove"
    @onRedirectDetail="onRedirectDetail"
  />

  <component
    :is="detailComponent"
    :showModal="state.showModalDetail"
    :formData="formData"
    :writable="state.writableDetail"
    @toggleModal="onToggleModalDetail"
    @onAdded="onAdded"
    @onUpdated="onUpdated"
  />

  <ConfirmRemove
    :showModal="state.showModalRemove"
    :item="formData"
    :removeItem="removeItem"
    @toggleModal="onToggleModalRemove"
    @onRemoved="onRemoved"
  />
</template>

<script setup>
import { computed, defineProps, onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import PlusIcon from '../Icons/PlusIcon.vue'
import SearchIcon from '../Icons/SearchIcon.vue'
import Table from './Table.vue';
import ConfirmRemove from './Modals/ConfirmRemove.vue'

const router = useRouter()
const route = useRoute()
const perPage = 8
const defaultPage = 1

// props
const props = defineProps({
  fields: Array,
  fetchData: Function,
  removeItem: Function,
  detailComponent: Object,
  enableAdd: Boolean,
  enableEdit: Boolean,
  enableRead: Boolean,
  enableRemove: Boolean,
  enableRedirectDetail: Boolean
})

// State
const state = reactive({
  list: [],
  count: 0,
  keyword: '',
  showModalDetail: false,
  showModalRemove: false,
  writableDetail: false
})

// state
const formData = reactive({})

// Computed
const totalPages = computed(function () {
  return Math.ceil(state.count / perPage)
})
const currentPage = computed(function () {
  return route.query.page || defaultPage
})

// Function get course list 
async function fetchDataToState() {
  if (!props.fetchData) {
    return
  }
  const searchResult = await props.fetchData({
    keyword: route.query.keyword,
    // orderBy: route.query.order_by,
    limit: perPage,
    offset: perPage * (currentPage.value - 1)
  })
  if (searchResult.message) {
    router.push('/404')
  }
  state.list = searchResult.list
  state.count = searchResult.count
}

// events
function resetFormData() {
  Object.keys(formData).forEach(key => formData[key] = null);
}

function onSearch() {
  const { keyword } = state
  router.replace({
    path: route.path,
    query: {
      keyword
    }
  })
}

function onClickBtnAdd() {
  if (props.detailComponent) {
    onToggleWritableDetail(true)
    onToggleModalDetail(true)
  }
  else {
    onRedirectDetail()
  }
}

function onToggleModalDetail(value = false) {
  state.showModalDetail = value
}
function onToggleWritableDetail(value = false) {
  state.writableDetail = value
}

function onToggleModalRemove(value = false) {
  state.showModalRemove = value
}

function onSelectItem(item) {
  Object.assign(formData, item);
}
function onShowEditor(item) {
  onSelectItem(item)
  onToggleModalDetail(true)
  onToggleWritableDetail(true)
}
function onShowDetail(item) {
  onSelectItem(item)
  onToggleModalDetail(true)
}
function onShowConfirmRemove(item) {
  onSelectItem(item)
  onToggleModalRemove(true)
}
function onRedirectDetail(id) {
  router.push(`${route.path}/${id}`)
}

function onAdded(item) {
  Object.assign(formData, item)
  if (state.list.length > perPage) {
    state.list.pop()
  }
  state.list.unshift(item)
}
function onUpdated(item) {
  const itemIndex = state.list.findIndex(child => child.id = item.id)
  if (itemIndex >= 0) {
    state.list[itemIndex] = item
  }
}
function onRemoved(id) {
  if (id) {
    state.list = state.list.filter(item => item.id != id)
  }
}

onMounted(async () => {
  // Get course list
  await fetchDataToState()

  // redirect on invalid page
  if (currentPage.value > totalPages.value) {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        page: undefined
      }
    })
  }
})

// Watch query params to refetch course list
watch(() => route.query, async () => {
  await fetchDataToState()
})
watch(() => state.showModalDetail, () => {
  if (!state.showModalDetail) {
    resetFormData()
    onToggleWritableDetail(false)
    document.body.style.overflow = 'auto'
  }
  else {
    document.body.style.overflow = 'hidden'
  }
})
watch(() => state.showModalRemove, () => {
  if (!state.showModalRemove) {
    resetFormData()
  }
})
</script>
