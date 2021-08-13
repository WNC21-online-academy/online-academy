import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { logout, parseJwt, refreshAccessToken } from '../services/auth.service';

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
    const result = await refreshAccessToken({ refreshToken, accessToken })
    console.log('result :>> ', result);
    if (!result.message) {
      const { accessToken } = result
      localStorage.onlineAcademy_accessToken = accessToken
      const obj = parseJwt(accessToken)
      localStorage.onlineAcademy_expiresIn = obj.exp * 1000 // second to milisecond
    }
    else {
      logout()
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