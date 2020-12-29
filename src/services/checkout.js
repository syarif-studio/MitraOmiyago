import api from './api';
import config from '../config';

export default {
  getCart: async (userId) =>
    api.post('cart', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
    }),
  updateCart: async (userId, dataUpdate, dataType) =>
    api.post('update_cart', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      dataUpdate,
      dataType,
      version: config.VERSION,
    }),
  getAddress: async (userId) =>
    api.post('address', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
    }),
  addAddress: async (userId, dataAddress) =>
    api.post('add_address', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      dataAddress,
    }),
  removeAddress: async (addressId) =>
    api.post('remove_address', {
      userName: 'beta',
      keyCode: 'beta12345',
      addressId,
    }),
  changeAddress: async (addressId, dataAddress) =>
    api.post('edit_address', {
      userName: 'beta',
      keyCode: 'beta12345',
      addressId,
      dataAddress,
    }),
  getLocation: async (dataLokasi) =>
    api.post('location', {
      userName: 'beta',
      keyCode: 'beta12345',
      dataType: 'district',
      dataLokasi,
    }),
  getCourier: async (userId, addressId) =>
    api.post('cost_courier', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      addressId,
    }),
  getCustomer: async (userId) =>
    api.post('customer', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
    }),
};
