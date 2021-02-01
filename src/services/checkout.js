import api from './api';
import config from '../config';

export default {
  getCart: async (userId) =>
    api.post('cart', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      mitra: 1,
    }),
  updateCart: async (userId, dataUpdate, dataType) =>
    api.post('update_cart', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      dataUpdate,
      dataType,
      version: config.VERSION,
      mitra: 1,
    }),
  getAddress: async (userId) =>
    api.post('address', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      mitra: 1,
    }),
  addAddress: async (userId, dataAddress) =>
    api.post('add_address', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      dataAddress,
      mitra: 1,
    }),
  removeAddress: async (addressId) =>
    api.post('remove_address', {
      userName: 'beta',
      keyCode: 'beta12345',
      addressId,
      mitra: 1,
    }),
  changeAddress: async (addressId, dataAddress) =>
    api.post('edit_address', {
      userName: 'beta',
      keyCode: 'beta12345',
      addressId,
      dataAddress,
      mitra: 1,
    }),
  getLocation: async (dataLokasi) =>
    api.post('location', {
      userName: 'beta',
      keyCode: 'beta12345',
      dataType: 'district',
      dataLokasi,
      mitra: 1,
    }),
  getCourier: async (userId, addressId) =>
    api.post('cost_courier', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      addressId,
      mitra: 1,
    }),
  getBox: async () =>
    api.post('box', {
      userName: 'beta',
      keyCode: 'beta12345',
      boxId: 0,
      mitra: 1,
    }),
  getCustomer: async (userId) =>
    api.post('customer', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      mitra: 1,
    }),
};
