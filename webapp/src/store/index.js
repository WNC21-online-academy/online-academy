import * as _ from 'lodash';
import { reactive, readonly } from 'vue'
import { getCategories } from '../services/categories.service'

const state = reactive({
  authenticated: !!(localStorage.onlineAcademy_refreshToken && localStorage.onlineAcademy_accessToken && Date.now() < localStorage.onlineAcademy_expiresIn),
  user: JSON.parse(localStorage.onlineAcademy_user || null),
  categories: await getCategories()
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
  }
}

const getters = {
  menu() {
    const groups = _.groupBy(state.categories, 'id_parent')
    const menu = groups[null];
    return _.map(menu, item => ({ ...item, children: groups[item.id] }));
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