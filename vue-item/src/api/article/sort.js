import request from "@/utils/request";

export function getSorts(params) {
  return request({
    url: "/catetory/sortList",
    method: "get",
    params: params
  });
}

export function sortsAdd(data) {
  return request({
    url: "/catetory/addCategory",
    method: "post",
    data: data
  });
}

export function sortsEdit(data) {
  return request({
    url: "/catetory/editCategory",
    method: "post",
    data: data
  });
}

export function sortsDelete(params) {
  return request({
    url: "/catetory/deleteCategory",
    method: "get",
    params: params
  });
}
