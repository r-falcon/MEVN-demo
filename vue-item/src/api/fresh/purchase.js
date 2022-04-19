import request from "@/utils/request";

/**
 * 获取采购信息
 */
export function getPurchaseList(params) {
  return request({
    url: "/purchase/purchaseList",
    method: "get",
    params: params,
  });
}

/**
 * 添加采购信息
 */
 export function purchaseAdd(data) {
  return request({
    url: "/purchase/addPurchase",
    method: "post",
    data:data
  });
}

/**
 * 修改采购信息
 */
 export function purchaseEdit(data) {
  return request({
    url: "/purchase/editPurchase",
    method: "post",
    data:data
  });
}

/**
 * 删除采购信息
 */
 export function purchaseDelete(params) {
  return request({
    url: "/purchase/deletePurchase",
    method: "get",
    params:params
  });
}