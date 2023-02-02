import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: 'http://192.168.23.201:8082/',
  timeout: 5000, // request timeout
  withCredentials: false,
  headers: {
    get:{
      'Content-Type': 'application/json',
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    delete: {
      'Content-Type': 'application/json'
    }
  }
});

service.interceptors.request.use(
  (config) => {
    console.log(config,'config')
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    console.log(response,'response')
    // const res = response.data;
    // const status = response.status;
    // if (status !== 200 && status !== 201) {
    //   if (status === 50008 || status === 50012 || status === 50014) {
    //   }
    //   return Promise.reject(new Error(res.message || "Error"));
    // } else {
    //   return res;
    // }
    // return res;
    return response;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;
