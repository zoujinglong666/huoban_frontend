import {Login} from "@/api/interface/index";
import http from "@/api";

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin> ( `/user/login`, params, {loading: false} ); // 正常 post json 请求  ==>  application/json
  // return http.post<Login.ResLogin>(PORT1 + `/login`, params, { loading: false }); // 控制当前请求不显示 loading
  // return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  // return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
  // return http.get<Login.ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // get 请求可以携带数组等复杂参数
};


// 用户退出登录
export const logoutApi = () => {
  return http.post ( `/user/logout` );
};

export const getUserInfo = () => {
  return http.get ( `/user/current` );
};
export const userRegistrationApi = (params) => {
  return http.post ( `/user/register`, params );
};
export const updateUserInfo = (params) => {
  return http.post ( `/user/update`, params );
};
export const searchTags = (params) => {
  return http.get ( `/user/search/tags`, params, {
    paramsSerializer: params => {
      // 使用默认的 paramsSerializer
      return new URLSearchParams ( params ).toString ();
    }
  } );
};
export const recommendedUsers = (params?: {}) => {
  return http.get ( `/user/recommended`, params );
};


