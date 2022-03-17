import request from "@/utils/request";

export function getContents(data) {
  return request({
    url: "/admin/contentList",
    method: "get",
    params: data,
  });
}

export function contentAdd(data) {
  return request({
    url: "/admin/contentAdd",
    method: "post",
    data: data,
  });
}

export function contentEdit(data) {
  return request({
    url: "/admin/contentEdit",
    method: "post",
    data: data,
  });
}

export function contentDelete(data) {
  return request({
    url: "/admin/contentDelete",
    method: "get",
    params: data,
  });
}

export function contentComment(data) {
  return request({
    url: "/admin/contentComment",
    method: "post",
    data: data,
  });
}

export function commentDelete(data) {
  return request({
    url: "/admin/commentDelete",
    method: "get",
    params: data,
  });
}
