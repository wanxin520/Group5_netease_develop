# 项目开发注意事项

## 一. git 操作步骤
```js
/**
 * @note git分支说明 
 * */

主分支   main                   所有提供给用户使用的正式版本，都在这个主分支上发布
开发分支 dev                    供联调与合作开发
功能分支 feature                基于master分支创建的个人功能分支
测试分支 release或者test        测试分支没有问题 合并到master分支
修复分支 hotfix                 修复线上代码的bug
发布版本                        将测试完成的功能打tag号 供上线使用 例如  TAG-2022-08-01_21-03-22


1. 当本地没有项目文件的时候，执行此命令将云端项目克隆到本地
    git clone https://github.com/wanxin520/Group5_netease_develop.git  
 如果网络不好可以直接下载项目的zip文件并解压,将下载好的文件解压缩并将含有所有文件的文件夹存放在一个专门用于项目开发的文件夹里

2. 项目初始化git仓库
    git init 

3. 建立远程链接
    git remote add origin https://github.com/wanxin520/Group5_netease_develop.git
  可使用 remote -v 指令查看连接状态

---如果是使用克隆指令下载文件的，可以直接跳过 2,3 两个步骤


/**
 * @注意 :这一步是关键，需要注意
 */
4. 创建本地 dev 分支,并切换到本地 dev 分支上（我们的项目上传与下载都是基于云端的dev分支）
    git branch -M dev

    创建完成之后，先执行一次
        git add .
        git commit -m ""

5. 在gitHub仓库查看自己需要完成的 Issues 序号，再创建一个新的本地测试分支，分支名称命名格式为 feature/你需要完成的Issues序号，例如  feature/1
    git branch -M feature/你需要完成的Issues序号
例如
    git branch -M feature/1

6. 此次任务完成后，将所有的文件全部上传到缓存区
    git add .

7. 文件提交到本地，引号里面填写你本次完成的任务的简要介绍
    git commit -m "任务简要介绍"

例如 git commit -m "完成了homePage页面渲染"
例如 git commit -m "完成了homePage业务处理逻辑"

---注意：步骤 6 和步骤 7 的文件提交一定要在 feature/序号 分支下

7. 文件编写完成后，将刚刚任务分分支与本地的 dev 分支进行合并
/**
 * @注意 ：此处的合并顺序不要搞反了，是将任务分支合并到本地dev分支上
 * */ 
    7.1 先切换到本地dev分支上
        git checkout dev
    
    7.2 然后将任务分支合并到本地dev分支上
        git merge 任务分支 --no-ff

    命令执行后，输入英文字母 i 可以进去编辑，将你这次合并的名称命名为你此次完成任务的简介
    输入完成后，按下ese键退出编辑页面，输入 :wq 后回车完成合并

8. 任务完成之后，在确保分支无误的情况下，执行推送命令，将 本地的dev分支推送到 云端dev分支上
    ### 推送之前请仔细检查推送的分支是否是 dev 分支 ，千万不能是 main 分支
    ### 推送之前请仔细检查推送的分支是否是 dev 分支 ，千万不能是 main 分支
    ### 推送之前请仔细检查推送的分支是否是 dev 分支 ，千万不能是 main 分支

    ###  每次推送项目的之前多检查几遍，小心驶得万年船 ！！！

```

## 二. 开发注意事项
```js
/**
 * @注意 ： 
 * @注意 ：此文件是在项目开发的过程中的注意事项和会用到的知识点，为方便查看
 * @注意 ：在开发过程中，如果有不懂的或者拿不定注意的需要及时询问
 * @注意 ：本项目所有的开发尽量使用  Vant4  移动开发里面的组件，在必要的时候可以封装自定义组件
 * 
 * @注意 ：其他注意事项待在项目开发过程中持续更新
*/
```

```js
/**
 * @note Vue3中的生命周期
 * */
1.1 setup() : 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method
1.2 onBeforeMount() : 组件挂载到节点上之前执行的函数；
1.3 onMounted() : 组件挂载完成后执行的函数；
1.4 onBeforeUpdate(): 组件更新之前执行的函数；
1.5 onUpdated(): 组件更新完成之后执行的函数；
1.6 onBeforeUnmount(): 组件卸载之前执行的函数；
1.7 onUnmounted(): 组件卸载完成后执行的函数；
1.8 onActivated(): 被包含在 <keep-alive> 中的组件，会多出两个生命周期钩子函数，被激活时执行；
1.9 onDeactivated(): 比如从 A 组件，切换到 B 组件，A 组件消失时执行；
1.10 onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数。
```
