import * as _ from 'lodash';
import { axiosInstance } from './base.service';

export const fetchByCourse = async ({ id, keyword, limit, offset }) => {
  try {
    const params = {
      keyword,
      // order_by: orderBy,
      limit,
      offset
    }
    const response = await axiosInstance.get(`/rating/belong-to/${id}`, { params });
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

export const add = async data => {
  try {
    const { id_course, score, comment } = data;
    const payload = { id_course, score, comment }
    const response = await axiosInstance.post('/rating', payload);

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

