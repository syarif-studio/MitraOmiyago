import api from './api'

export default {
  getVariant  : async(productId) => api.post('product_variant',{
    userName: 'beta',
    keyCode: 'beta12345',
    productId
  }),
  getNewProduct  : async() => api.post('product_terbaru',{
    userName: 'beta',
    keyCode: 'beta12345',
  }),
  getFlashSale : async() => api.post('flash_sale',{
    userName: 'beta',
    keyCode: 'beta12345'
  }),
  getCategoryProduct  : async(idCategory) => api.post('product_category',{
      userName: 'beta',
      keyCode: 'beta12345',
      idCategory
  }),
  getSubCategoryProduct: async(parentCategory) => api.post('sub_category', {
    userName: 'beta',
    keyCode: 'beta12345',
    parentCategory
  }),
  getPopulerProduct  : async() => api.post('product_populer',{
      userName: 'beta',
      keyCode: 'beta12345',
  }),
  getRecomendasiProduct  : async() => api.post('product_recomendasi',{
    userName: 'beta',
    keyCode: 'beta12345',
  }),
}