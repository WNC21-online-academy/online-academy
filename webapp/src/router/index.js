import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import useRefreshToken from '../utils/refresh-token'

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  window.scrollTo(0, 0)
  
  const { authenticated } = await useRefreshToken()

  if (to.meta.auth === true && !authenticated) {
    return next('/sign-in')
  }
  if (to.meta.auth === false && authenticated) {
    return next('/')
  }
  next()
})

export default router