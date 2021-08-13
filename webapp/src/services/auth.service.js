import { axiosInstance } from './base.service';

export const signUp = async data => {
  try {
    const response = await axiosInstance.post('/auth/sign-up', data);
    if (response.status = 200) {
      return {};
    }
  } catch (error) {
    if (error?.response?.status === 409) {
      return {
        message: "Email đã tồn tại"
      }
    }
    return {
      message: "Lỗi hệ thống"
    }
  }
}

export const signIn = async data => {
  try {
    const response = await axiosInstance.post('/auth/sign-in', data);
    if (response.status = 200) {
      const { data } = response
      const obj = parseJwt(data.accessToken)
      localStorage.onlineAcademy_accessToken = data.accessToken
      localStorage.onlineAcademy_expiresIn = obj.exp * 1000 // second to milisecond
      localStorage.onlineAcademy_refreshToken = data.refreshToken
      localStorage.onlineAcademy_user = JSON.stringify({
        id: obj.userId,
        role: obj.role,
        fullname: obj.fullname
      })
      return {
        authenticated: true
      }
    }
    return {
      authenticated: false
    }
  } catch (error) {
    return {
      authenticated: false,
      message: "Lỗi sai thông tin đăng nhập"
    }
  }
}

export const refreshAccessToken = async data => {
  try {
    const response = await axiosInstance.post('/auth/refresh', data);
    if (response.status = 200) {
      const { data } = response
      return data
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const getUserAuth = _ => {
  return JSON.parse(localStorage.onlineAcademy_user)
}

export const logout = _ => {
  localStorage.removeItem('onlineAcademy_accessToken')
  localStorage.removeItem('onlineAcademy_expiresIn')
  localStorage.removeItem('onlineAcademy_refreshToken')
  localStorage.removeItem('onlineAcademy_user')
}