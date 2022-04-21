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
- 商品名称
- 商品单价
- 商品数量

### 订单

- 订单编号
- 商品名称
- 购买单价
- 购买数量
- 购买者
- 购买者地址
- 购买者电话
- 是否支付
- 是否发货
- 创建时间

### 统计

#### 采购统计 - （五类数量）bar

#### 库存占比统计 - (五类库存数量)pie

#### 订单趋势统计 - （五类订单趋势）line

## 文章

## 系统

### 用户管理

- id
- username
- nickname
- password
- email
- phone
- isAdmin
<!-- - role（管理员 admin、普通用户 normal） -->
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
- hidden
- role
- component
- path
- sort

## MongoDB 的安装、配置和“"Authentication failed"”的处理

- 去[官网下载](http://www.mongodb.org/downloads)适合自己版本的 mongodb community server
- 下载相应的 .msi 文件
- 下载完成后双击打开，按提示操作安装
- 安装过程通过点击 “custom" 按钮来设置自己想要存放的目录
- 下一步安装 "install mongodb compass"[图形化可视工具]不勾选
- 安装完成后，创建数据目录
- 如果在 D 盘下安装，就在 D 盘创建 D:\data\db
- 运行命令，指认 dbpath,logpath
  切换到当前 bin 目录执行
  `mongod --dbpath “D:\my test\data\db” --logpath “D:\my test\data\log\mongodb.log`
  直接执行
  `C:\mongodb\bin\mongod --dbpath c:\data\db`
  执行完毕，不要关闭当前窗口
- 回到 bin 文件夹，以管理员身份运行 mongo.exe，并尝试进行如下操作:

```js
> db
test
> use admin
switched to db admin
> db.auth('falcon','falcon')
Error: Authentication failed.
0
```

- 对于"Authentication failed"的解决办法：手动添加 admin 账户，执行代码如下

```js
> db.createUser({user:'admin',pwd:'admin',roles:[{role:'userAdminAnyDatabase',db:'admin'}]});
Successfully added user: {
        "user" : "admin",
        "roles" : [
                {
                        "role" : "userAdminAnyDatabase",
                        "db" : "admin"
                }
        ]
}
>
```

- 此时在执行`db.auth('admin','admin')`返回结果 1

```js
> db.auth('admin','admin')
1
>
```
