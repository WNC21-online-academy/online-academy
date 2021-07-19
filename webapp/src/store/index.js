import * as _ from 'lodash';
import { reactive, readonly } from 'vue'
const state = reactive({
  categories: [],
})

const methods = {
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
    return _.filters(categories, item => item.id_parent)
  },
}

export default {
  state: readonly(state),
  methods,
  getters
}