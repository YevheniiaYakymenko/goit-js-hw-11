const API_KEY = '43963855-b23ab28bc2f72f8207f09d24a';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotosByQuery = query => {
  const searchParams = new URLSearchParams({
    key: `${API_KEY}`,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
};
