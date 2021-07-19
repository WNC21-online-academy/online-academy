import { axiosInstance } from './base.service';

export const getCategories = async () => {
  const response = await axiosInstance.get('/categories');
  if (response.status = 200) {
    const { data } = response;
    return data
  }
  return null;
}