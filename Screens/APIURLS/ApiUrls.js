const BASE_URL = 'https://yeboapi.yebo.co.in/';

export const APIS = {
  loginWithOtp: `${BASE_URL}api/Login/PostSendOTPForLogin`,
  verifyOtp: `${BASE_URL}api/Login/PostVerifyOTPForLogin`,
  getDriverRoasterList: `${BASE_URL}api/Roaster/GetDriversRoasterList`,
  getTripDeatils: `${BASE_URL}api/Roaster/GetSelectedDateRoasterDetail_New`,
  getStartTripOtp: `${BASE_URL}api/Roaster/SendTripStartOTP`,
  getDriversDetails: `${BASE_URL}api/MasterDriver`,
};
