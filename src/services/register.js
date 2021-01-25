import api from './api';
import config from '../config';

export default {
  userRegisterEmail: async (data) => api.post('register_email', data),
  userRegisterPonsel: async (data) => api.post('register_ponsel', data),
};
