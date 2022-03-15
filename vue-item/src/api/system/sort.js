import request from "@/utils/request";

export function getSorts(data) {
  return request({
    url: "/admin/sortList",
    method: "get",
    params: data,
  });
}

export function sortAdd(data) {
  return request({
    url: "/admin/sortAdd",
    method: "post",
    data: data,
  });
}

export function sortEdit(data) {
  return request({
    url: "/admin/sortEdit",
    method: "post",
    data: data,
  });
}

export function sortDelete(data) {
  return request({
    url: "/admin/sortDelete",
    method: "get",
    params: data,
  });
}
