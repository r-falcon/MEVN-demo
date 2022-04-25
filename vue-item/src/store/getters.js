const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  user: (state) => state.user.user,
  avatar: (state) => state.user.avatar,
  roles: (state) => state.user.roles,
  permissions: (state) => state.user.permissions,
  permission_routes: (state) => state.permission.routes,
  topbarRouters: (state) => state.permission.topbarRouters,
  defaultRoutes: (state) => state.permission.defaultRoutes,
  sidebarRouters: (state) => state.permission.sidebarRouters,
};
export default getters;
