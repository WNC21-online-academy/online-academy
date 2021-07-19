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

export const getTopEnroll = async () => {
  return getTop('/courses/top/enroll')
}

export const getTopRelated = async () => {
  return getTop('/courses/top/related')
}
