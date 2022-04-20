import request from "@/utils/request";

/**
 * 获取订单信息
 */
export function getOrderList(params) {
  return request({
    url: "/order/orderList",
    method: "get",
    params: params,
  });
}

/**
 * 添加订单
 */
export function orderAdd(data) {
  return request({
    url: "/order/addOrder",
    method: "post",
    data: data,
  });
}

/**
 * 修改订单
 */
export function orderEdit(data) {
  return request({
    url: "/order/editOrder",
    method: "post",
    data: data,
  });
}

/**
 * 删除订单
 */
export function orderDelete(params) {
  return request({
    url: "/order/deleteOrder",
    method: "get",
    params: params,
  });
}
