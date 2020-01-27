import moment from 'moment';

export const ApiAddresses = {
  signupApi: '/api/users/',
  sendOtp: '/api/otp',
  verifyOtp: '/api/otp/validate',
  resendOtp: '/api/otp/retry/',
  getWarehouses: '/api/warehouses/',
  getOrderDetails: '/api/orders/',
  addRemarks: '/api/orders/',
  addImages: '/api/pod',
  addWave: '/api/orders/',
  getOrders: '/api/orders',
  getAllIssueReasons: '/api/reasons/',
  // setOrdersStatusAction: '/api/podAction/',
  getOrderPhones: '/api/orders/',
  getOrderProducts: '/api/orders/',
  sendDeliveryOtp: '/api/delivery/otp',
  verifyDeliveryOtp: '/api/delivery/otp/validate',
  saveProductIssues: '/api/orders/',
  updateOrder: '/api/orders/',
  deliveryIssue: 'api/orders/',
  events: '/api/events',
  fetchConfig: `/api/app_config?name=`,
  saveAssets: (orderId) => `/api/orders/${orderId}/assets`,
  getAssetsType: `/api/assets`
}

export const DefaultParams = {
  getOrders: {
    daNumber: '',
    orderNumber: '',
    status: 'all',
    targetDeliveryDate: moment().format('DD-MM-YYYY') ,
    waveId: 0,
    withImagesOnly: 'false',
    openWavesOnly: 'true',
    warehouseId: 0,
    codOnly: 'false',
    withQuantityIssues: 'all'
  }
};