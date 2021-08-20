import { axiosInstance } from './base.service';

export const fetchAllStudent = async ({ keyword, limit, offset } = {}) => {
  const params = {
    keyword,
    limit,
    offset
  }
  const response = await axiosInstance.get('/users/students', { params });
  if (response.status = 200) {
    const { data } = response;
    return data
  }
  return null;
}
export const fetchAllTeacher = async ({ keyword, limit, offset } = {}) => {
  const params = {
    keyword,
    limit,
    offset
  }
  const response = await axiosInstance.get('/users/teachers', { params });
  if (response.status = 200) {
    const { data } = response;
    return data
  }
  return null;
}

export const fetchById = async ({ id } = {}) => {
  const response = await axiosInstance.get(`/users/${id}`);
  if (response.status = 200) {
    const { data } = response;
    return data
  }
  return null;
}

export const addOrUpdate = async data => {
  try {
    const { id, role, fullname, email, password, lock } = data;
    const payload = { role, fullname, email, password, lock };
    let response;

    if (id > 0) {
      response = await axiosInstance.put(`/users/${id}`, payload);
    }
    else {
      response = await axiosInstance.post('/users', payload);
    }

    if (response.status = 200) {
      const { data } = response;
      return data;
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

export const remove = async ({ id }) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    if (response.status = 200) {
      const { data } = response;
      return { id: data };
    }
  } catch (error) {
    return {
      message: "Lỗi người dúng cò ràng buộc khóa học, không thể xóa."
    }
  }
}

export const changePassword = async data => {
  try {
    const { oldPw, newPw } = data;
    const payload = { oldPw, newPw };
    const response = await axiosInstance.put(`/users/change-pw`, payload);

    if (response.status = 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        message: "Sai mật khẩu"
      }
    }
    return {
      message: "Lỗi hệ thống"
    }
  }
}

export const updateProfile = async data => {
  try {
    const { fullname, email, avatar } = data;
    const formData = new FormData;
    formData.append('fullname', fullname)
    formData.append('email', email)
    formData.append('avatar', avatar)
    const response = await axiosInstance.put(`/users/profile`, formData);

    if (response.status = 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    return {
      message: "Lỗi hệ thống"
    }
  }
}