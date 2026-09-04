import { offers } from '../data/offers';

export const getOffers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(offers);
    }, 200);
  });
};

// TODO: Replace with real API call when backend is connected
// export const getOffers = async () => {
//   const response = await axios.get('/api/offers');
//   return response.data;
// };
