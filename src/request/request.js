import axios from 'axios';

// 创建一个实例
const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
});

// 请求拦截

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
