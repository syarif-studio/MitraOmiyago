import axios from 'axios';
import querystring from 'qs';
import config from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';

const { BASE_URL } = config;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3600000,
  headers: {
    Accept: 'application/json',
  },
  paramsSerializer: (params) => querystring.stringify(params),
});

export default {
  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} form
   */
  put: async (url, form = {}, json = {}) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    api.defaults.headers.common['Content-Type'] = json
      ? 'application/json'
      : 'application/x-www-form-urlencoded';
    const data = querystring.stringify(form) || json;
    return api
      .put(url, data, {
        params: querystring.stringify(form),
        baseURL: config.BASE_URL,
      })
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} param query params
   */
  get: async (url, customConfig = {}, params = {}) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    return api
      .get(url, {
        baseURL: config.BASE_URL,
        params,
        ...customConfig,
      })
      .then(async (response) => {
        if (response.data.login == 0) {
          Toast.show({
            text: 'Token Expired !',
            buttonText: 'Login',
            type: 'danger',
            duration: 5000,
          });
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('userData');
          return Promise.resolve(response.data);
        } else {
          return Promise.resolve(response.data);
        }
      })
      .catch((err) => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} form
   * @param {Object} reqConfig  custom config for request
   */
  post: async (url, json = {}) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      api.defaults.headers.Data = 'Office';
      api.defaults.headers.Secret = 'b42234d7f698e16bdf441a9ae89a3e14';
    }
    // return api.post(url, data, {
    // 	params: querystring.stringify(form),
    // 	baseURL: config.BASE_URL,
    // 	...reqConfig,
    // }).then(response => Promise.resolve(response.data))
    // 	.catch(err => Promise.reject(err))
    return api
      .post(config.BASE_URL + url, json)
      .then(async (response) => {
        if (response.data.login == 0) {
          Toast.show({
            text: 'Token Expired !',
            buttonText: 'Login',
            type: 'danger',
            duration: 5000,
          });
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('userData');
          return Promise.resolve(response.data);
        } else {
          return Promise.resolve(response.data);
        }
      })
      .catch((err) => {
        Promise.reject(err);
      });
  },

  /**
   * Send request with Content-Type multipart/form
   * used to upload file
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} data
   */
  postData: async (url, data = {}, customConfig = {}) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    api.defaults.headers['Content-Type'] = 'multipart/form-data';
    api.defaults.timeout = 30000;
    const formData = new FormData();
    const keys = Object.keys(data);
    keys.forEach((key) => {
      formData.append(key, data[key]);
    });
    return api
      .post(url, formData, {
        ...customConfig,
      })
      .then(async (response) => {
        if (response.data.login == 0) {
          Toast.show({
            text: 'Token Expired !',
            buttonText: 'Login',
            type: 'danger',
            duration: 5000,
          });
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('userData');
          return Promise.resolve(response.data);
        } else {
          return Promise.resolve(response.data);
        }
      })
      .catch((err) => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   */
  delete: async (url, json = {}) => {
    const token = await AsyncStorage.getItem('accessToken');
    api.defaults.headers.Authorization = `jwt ${token}`;
    const data = json;
    return api
      .delete(url, {
        data,
        baseURL: config.BASE_URL,
      })
      .then((response) => Promise.resolve(response.data))
      .catch((err) => Promise.reject(err));
  },
};
