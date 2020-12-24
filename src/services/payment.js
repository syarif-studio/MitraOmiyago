import api from './api'

export default {
  getPayment  : async() => api.post('payment',{
    userName: 'beta',
    keyCode: 'beta12345',
    paymentId: 0
  }),
  processPayment  : async(userId, paymentId) => api.post('payment_process',{
    userName: 'beta',
    keyCode: 'beta12345',
    userId,
    paymentId,
  }),
  processTransaction  : async(userId) => api.post('process_transaction',{
    userName: 'beta',
    keyCode: 'beta12345',
    userId
  }),
}