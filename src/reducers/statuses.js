import { fromPairs, map, mergeDeepRight as merge } from 'ramda';

import actionTypes from '../actions/actionTypes';
import * as symbols from '../operations/symbols';

const initStatus = {
  status: symbols.STATUS_INIT,
  errors: null,
};
const initialState = fromPairs(map((s) => [s, initStatus], [
  'login',
  'logout',
  'orderDetailImages',
  'sendOtp',
  'resendOtp',
  'verifyOtp',
  'getWarehouses',
  'getOrderDetails',
  'addRemarks',
  'uploadImages',
  'addWave',
  'getOrders',
  'reUploadWave',
  'orderStatusAction',
  'getOrderPhones',
  'sendDeliveryOtp',
  'resendDeliveryOtp',
  'verifyDeliveryOtp',
  'getAllIssueReasons',
  'getOrderProducts',
  'saveProductIssues',
  'updateOrder',
  'deleteProductIssues',
  'getDeliveryIssueReasons',
  'cancelDeliveryIssue',
  'invoiceImageUplaod',
  'imageCompression',
  'getOrderAssets'
]));

function begin(state, name) {
  return merge(state, {
    [name]: {
      status: symbols.STATUS_BEGIN,
      errors: null,
    }
  });
}

function success(state, name) {
  return merge(state, {
    [name]: {
      status: symbols.STATUS_DONE,
      errors: null,
    }
  });
}

