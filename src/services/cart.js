import api from './api'

export default {
  getCart  : async(userId) => api.post('cart',{
    userName: 'beta',
    keyCode: 'beta12345',
    userId
  }),
  addToCart  : async(data) => api.post('add_cart',{
    userName : 'beta',
    keyCode  : 'beta12345',    
    userId   : data.userId,
    productId: data.productId, 
    Qty      : data.qty,
    variantId: data.variantId 
  }),
  removeFromCart  : async(data) => api.post('remove_cart',{
    userName : 'beta',
    keyCode  : 'beta12345',    
    userId   : data.userId,
    cartItem : data.cartItem, 
  }),
}