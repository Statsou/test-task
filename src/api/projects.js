import axios from '@/api/axios';

const getProjects = (apiUrl) => {
  return axios
    .get(apiUrl)
    .then((response) => response)
    .catch((error) => console.error('Ошибка при получении данных:', error));
};

export default {
  getProjects,
};
