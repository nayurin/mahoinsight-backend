# MahoMaho INSIGHT!!
这里是**公主连结 Re:Dive 简体中文服**资讯站 [MahoMaho INSIGHT!! 真步真步视界术](https://mahomahoinsight.info) 后端工程的代码仓库。

## 技术栈
- [Node.js](https://nodejs.org/zh-cn/)
- [Koa.js](https://github.com/koajs/koa/)

## 项目构建与使用
### 项目环境准备
1.安装[Node.js](https://nodejs.org/zh-cn/) (版本要求7.6或更高)

2.使用以下命令安装nrm (可选)
```
npm install -g nrm
```
3.修改包管理器的下载源为淘宝镜像或cnpm (可选)
```
nrm use taobao
或
nrm use cnpm
```
4.使用以下命令安装[yarn](https://classic.yarnpkg.com/zh-Hans/)
```
npm install -g yarn
```

### 项目依赖包的安装
```
yarn install
```

### 启动本地开发服务器
```
yarn start
```

### 更新前端文件缓存
```
yarn updatecache
```

### 项目本地环境参数配置
建议参考[Demo](https://github.com/nayurin/mahoinsight-backend/blob/master/.local_config.demo)进行配置，配置文件名为/.local_config.json
* port：服务端口
* address：服务器地址
* issuesroot：Issue的本地根路径，建议使用绝对路径
* cacheroot： 前端文件缓存的路径，建议使用绝对路径
* db：数据库文件路径，建议使用绝对路径

## 项目协作
待更新

## 许可
本项目使用 MIT 许可，详情请参考 [LICENSE](https://github.com/nayurin/mahoinsight-backend/blob/master/LICENSE)