import { login } from "@/api/login";
import {
  getToken,
  setToken,
  removeToken,
  setUser,
  removeUser,
} from "@/utils/auth";

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
            setUser(res.data.user);
            commit("SET_TOKEN", res.data.token);
            commit("SET_USER", res.data.user);
            localStorage.setItem("isAdmin", res.data.user.isAdmin);
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(localStorage.getItem("isAdmin"));
        if (localStorage.getItem("isAdmin")) {
          localStorage.setItem("role", ["admin"]);
          commit("SET_ROLES", ["admin"]);
        } else {
          localStorage.setItem("role", ["normal"]);
          commit("SET_ROLES", ["normal"]);
        }
        resolve(state.user);
      });
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_USER", {});
        removeToken();
        removeUser();
        localStorage.clear();
        resolve();
      });
    },
  },
};

export default user;
