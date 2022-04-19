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
- 如果在D盘下安装，就在D盘创建 D:\data\db
- 运行命令，指认dbpath,logpath 
切换到当前bin目录执行
`mongod --dbpath “D:\my test\data\db” --logpath “D:\my test\data\log\mongodb.log`
直接执行
`C:\mongodb\bin\mongod --dbpath c:\data\db`
执行完毕，不要关闭当前窗口
- 回到bin文件夹，以管理员身份运行 mongo.exe，并尝试进行如下操作:
```js
> db
test
> use admin
switched to db admin
> db.auth('falcon','falcon')
Error: Authentication failed.
0
```
- 对于"Authentication failed"的解决办法：手动添加admin账户，执行代码如下
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
- 此时在执行`db.auth('admin','admin')`返回结果1
```js
> db.auth('admin','admin')
1
>
```
