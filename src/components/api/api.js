
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
// const API_KEY = '39403201-abd58df21a454f128cd9be12a';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '39403201-abd58df21a454f128cd9be12a',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (searchName, page) => {
  const response = await axios.get(`?q=${searchName}&page=${page}`);
  return response.data;
};

export function needValues(data) {
  return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
    id,
    tags,
    largeImageURL,
    webformatURL,
  }));
}