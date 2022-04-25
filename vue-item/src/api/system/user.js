import request from "@/utils/request";

/**
 * 获取用户信息
 */
export function getUserList(params) {
  return request({
    url: "/system/userList",
    method: "get",
    params: params,
  });
}

/**
 * 添加用户
 */
export function userAdd(data) {
  return request({
    url: "/system/addUser",
    method: "post",
    data: data,
  });
}

/**
 * 根据id获取详情 
 */
export function getUserInfo(params) {
  return request({
    url: "/system/getUserById",
    method: "get",
    params: params
  });
}

/**
 * 修改用户
 */
export function userEdit(data) {
  return request({
    url: "/system/editUser",
    method: "post",
    data: data,
  });
}

/**
 * 删除用户
 */
export function userDelete(params) {
  return request({
    url: "/system/deleteUser",
    method: "get",
    params: params
  });
}

/**
 * 重置密码
 */
export function pwdReset(data) {
  return request({
    url: "/system/initPwd",
    method: "post",
    data: data
  });
}

/**
 * 修改状态
 */
export function userChange(data) {
  return request({
    url: "/system/changeStatus",
    method: "post",
    data: data
  });
}
