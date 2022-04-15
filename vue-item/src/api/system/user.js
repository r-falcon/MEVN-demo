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
