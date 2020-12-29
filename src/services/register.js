import api from './api';

export default {
  userRegisterEmail: async (data) =>
    api.post('register_email', {
      userName: 'beta',
      keyCode: 'beta12345',
      Name: data.name,
      Email: data.email,
      Password: data.password,
      Phone: data.phone,
      Dob: data.dob,
      mitra: 1,
    }),
  userRegisterPonsel: async (data) =>
    api.post('register_ponsel', {
      userName: 'beta',
      keyCode: 'beta12345',
      Name: data.userName,
      Phone: data.user,
      OTP: data.password,
      mitra: 1,
    }),
};
