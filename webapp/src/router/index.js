import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { refreshAccessToken } from '../services/auth.service';

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  const accessToken = localStorage.onlineAcademy_accessToken
  const expiresIn = localStorage.onlineAcademy_expiresIn
  const refreshToken = localStorage.onlineAcademy_refreshToken
  const authenticated = !!(refreshToken && accessToken && Date.now() < expiresIn)
  const expired = Date.now() > expiresIn - 3000

  if ((authenticated && expired) || (!authenticated && refreshToken && accessToken)) {
    const tokens = await refreshAccessToken({ refreshToken, accessToken })
    if (!tokens.message) {
      localStorage.onlineAcademy_accessToken = tokens.accessToken
      localStorage.onlineAcademy_expiresIn = Date.now() + tokens.expiresIn
    }
  }

  if (to.meta.auth === true && !authenticated) {
    return next('/sign-in')
  }
  if (to.meta.auth === false && authenticated) {
    return next('/')
  }
  next()
})

export default router