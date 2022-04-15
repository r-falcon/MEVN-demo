import { constantRoutes } from "@/router";
import Layout from "@/layout/index";
import store from "@/store";

const permission = {
  state: {
    routes: [],
    addRoutes: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRoutes.concat(routes);
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise((resolve) => {
        var res = {
          code: 0,
          message: "获取动态路由成功",
          data: [
            {
              name: "System",
              path: "/system",
              redirect: null,
              component: "Layout",
              meta: {
                title: "系统维护",
                icon: "nested",
                roles: ["admin"],
              },
              children: [
                {
                  name: "User",
                  path: "/system/user",
                  redirect: null,
                  component: "system/user/index",
                  hidden: false,
                  meta: {
                    title: "用户管理",
                    icon: null,
                  },
                },
                {
                  name: "Role",
                  path: "/system/role",
                  redirect: null,
                  component: "system/role/index",
                  hidden: false,
                  meta: {
                    title: "角色管理",
                    icon: null,
                  },
                },
                {
                  name: "Menu",
                  path: "/system/menu",
                  redirect: null,
                  component: "system/menu/index",
                  hidden: false,
                  meta: {
                    title: "菜单管理",
                    icon: null,
                  },
                },
              ],
            },
            {
              name: "Fresh",
              path: "/fresh",
              redirect: null,
              component: "Layout",
              meta: {
                title: "生鲜管理",
                icon: "form",
                roles: ["admin", "normal"],
              },
              children: [
                {
                  name: "Purchase",
                  path: "/fresh/purchase",
                  redirect: null,
                  component: "purchase/index",
                  hidden: false,
                  meta: {
                    title: "采购管理",
                    icon: null,
                  },
                },
                {
                  name: "Stock",
                  path: "/fresh/stock",
                  redirect: null,
                  component: "stock/index",
                  hidden: false,
                  meta: {
                    title: "库存管理",
                    icon: null,
                  },
                },
                {
                  name: "Order",
                  path: "/fresh/order",
                  redirect: null,
                  component: "order/index",
                  hidden: false,
                  meta: {
                    title: "订单管理",
                    icon: null,
                  },
                },
                {
                  name: "Analysis",
                  path: "/fresh/analysis",
                  redirect: null,
                  component: "analysis/index",
                  hidden: false,
                  meta: {
                    title: "统计分析",
                    icon: null,
                  },
                },
              ],
            },
            {
              name: "Article",
              path: "/article",
              redirect: null,
              component: "Layout",
              meta: {
                title: "文章管理",
                icon: "list",
                roles: ["admin", "normal"],
              },
              children: [
                {
                  name: "Sort",
                  path: "/article/sort",
                  redirect: null,
                  component: "sort/index",
                  hidden: false,
                  meta: {
                    title: "分类管理",
                    icon: null,
                  },
                },
                {
                  name: "Content",
                  path: "/article/content",
                  redirect: null,
                  component: "content/index",
                  hidden: false,
                  meta: {
                    title: "内容管理",
                    icon: null,
                  },
                },
              ],
            },
          ],
        };
        /**
         * 权限校验开始
         */
        let key = localStorage.getItem("role");
        let list = [];
        console.log("key", key);
        res.data &&
          res.data.forEach((item) =>
            item.meta.roles.includes(key) ? list.push(item) : null
          );
        res.data = list;
        /**
         * 权限校验结束
         */
        const accessedRoutes = filterAsyncRouter(res.data);
        accessedRoutes.push({
          path: "*",
          redirect: "/404",
          hidden: true,
        });
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    },
  },
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter((route) => {
    if (route.component) {
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === "development") {
    return (resolve) => require([`@/views/${view}`], resolve);
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`);
  }
};

export default permission;
