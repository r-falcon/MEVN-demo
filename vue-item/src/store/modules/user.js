import { login } from "@/api/login";
import { getToken, setToken, removeToken, setUser } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    permissions: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            setToken(res.data.token);
            setUser(res.data.user._id);
            commit("SET_TOKEN", res.data.token);
            commit("SET_USER", res.data.user);
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const res = {
          roles: ["admin"],
          permissions: ["create", "retrieve", "update", "delete"],
        };

        if (res.roles && res.roles.length > 0) {
          commit("SET_ROLES", res.roles);
          commit("SET_PERMISSIONS", res.permissions);
        } else {
          commit("SET_ROLES", ["ROLE_DEFAULT"]);
        }
        resolve(res);
      });
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_USER", {});
        removeToken();
        resolve();
      });
    },
  },
};

export default user;
