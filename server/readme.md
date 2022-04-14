## 生鲜

### 采购

- 订单编号
- id
- 名称
- 采购公司
- 货物来源地址
- 分类（蔬菜、水果、肉类、水产、干货）
- 单价
- 数量
- 支付（是、否）
- 发货（是、否）

### 库存

- id
- 名称
- 分类
- 库存

### 订单

- 订单编号
- 购买名称
- 购买分类
- 购买单价
- 购买数量
- 购买者
- 支付
- 发货

### 统计

#### 采购额统计（1-12 月）- bar

#### 采购分类占比统计（5 类）- pie

#### 分类库存统计(5 类) - bar

#### 订单总量趋势统计（1-12 月） - line

#### 订单分类统计（5 类）

## 文章

## 系统

### 用户管理

- id
- username
- nickname
- password
- email
- role（管理员 admin、普通用户 normal）
- enable
- avatar
- 分配菜单

### 重置密码

- id
- password
- newPassword

### 角色管理

- id
- roleName
- roleDesc

### 菜单管理

- id
- name
- icon
- isShow
- component
- path
- sort
