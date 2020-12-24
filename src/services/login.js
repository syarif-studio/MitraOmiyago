import api from './api'

export default {
  userLoginEmail  : async(data) => api.post('login_email',{
      userName: 'beta',
      keyCode: 'beta12345',
      Email: data.user,
      Password: data.password
  }),
  userLoginPonsel : async(data) => api.post('login_ponsel',{
    userName: 'beta',
    keyCode: 'beta12345',
    Phone: data.user,
    OTP: data.password
  }),
  userLoginGoogle: async(data) => api.post('login_google_mobile', {
    id_google: data.id_google,
    email: data.email,
    name: data.name,
  }),
  resetPassword : async(Account) => api.post('code_reset_password',{
    userName: 'beta',
    keyCode: 'beta12345',
    Account
  }),
  checkResetCode : async(Account) => api.post('cek_code_password',{
    userName: 'beta',
    keyCode: 'beta12345',
    Account
  }),
  changePassword : async(userId, Password) => api.post('reset_password',{
    userName: 'beta',
    keyCode: 'beta12345',
    userId,
    Password
  }),
  sendOtp : async(ponsel) => api.get(`send_otp/demo/fe01ce2a7fbac8fafaed7c982a04e229T2ZmaWNlT21peWFnbw==dfiu6aewruif3Kdl4395lkjLKdfg043Ar33gs0i22MyDad/${ponsel}/login`),

}