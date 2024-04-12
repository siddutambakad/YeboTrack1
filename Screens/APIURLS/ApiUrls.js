const BASE_URL = 'https://yeboapi.yebo.co.in/';

export const APIS = {
  loginWithOtp: `${BASE_URL}api/Login/PostSendOTPForLogin`,
  verifyOtp: `${BASE_URL}api/Login/PostVerifyOTPForLogin`,
  getDriverRoasterList: `${BASE_URL}api/Roaster/GetDriversRoasterList`,
  getTripDeatils: `${BASE_URL}api/Roaster/GetSelectedDateRoasterDetail_New`,
  getStartTripOtp: `${BASE_URL}api/Roaster/SendTripStartOTP`,
  validateStartTripOtp: `${BASE_URL}api/Roaster/ValidateTripStartOTP`,
  sendOtpForGuard: `${BASE_URL}api/Roaster/SendTripGuardOTP`,
  validateOtpForGuard: `${BASE_URL}api/Roaster/ValidateTripGuardOTP`,
  sendOtpForEmployeeCheckIn: `${BASE_URL}api/Roaster/SendTripEventEmpCheckInOTP`,
  validateEmployeeCheckIn: `${BASE_URL}api/Roaster/ValidateTripEmpCheckInOTP`,
  sendSkipEmpCheckIn: `${BASE_URL}api/Roaster/SkipEmpTripCheckIn`,
  sendTripEndOtp: `${BASE_URL}api/Roaster/SendTripEndOTP`,
  validateTripEndOtp: `${BASE_URL}api/Roaster/ValidateTripEndOTP`,
  getDriversDetails: `${BASE_URL}api/MasterDriver`,
  sendBreakEmployeeTrip: `${BASE_URL}api/Roaster/BreakEmpTrip`,
  sendEmployeeCheckOutTrip: `${BASE_URL}api/Roaster/EmpTripCheckOut`,
};
