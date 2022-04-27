import request from "@/utils/request";

export function getMultiples() {
  return request({
    url: "/multiple/multipleList",
    method: "get"
  });
}

export function addMultiple(data) {
  return request({
    url: "/multiple/multipleAdd",
    method: "post",
    data: data
  });
}

export function deleteMultiple(data) {
  console.log(data);
  return request({
    url: "/multiple/multipleDelete",
    method: "post",
    data: data
  });
}
