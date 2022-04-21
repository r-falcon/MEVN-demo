import request from "@/utils/request";

export function getAbuys() {
  return request({
    url: "/abuy/getBarChart",
    method: "get"
  });
}

export function getAstores() {
  return request({
    url: "/astore/getPieChart",
    method: "get"
  });
}

export function getAtrans() {
  return request({
    url: "/atrans/getLineChart",
    method: "get"
  });
}
