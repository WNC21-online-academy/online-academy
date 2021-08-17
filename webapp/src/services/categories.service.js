import { axiosInstance } from './base.service';

export const fetchAll = async ({ keyword, limit, offset } = {}) => {
  const params = {
    keyword,
    limit,
    offset
  }
  const response = await axiosInstance.get('/categories', { params });
  if (response.status = 200) {
    const { data } = response;
    return data
  }
  return null
}

export const addOrUpdate = async data => {
  try {
    const { id, name, id_parent } = data;
    const payload = { name, id_parent };
    let response;

    if (id > 0) {
      response = await axiosInstance.put(`/categories/${id}`, payload);
    }
    else {
      response = await axiosInstance.post('/categories', payload);
    }

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

export const remove = async ({ id }) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    if (response.status = 200) {
      const { data } = response;
      return { id: data };
    }
  } catch (error) {
    return {
      message: "Lỗi lĩnh vực đã có khóa học, không thể xóa."
    }
  }
}