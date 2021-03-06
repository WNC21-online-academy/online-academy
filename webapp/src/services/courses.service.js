import * as _ from 'lodash';
import { axiosInstance } from './base.service';

const getTop = async url => {
  const response = await axiosInstance.get(url);
  if (response.status = 200) {
    const { data } = response;
    return data;
  }
  return null;
}

export const getTopHot = () => {
  return getTop('/courses/top/hot')
}

export const getTopView = async () => {
  return getTop('/courses/top/view')
}

export const getTopNew = async () => {
  return getTop('/courses/top/new')
}

export const getTopWeek = async () => {
  return getTop('/courses/top/week')
}

export const getTopRelated = async () => {
  return getTop('/courses/top/related')
}

export const search = async ({ keyword, categoryId, orderBy, limit, offset }) => {
  const params = {
    keyword,
    category: categoryId,
    order_by: orderBy,
    limit,
    offset
  }
  const response = await axiosInstance.get('/courses/search', { params });
  if (response.status = 200) {
    const { data } = response;
    return data;
  }
  return null;
}

export const fetchById = async ({ id, userId }) => {
  const response = await axiosInstance.get(`/courses/${+id}`, { params: { userId } });
  if (response.status = 200) {
    const { data } = response;
    return data;
  }
  return null;
}

export const fetchAll = async ({ is_suspended, keyword, limit, offset }) => {
  const params = {
    keyword,
    // order_by: orderBy,
    limit,
    offset
  }
  const response = await axiosInstance.get(`/courses?is_suspended=${is_suspended}`, { params });
  if (response.status = 200) {
    const { data } = response;
    return data;
  }
  return null;
}

export const fetchAllByTeacher = async ({ keyword, limit, offset }) => {
  try {
    const params = {
      keyword,
      // order_by: orderBy,
      limit,
      offset
    }
    const response = await axiosInstance.get(`/courses/by-creator`, { params });
    if (response.status = 200) {
      const { data } = response;
      return data;
    }
    return null;
  } catch (error) {
    if (error?.response?.status === 401) {
      return {
        message: "Kh??ng ????? quy???n"
      }
    }
    return {
      message: "L???i h??? th???ng"
    }
  }
}

export const fetchAllByWatchlist = async ({ limit, offset }) => {
  try {
    const params = {
      limit,
      offset
    }
    const response = await axiosInstance.get(`/courses/watchlist`, { params });
    if (response.status = 200) {
      const { data } = response;
      return data;
    }
    return null;
  } catch (error) {
    if (error?.response?.status === 401) {
      return {
        message: "Kh??ng ????? quy???n"
      }
    }
    return {
      message: "L???i h??? th???ng"
    }
  }
}

export const fetchAllJoined = async ({ limit, offset }) => {
  try {
    const params = {
      limit,
      offset
    }
    const response = await axiosInstance.get(`/courses/joined`, { params });
    if (response.status = 200) {
      const { data } = response;
      return data;
    }
    return null;
  } catch (error) {
    if (error?.response?.status === 401) {
      return {
        message: "Kh??ng ????? quy???n"
      }
    }
    return {
      message: "L???i h??? th???ng"
    }
  }
}

export const addOrUpdate = async data => {
  try {
    const { id, id_category, name, description, content, thumbnail, tutition, is_completed, is_draft } = data;
    const formData = new FormData;
    formData.append('id_category', id_category)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('content', content)
    formData.append('thumbnail', thumbnail)
    formData.append('tutition', tutition)
    formData.append('is_completed', is_completed || false)
    formData.append('is_draft', is_draft || false)
    let response;

    if (id > 0) {
      response = await axiosInstance.put(`/courses/${id}`, formData);
    }
    else {
      response = await axiosInstance.post('/courses', formData);
    }

    if (response.status = 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    return {
      message: "L???i h??? th???ng"
    }
  }
}

export const suspend = async data => {
  try {
    const { id, is_suspended } = data;
    const payload = { is_suspended }
    const response = await axiosInstance.put(`/courses/${id}`, payload);

    if (response.status = 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    return {
      message: "L???i h??? th???ng"
    }
  }
}

export const remove = async ({ id }) => {
  try {
    const response = await axiosInstance.delete(`/courses/${id}`);
    if (response.status = 200) {
      const { data } = response;
      return { id: data };
    }
  } catch (error) {
    return {
      message: "L???i kh??a h???c c?? r??ng bu???c kh??a h???c, kh??ng th??? x??a."
    }
  }
}

export const addWatchlist = async data => {
  try {
    const { id } = data;

    const response = await axiosInstance.post(`/courses/${id}/watchlist`);
    if (response.status = 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    return {
      message: "Ch??a ????ng nh???p"
    }
  }
}

export const removeWatchlist = async ({ id }) => {
  try {
    const response = await axiosInstance.delete(`/courses/${id}/watchlist`);
    if (response.status = 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    return {
      message: "L???i r??ng bu???c, kh??ng th??? x??a."
    }
  }
}

export const joinCourse = async data => {
  try {
    const { id } = data;

    const response = await axiosInstance.post(`/courses/${id}/join`);
    if (response.status = 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    return {
      message: "Ch??a ????ng nh???p"
    }
  }
}