function fail(state, name, errors) {
  return merge(state, {
    [name]: {
      status: symbols.STATUS_FAIL,
      errors: errors,
    }
  });
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_BEGIN:
      return begin(state, 'login');
    case actionTypes.LOGIN_DONE:
      return success(state, 'login');
    case actionTypes.LOGIN_FAIL:
      return fail(state, 'login', action.errors);

    case actionTypes.SEND_OTP_BEGIN:
      return begin(state, 'sendOtp');
    case actionTypes.SEND_OTP_DONE:
      return success(state, 'sendOtp');
    case actionTypes.SEND_OTP_FAIL:
      return fail(state, 'sendOtp', action.errors);

    case actionTypes.RESEND_OTP_BEGIN:
      return begin(state, 'resendOtp');
    case actionTypes.RESEND_OTP_DONE:
      return success(state, 'resendOtp');
    case actionTypes.RESEND_OTP_FAIL:
      return fail(state, 'resendOtp', action.errors);

    case actionTypes.VERIFY_OTP_BEGIN:
      return begin(state, 'verifyOtp');
    case actionTypes.VERIFY_OTP_DONE:
      return success(state, 'verifyOtp');
    case actionTypes.VERIFY_OTP_FAIL:
      return fail(state, 'verifyOtp', action.errors);

    case actionTypes.LOGOUT_BEGIN:
      return begin(state, 'logout');
    case actionTypes.LOGOUT_DONE:
      return success(state, 'logout');

    case actionTypes.ORDER_DETAIL_IMAGES_BEGIN:
      return begin(state, 'orderDetailImages');
    case actionTypes.ORDER_DETAIL_IMAGES_DONE:
      return success(state, 'orderDetailImages');
    case actionTypes.ORDER_DETAIL_IMAGES_FAIL:
      return fail(state, 'orderDetailImages', action.errors);

    case actionTypes.GET_WAREHOUSES_BEGIN:
      return begin(state, 'getWarehouses');
    case actionTypes.GET_WAREHOUSES_DONE:
      return success(state, 'getWarehouses');
    case actionTypes.GET_WAREHOUSES_FAIL:
      return fail(state, 'getWarehouses', action.errors);

    case actionTypes.GET_ORDER_DETAILS_BEGIN:
      return begin(state, 'getOrderDetails');
    case actionTypes.GET_ORDER_DETAILS_DONE:
      return success(state, 'getOrderDetails');
    case actionTypes.GET_ORDER_DETAILS_FAIL:
      return fail(state, 'getOrderDetails', action.errors);

    case actionTypes.GET_ORDER_PHONES_BEGIN:
      return begin(state, 'getOrderPhones');
    case actionTypes.GET_ORDER_PHONES_DONE:
      return success(state, 'getOrderPhones');
    case actionTypes.GET_ORDER_PHONES_FAIL:
      return fail(state, 'getOrderPhones', action.errors);

    case actionTypes.ADD_REMARKS_BEGIN:
      return begin(state, 'addRemarks');
    case actionTypes.ADD_REMARKS_DONE:
      return success(state, 'addRemarks');
    case actionTypes.ADD_REMARKS_FAIL:
      return fail(state, 'addRemarks', action.errors);

    case actionTypes.ADD_WAVE_BEGIN:
      return begin(state, 'addWave');
    case actionTypes.ADD_WAVE_DONE:
      return success(state, 'addWave');
    case actionTypes.ADD_WAVE_FAIL:
      return fail(state, 'addWave', action.errors);

    case actionTypes.GET_ORDERS_BEGIN:
      return begin(state, 'getOrders');
    case actionTypes.GET_ORDERS_DONE:
      return success(state, 'getOrders');
    case actionTypes.GET_ORDERS_FAIL:
      return fail(state, 'getOrders', action.errors);

    case actionTypes.UPLOAD_IMAGES_BEGIN:
      return begin(state, 'uploadImages');
    case actionTypes.UPLOAD_IMAGES_DONE:
      return success(state, 'uploadImages');
    case actionTypes.UPLOAD_IMAGES_FAIL:
      return fail(state, 'uploadImages', action.errors);

    case actionTypes.REUPLOAD_WAVE_BEGIN:
      return begin(state, 'reUploadWave');
    case actionTypes.REUPLOAD_WAVE_DONE:
      return success(state, 'reUploadWave');
    case actionTypes.REUPLOAD_WAVE_FAIL:
      return fail(state, 'reUploadWave', action.errors);

    case actionTypes.ORDER_STATUS_ACTION_BEGIN:
      return begin(state, 'orderStatusAction');
    case actionTypes.ORDER_STATUS_ACTION_DONE:
      return success(state, 'orderStatusAction');
    case actionTypes.ORDER_STATUS_ACTION_FAIL:
      return fail(state, 'orderStatusAction', action.errors);

    case actionTypes.SEND_DELIVERY_OTP_BEGIN:
      return begin(state, 'sendDeliveryOtp');
    case actionTypes.SEND_DELIVERY_OTP_DONE:
      return success(state, 'sendDeliveryOtp');
    case actionTypes.SEND_DELIVERY_OTP_FAIL:
      return fail(state, 'sendDeliveryOtp', action.errors);

    case actionTypes.RESEND_DELIVERY_OTP_BEGIN:
      return begin(state, 'resendDeliveryOtp');
    case actionTypes.RESEND_DELIVERY_OTP_DONE:
      return success(state, 'resendDeliveryOtp');
    case actionTypes.RESEND_DELIVERY_OTP_FAIL:
      return fail(state, 'resendDeliveryOtp', action.errors);

    case actionTypes.VERIFY_DELIVERY_OTP_BEGIN:
      return begin(state, 'verifyDeliveryOtp');
    case actionTypes.VERIFY_DELIVERY_OTP_DONE:
      return success(state, 'verifyDeliveryOtp');
    case actionTypes.VERIFY_DELIVERY_OTP_FAIL:
      return fail(state, 'verifyDeliveryOtp', action.errors);

    case actionTypes.GET_ALL_ISSUE_REASONS_BEGIN:
      return begin(state, 'getAllIssueReasons');
    case actionTypes.GET_ALL_ISSUE_REASONS_DONE:
      return success(state, 'getAllIssueReasons');
    case actionTypes.GET_ALL_ISSUE_REASONS_FAIL:
      return fail(state, 'getAllIssueReasons', action.errors);

    case actionTypes.GET_DELIEVRY_ISSUE_REASONS_BEGIN:
      return begin(state, 'getDeliveryIssueReasons');
    case actionTypes.GET_DELIEVRY_ISSUE_REASONS_DONE:
      return success(state, 'getDeliveryIssueReasons');
    case actionTypes.GET_DELIEVRY_ISSUE_REASONS_FAIL:
      return fail(state, 'getDeliveryIssueReasons', action.errors);

    case actionTypes.GET_ORDER_PRODUCTS_BEGIN:
      return begin(state, 'getOrderProducts');
    case actionTypes.GET_ORDER_PRODUCTS_DONE:
      return success(state, 'getOrderProducts');
    case actionTypes.GET_ORDER_PRODUCTS_FAIL:
      return fail(state, 'getOrderProducts', action.errors);

    case actionTypes.SAVE_PRODUCT_ISSUES_BEGIN:
      return begin(state, 'saveProductIssues');
    case actionTypes.SAVE_PRODUCT_ISSUES_DONE:
      return success(state, 'saveProductIssues');
    case actionTypes.SAVE_PRODUCT_ISSUES_FAIL:
      return fail(state, 'saveProductIssues', action.errors);

    case actionTypes.DELETE_PRODUCT_ISSUES_BEGIN:
      return begin(state, 'deleteProductIssues');
    case actionTypes.DELETE_PRODUCT_ISSUES_DONE:
      return success(state, 'deleteProductIssues');
    case actionTypes.DELETE_PRODUCT_ISSUES_FAIL:
      return fail(state, 'deleteProductIssues', action.errors);


    case actionTypes.UPDATE_ORDER_BEGIN:
      return begin(state, 'updateOrder');
    case actionTypes.UPDATE_ORDER_DONE:
      return success(state, 'updateOrder');
    case actionTypes.UPDATE_ORDER_FAIL:
      return fail(state, 'updateOrder', action.errors);

    case actionTypes.CANCEL_DELIVERY_ISSUE_BEGIN:
      return begin(state, 'cancelDeliveryIssue');
    case actionTypes.CANCEL_DELIVERY_ISSUE_DONE:
      return success(state, 'cancelDeliveryIssue');
    case actionTypes.CANCEL_DELIVERY_ISSUE_FAIL:
      return fail(state, 'cancelDeliveryIssue', action.errors);

    case actionTypes.INVOICE_IMAGES_BEGIN:
      return begin(state, 'invoiceImageUplaod');
    case actionTypes.INVOICE_IMAGES_DONE:
      return success(state, 'invoiceImageUplaod');
    case actionTypes.INVOICE_IMAGES_FAIL:
      return fail(state, 'invoiceImageUplaod', action.errors);

    case actionTypes.STORE_IMAGES_BEGIN:
      return begin(state, 'storeImage');
    case actionTypes.STORE_IMAGES_DONE:
      return success(state, 'storeImage');
    case actionTypes.STORE_IMAGES_FAIL:
      return fail(state, 'storeImage', action.errors);

    case actionTypes.IMAGE_COMPRESSION_BEGIN:
      return begin(state, 'imageCompression');
    case actionTypes.IMAGE_COMPRESSION_DONE:
      return success(state, 'imageCompression');
    case actionTypes.IMAGE_COMPRESSION_FAIL:
      return fail(state, 'imageCompression', action.errors);

    case actionTypes.SET_ORDER_ASSET_BEGIN:
      return begin(state, 'getOrderAssets');
    case actionTypes.SET_ORDER_ASSET_DONE:
      return success(state, 'getOrderAssets');
    case actionTypes.SET_ORDER_ASSET_FAIL:
      return fail(state, 'getOrderAssets', action.errors);

    default:
      return state;
  }
};

export default reducer;
