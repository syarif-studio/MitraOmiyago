import api from './api';

export default {
  getFlashSale: async () =>
    api.post('flash_sale', {
      userName: 'beta',
      keyCode: 'beta12345',
      mitra: 1,
    }),
};
