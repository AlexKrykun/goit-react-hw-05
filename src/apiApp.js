import axios from 'axios';

const ACCESS_KEY = '1XWN_W9s-haZwlQb1qNzuaxtEkx1l-1-dtz2BWXiZZo';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const getRequest = async (searchQuery, page) => {
  const { data } = await axios.get('/search/photos/', {
    params: {
      client_id: ACCESS_KEY,
      query: searchQuery,
      per_page: 10,
      page,
    },
  });

  return data;
};