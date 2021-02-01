import api from './api';

export default {
  getHistory: async (userId) =>
    api.post('history_transaction', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      mitra: 1,
    }),
};
