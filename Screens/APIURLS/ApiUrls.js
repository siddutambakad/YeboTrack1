const BASE_URL = 'https://yeboapi.yebo.co.in/';

export const APIS = {
  loginWithOtp: `${BASE_URL}api/Login/PostSendOTPForLogin`,
  verifyOtp: `${BASE_URL}api/Login/PostVerifyOTPForLogin`,
};