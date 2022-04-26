import {
  login
} from "@/api/login";
import {
  getUserInfo
} from "@/api/system/user";

import {
  getToken,
  setToken,
  removeToken
} from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    user: {},
    avatar: '',
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
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
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
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            setToken(res.data.token);
            commit("SET_TOKEN", res.data.token);
            localStorage.setItem("isAdmin", res.data.user.isAdmin);
            localStorage.setItem("userId", res.data.user._id)
            resolve();
          })
          .catch((err) => reject(err));
      });
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo({
          id: localStorage.getItem('userId')
        }).then(res => {
          if (res.data.isAdmin) {
            commit("SET_ROLES", ["admin"]);
          } else {
            commit("SET_ROLES", ["normal"]);
          }
          const avatar = res.data.avatar == "" ? require("@/assets/images/profile.jpg") : res.data.avatar
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      });
    },

    // 登出
    LogOut({
      commit
    }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        localStorage.clear();
        resolve();
      });
    },
  },
};

export default user;
