import api from './api'

export default {
  getWishlist  : async(userId) => api.post('wishlist',{
    userName: 'beta',
    keyCode: 'beta12345',
    userId
  }),
  addWishlist  : async(userId, productId) => api.post('add_wishlist',{
    userName: 'beta',
    keyCode: 'beta12345',
    userId,
    productId
  }),
  removeWishlist  : async(wishlistId) => api.post('remove_wishlist',{
    userName: 'beta',
    keyCode: 'beta12345',
    wishlistId
  }),
}