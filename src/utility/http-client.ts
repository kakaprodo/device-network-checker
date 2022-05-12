import axios from "axios";

const TIME_OUT = 5000;
const http = axios.create({
  baseURL: 'https://random-data-api.com/api/', 
  timeout: TIME_OUT
})

http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log('***************** REQUEST ERROR ******************')
    console.log(error.message);
    console.warn(error);

    const errorResp = error.response;
    const networkErrorMsg = error.message == 'Network Error'
      ? error.message
      : null; 

    if (networkErrorMsg) {
      alert(networkErrorMsg)
    }
  
  const requestTimedOut = error.message == `timeout of ${TIME_OUT}ms exceeded`;

    if (requestTimedOut) {
      alert("You might be experiencing a network issue")
    }

    return Promise.resolve(error.response);
});

export default http;
