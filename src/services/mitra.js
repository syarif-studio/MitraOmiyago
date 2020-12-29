import api from './api';

export default {
  discount: async (userId) =>
    api.post('mitra/discount', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
    }),
};
