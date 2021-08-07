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
  const response = await axiosInstance.get('/courses', { params });
  if (response.status = 200) {
    const { data } = response;
    return data;
  }
  return null;
}

export const fetchById = async ({ courseId }) => {
  const response = await axiosInstance.get(`/courses/${+courseId}`);
  if (response.status = 200) {
    const { data } = response;
    return data;
  }
  return null;
}
