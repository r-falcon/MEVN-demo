import request from "@/utils/request";

export function getUsers(data) {
  return request({
    url: "/admin/userList",
    method: "get",
    params: data,
  });
}
