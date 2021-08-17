import { logout, parseJwt, refreshAccessToken } from '../services/auth.service'

export default async function () {
  let accessToken, expiresIn, refreshToken, expired

  function checkAuth() {
    accessToken = localStorage.onlineAcademy_accessToken
    expiresIn = localStorage.onlineAcademy_expiresIn
    refreshToken = localStorage.onlineAcademy_refreshToken
    expired = Date.now() > expiresIn - 3000
    return !!(refreshToken && accessToken && Date.now() < expiresIn)
  }

  const authenticated = checkAuth()

  if ((authenticated && expired) || (!authenticated && refreshToken && accessToken)) {
    const result = await refreshAccessToken({ refreshToken, accessToken })
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

  return { authenticated: checkAuth() }
}