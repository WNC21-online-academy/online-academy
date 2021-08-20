import * as _ from 'lodash';
import { axiosInstance } from './base.service';

export const fetchById = async ({ id }) => {
  const response = await axiosInstance.get(`/lessons/${+id}`);
  if (response.status = 200) {
    const { data } = response;
    return data;
  }
  return null;
}

export const fetchAllByCourse = async ({ id, keyword, limit, offset }) => {
  try {
    const params = {
      keyword,
      // order_by: orderBy,
      limit,
      offset
    }
    const response = await axiosInstance.get(`/lessons/belong-to/${id}`, { params });
    if (response.status = 200) {
      const { data } = response;
      return data;
    }
    return null;
  } catch (error) {
    if (error?.response?.status === 401) {
      return {
        message: "Không đủ quyền"
      }
    }
    return {
      message: "Lỗi hệ thống"
    }
  }
}

export const remove = async ({ id }) => {
  try {
    const response = await axiosInstance.delete(`/lessons/${id}`);
    if (response.status = 200) {
      const { data } = response;
      return { id: data };
    }
  } catch (error) {
    return {
      message: "Lỗi bài học cò ràng buộc, không thể xóa."
    }
  }
}

export const addOrUpdate = async data => {
  try {
    const { id, title, id_course, sort_order, description, is_draft } = data;
    const payload = { title, id_course, sort_order: +sort_order, description, is_draft }
    let response;

    if (id > 0) {
      response = await axiosInstance.put(`/lessons/${id}`, payload);
    }
    else {
      response = await axiosInstance.post('/lessons', payload);
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


export const uploadVideo = async (data, onUploadProgress) => {
  try {
    const { id, video } = data;
    const formData = new FormData;
    formData.append('video', video)
    const response = await axiosInstance.put(`/lessons/${id}/video`,
      formData,
      {
        onUploadProgress
      });
    if (response.status = 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    return {
      message: error.response.message || "Lỗi hệ thống"
    }
  }
}