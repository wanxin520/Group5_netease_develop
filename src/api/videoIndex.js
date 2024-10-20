import to from "await-to-js";
import request from "./request";
import { useUserStore } from "@/store";
const userStore = useUserStore()
const params = new URLSearchParams()
params.append("cookie", userStore.userInfo.cookie)
params.append("timestamp", Date.now())
/* 
全部 mv
说明 : 调用此接口 , 可获取全部 mv
可选参数 :
area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
limit: 取出数量 , 默认为 30
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
接口地址 : /mv/all
调用例子 : /mv/all?area=港台
*/
// 所有
export const getAllMV = async () => {
  const [error, res] = await to(request.get("/mv/all"));
  if (error) return console.log(`请求出错:${error}`);
  return res.data;
};
// 内地
export const getInlandMV = async () => {
  const [error, res] = await to(request.get("/mv/all?area=内地"));
  if (error) return console.log(`请求出错:${error}`);
  return res.data;
};
// 港台
export const getGATMV = async () => {
  const [error, res] = await to(request.get("/mv/all?area=港台"));
  if (error) return console.log(`请求出错:${error}`);
  return res.data;
};
// 欧美
export const getEAAMV = async () => {
  const [error, res] = await to(request.get("/mv/all?area=欧美"));
  if (error) return console.log(`请求出错:${error}`);
  return res.data;
};
// 日本
export const getJapanMV = async () => {
  const [error, res] = await to(request.get("/mv/all?area=日本"));
  if (error) return console.log(`请求出错:${error}`);
  return res.data;
};
// 韩国
export const getKoreaMV = async () => {
  const [error, res] = await to(request.get("/mv/all?area=韩国"));
  if (error) return console.log(`请求出错:${error}`);
  return res.data;
};
/* 
最新 mv
说明 : 调用此接口 , 可获取最新 mv
可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
可选参数 : limit: 取出数量 , 默认为 30
接口地址 : /mv/first
调用例子 : /mv/first?limit=10
*/
export const getNewestMV = async (data) => {
  const [error, res] = await to(request.get("/mv/first"), data);
  if (error) return console.log(`请求出错:${error}`);
  return res.data;
};
/* 
网易出品 mv
说明 : 调用此接口 , 可获取网易出品 mv
可选参数 : limit: 取出数量 , 默认为 30
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
接口地址 : /mv/exclusive/rcmd
调用例子 : /mv/exclusive/rcmd?limit=10
*/
export const getOfficialMV = async (data) => {
  const [error, res] = await to(request.get("/mv/exclusive/rcmd"), data);
  if (error) return console.log(`请求出错:${error}`);
  return res.data;
};
/*  
推荐 mv
说明 : 调用此接口 , 可获取推荐 mv
接口地址 : /personalized/mv
调用例子 : /personalized/mv
*/
export const getRecommendMV = async (data) => {
  const [error, res] = await to(request.post("/personalized/mv"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

/* 
获取 mv 数据
说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
必选参数 : mvid: mv 的 id
接口地址 : /mv/detail
调用例子 : /mv/detail?mvid=5436712
*/
export const getMVInfo = async (data) => {
  const [error, res] = await to(request.post(`/mv/detail?mvid=${data.mvid}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};
/* 
获取 mv 点赞转发评论数数据
说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据
必选参数 : mvid: mv 的 id
接口地址 : /mv/detail/info
调用例子 : /mv/detail/info?mvid=5436712
*/
export const getMVDetailInfo = async (data) => {
  const [error, res] = await to(request.post(`/mv/detail/info?mvid=${data.mvid}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

/* 
mv 地址
说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
必选参数 : id: mv id
可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
接口地址 : /mv/url
调用例子 :
/mv/url?id=5436712 /mv/url?id=10896407&r=1080
 */
export const getMVURL = async (data) => {
  const [error, res] = await to(request.post(`/mv/url?id=${data.mvid}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};
