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

export const addOrUpdate = async data => {
  try {
    const { id, role, fullname, email, password } = data;
    const payload = { role, fullname, email, password };
    let response;

    if (!id) {
      response = await axiosInstance.post('/users', payload);
    }
    if (id) {
      response = await axiosInstance.put(`/users/${id}`, payload);
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