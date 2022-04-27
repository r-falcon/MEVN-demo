import request from "@/utils/request";

export function getSingles() {
  return request({
    url: "/single/singleList",
    method: "get"
  });
}

export function addSingle(data) {
  return request({
    url: "/single/singleAdd",
    method: "post",
    data: data
  });
}

export function deleteSingle(data) {
  console.log(data);
  return request({
    url: "/single/singleDelete",
    method: "post",
    data: data
  });
}
