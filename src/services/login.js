import api from './api';

export default {
  userLoginEmail: async (data) =>
    api.post('login_email', {
      userName: 'beta',
      keyCode: 'beta12345',
      Email: data.user,
      Password: data.password,
      mitra: 1,
    }),
  userLoginPonsel: async (data) =>
    api.post('login_ponsel', {
      userName: 'beta',
      keyCode: 'beta12345',
      Phone: data.user,
      OTP: data.password,
      mitra: 1,
    }),
  userLoginGoogle: async (data) =>
    api.post('login_google_mobile', {
      id_google: data.id_google,
      email: data.email,
      name: data.name,
      mitra: 1,
    }),
  resetPassword: async (Account) =>
    api.post('code_reset_password', {
      userName: 'beta',
      keyCode: 'beta12345',
      Account,
      mitra: 1,
    }),
  checkResetCode: async (Account) =>
    api.post('cek_code_password', {
      userName: 'beta',
      keyCode: 'beta12345',
      Account,
      mitra: 1,
    }),
  changePassword: async (userId, Password) =>
    api.post('reset_password', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      Password,
      mitra: 1,
    }),
  sendOtp: async (ponsel) =>
    api.get(
      `send_otp/demo/fe01ce2a7fbac8fafaed7c982a04e229T2ZmaWNlT21peWFnbw==dfiu6aewruif3Kdl4395lkjLKdfg043Ar33gs0i22MyDad/${ponsel}/login`
    ),
};
