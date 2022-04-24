import request from "@/utils/request";

export function getContents(params) {
  return request({
    url: "/content/contentList",
    method: "get",
    params: params
  });
}

export function contentsAdd(data) {
  return request({
    url: "/content/addContent",
    method: "post",
    data: data
  });
}

export function contentsEdit(data) {
  return request({
    url: "/content/editContent",
    method: "post",
    data: data
  });
}

export function contentsDelete(params) {
  return request({
    url: "/content/deleteContent",
    method: "get",
    params: params
  });
}

export function commentAdd(data) {
  return request({
    url: "/content/addComment",
    method: "post",
    data: data
  });
}

export function commentDelete(data) {
  return request({
    url: "/content/deleteComment",
    method: "post",
    data: data
  });
}
