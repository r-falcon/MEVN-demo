import request from "@/utils/request";

export function getContents(params) {
  return request({
    url: "/content/contentList",
    method: "get",
    params: params
  });
}
