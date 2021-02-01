import api from './api';

export default {
  getNewProduct: async () =>
    api.post('product_terbaru', {
      userName: 'beta',
      keyCode: 'beta12345',
      mitra: 1,
    }),
  getOmiyagoProduct: async () =>
    api.post('product_category', {
      userName: 'beta',
      keyCode: 'beta12345',
      idCategory: 56,
      mitra: 1,
    }),
  getPopulerProduct: async () =>
    api.post('product_populer', {
      userName: 'beta',
      keyCode: 'beta12345',
      mitra: 1,
    }),
  getRecomendasiProduct: async () =>
    api.post('product_recomendasi', {
      userName: 'beta',
      keyCode: 'beta12345',
    }),
  getFlashSale: async () =>
    api.post('flash_sale', {
      userName: 'beta',
      keyCode: 'beta12345',
      mitra: 1,
    }),
  getAllProduct: async () =>
    api.get(
      'all_product/demo/fe01ce2a7fbac8fafaed7c982a04e229T2ZmaWNlT21peWFnbw==dfiu6aewruif3Kdl4395lkjLKdfg043Ar33gs0i22MyDad'
    ),
  getPlatform: async () => api.get('platform  '),
  getCart: async (userId) =>
    api.post('cart', {
      userName: 'beta',
      keyCode: 'beta12345',
      userId,
      mitra: 1,
    }),
};
