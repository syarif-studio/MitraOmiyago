import api from './api';

export default {
  getPoint: async (userId) =>
    api.post('point_user', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      mitra: 1,
    }),
  usePoint: async (data) =>
    api.post('use_point', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId: data.userId,
      nominal: data.nominal,
      type: 'order',
      mitra: 1,
    }),
  unusePoint: async (userId) =>
    api.post('unuse_point', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId: userId,
      type: 'order',
      mitra: 1,
    }),
};
