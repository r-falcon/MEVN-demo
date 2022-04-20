import request from "@/utils/request";

/**
 * 获取库存信息
 */
export function getStockList(params) {
  return request({
    url: "/stock/stockList",
    method: "get",
    params: params,
  });
}