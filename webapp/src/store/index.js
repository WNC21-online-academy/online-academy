import * as _ from 'lodash';
import { reactive, readonly } from 'vue'
import { fetchAll } from '../services/categories.service'
import * as contants from '../utils/contants';

const state = reactive({
  authenticated: !!(localStorage.onlineAcademy_refreshToken && localStorage.onlineAcademy_accessToken && Date.now() < localStorage.onlineAcademy_expiresIn),
  user: JSON.parse(localStorage.onlineAcademy_user || null),
  categories: []
})

const methods = {
  setAuthenticated(value) {
    state.authenticated = value
  },
  setUser(user) {
    state.user = user
  },
  setCategories(payload) {
    state.categories = payload
  },
  async loadCategories() {
    const result = await fetchAll()
    state.categories = result?.list
  }
}

const getters = {
  isAdmin() {
    return state.user?.role === contants.ADMIN_ROLE
  },
  isTeacher() {
    return state.user?.role === contants.TEACHER_ROLE
  },
  isStudent() {
    return state.user?.role === contants.STUDENT_ROLE
  },
  menu() {
    const groups = _.groupBy(state.categories, 'id_parent')
    const menu = groups[null] || []
    return _.map(menu.reverse(), item => ({ ...item, children: groups[item.id] }));
  },
  categoryChildren() {
    return _.filter(state.categories, item => item.id_parent)
  },
  categoryNameById(id) {
    return _.find(state.categories, { 'id': +id })?.name
  }
}

export default {
  state: readonly(state),
  methods,
  getters
}