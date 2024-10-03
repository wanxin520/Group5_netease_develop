/**
 * @注意 :
 *  在开发过程中，此文件的 模块导入 以及 方法命名在 非必要情况下不要改动
 *
 *  如若需要改动请在微信群里进行说明
 *
 */
import to from "await-to-js";
import request from "./request";

// 使用async和await的语法糖的写法 async和await就是Promise的语法糖
// 使用to函数实现捕获请求的过程中会出现的错误

// banner
/* 
说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
可选参数 :
type:资源类型,对应以下类型,默认为 0 即 PC
0: pc
1: android
2: iphone
3: ipad
接口地址 : /banner
调用例子 : /banner, /banner?type=2
*/
export const getBannerImage = async (data) => {
  const [error, res] = await to(request.post(`/banner?timestamp=${data.timestamp}&cookie=${data.cookie}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

/* 
首页-发现-圆形图标入口列表
说明 : 调用此接口 , 可获取 APP 首页圆形图标入口列表
接口地址 : /homepage/dragon/ball
*/
export const getDragonBall = async (data) => {
  const [error, res] = await to(request.post(`/homepage/dragon/ball?timestamp=${data.timestamp}&cookie=${data.cookie}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};


// discover页面数据渲染
export const getHomePageData = async () => {
  const [error, res] = await to(request.get("/homepage/block/page"));
  if (error) return console.log("请求出错:" + error);
  return res.data.data.blocks;
};

// 搜索
/* 
说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
必选参数 : keywords : 关键词
可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
接口地址 : /search 或者 /cloudsearch(更全)
调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
*/
export const cloudsearch = async (data) => {
  const [error, res] = await to(request.post("/cloudsearch"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 默认搜索关键词
/* 
说明 : 调用此接口 , 可获取默认搜索关键词
接口地址 : /search/default
*/
export const cloudsearchDefault = async (data) => {
  const [error, res] = await to(request.get("/search/default"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 热搜列表(简略)
/* 
说明 : 调用此接口,可获取热门搜索列表
接口地址 : /search/hot
调用例子 : /search/hot
*/
export const getSearchHot = async (data) => {
  const [error, res] = await to(request.get("/search/hot"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 热搜列表(详细)
/* 
说明 : 调用此接口,可获取热门搜索列表
接口地址 : /search/hot/detail
调用例子 : /search/hot/detail
*/
export const getSearchHotDetail = async (data) => {
  const [error, res] = await to(request.get("/search/hot/detail"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 搜索建议
/* 
说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息
必选参数 : keywords : 关键词
可选参数 : type : 如果传 'mobile' 则返回移动端数据
接口地址 : /search/suggest
调用例子 : /search/suggest?keywords=海阔天空 /search/suggest?keywords=海阔天空&type=mobile
*/
export const searchSuggest = async (data) => {
  const [error, res] = await to(request.post("/search/suggest"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 搜索多重匹配
/* 
说明 : 调用此接口 , 传入搜索关键词可获得搜索结果
必选参数 : keywords : 关键词
接口地址 : /search/multimatch
调用例子 : /search/multimatch?keywords=海阔天空
*/
export const searchMultimatch = async (data) => {
  const [error, res] = await to(request.post("/search/multimatch"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 手机登录
/**
必选参数
phone: 手机号码
password: 密码
调用例子: /login/cellphone ? phone = xxx & password=yyy / login / cellphone ? phone = xxx & md5_password=yyy / login / cellphone ? phone = xxx & captcha=1234
*/
export const loginByPhone = async (data) => {
  const [error, res] = await to(request.post(`/login/cellphone?phone=${data.phone}&captcha=${data.captcha}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 发送验证码
/**
必选参数 : phone: 手机号码
可选参数 : ctcode: 国家区号,默认 86 即中国
接口地址 : /captcha/sent
调用例子 : /captcha/sent?phone=13xxx
 */
export const sendValidCode = async (data) => {
  const [error, res] = await to(request.post(`/captcha/sent?phone=${data.phone}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 验证验证码
/* 
必选参数 : 
      phone: 手机号码
      captcha: 验证码
可选参数 :
      ctcode: 国家区号,默认 86 即中国
接口地址 : /captcha/verify
调用例子 : /captcha/verify?phone=13xxx&captcha=1597
*/
export const verifyCaptcha = async (data) => {
  const [error, res] = await to(request.post("/captcha/verify?noCookie=true"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 邮箱登录
/* 
必选参数 :
    email: 163 网易邮箱
    password: 密码
可选参数 :
    md5_password: md5 加密后的密码,传入后 password 将失效
接口地址 : /login
调用例子 : /login?email=xxx@163.com&password=yyy
*/
export const loginByEmail = async (data) => {
  const [error, res] = await to(request.post("/login?noCookie=true"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 二维码登录
// 1. 二维码 key 生成接口
/* 
说明: 调用此接口可生成一个 key
接口地址 : /login/qr/key
*/
export const getQRCodeKey = async (data) => {
  const [error, res] = await to(request.post("/login/qr/key?noCookie=true"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 2. 二维码生成接口
/* 
必选参数: key,由第一个接口生成
可选参数: qrimg 传入后会额外返回二维码图片 base64 编码
接口地址 : /login/qr/create
调用例子 : /login/qr/create?key=xxx
*/
export const createQRCodeIMG = async (data) => {
  const [error, res] = await to(request.post(`/login/qr/create?key=${data.key}&qrimg=${data.qrimg}&timestamp=${data.timestamp}&noCookie=true`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 3. 二维码检测扫码状态接口
/* 
必选参数: key,由第一个接口生成
接口地址 : /login/qr/check
调用例子 : /login/qr/check?key=xxx
*/
export const checkQRLoginIsSuccessful = async (data) => {
  const [error, res] = await to(request.post("/login/qr/check"), data);
  console.log(res);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 游客登录
/* 
接口地址 : /register/anonimous
*/
export const loginByTourist = async () => {
  const [error, res] = await to(request.get("/register/anonimous?noCookie=true"));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 刷新登录状态
/* 
说明 : 调用此接口 , 可刷新登录状态,返回内容包含新的cookie(不支持刷新二维码登录的cookie)
调用例子 : /login/refresh
*/
export const refreshLoginStatus = async (data) => {
  const [error, res] = await to(request.post("/login/refresh"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 获取每日推荐歌单
/* 
说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
接口地址 : /recommend/resource
调用例子 : /recommend/resource
*/
export const getRecommendList = async (data) => {
  const [error, res] = await to(request.get("/recommend/resource"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 获取每日推荐歌曲
/* 
说明: 调用此接口, 可获得每日推荐歌曲(需要登录)
接口地址: /recommend/songs
调用例子: /recommend/songs
*/
export const getRecommendSongs = async (data) => {
  const [error, res] = await to(request.get("/recommend/songs"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 私人 FM
/* 
说明 : 私人 FM( 需要登录 )
接口地址 : /personal_fm
调用例子 : /personal_fm
*/
export const getPersonalFM = async (data) => {
  const [error, res] = await to(request.post("/personal_fm"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 歌单(网友精选碟)
/* 
说明: 调用此接口, 可获取网友精选碟歌单
可选参数: order: 可选值为 'new' 和 'hot', 分别对应最新和最热, 默认为 'hot'
cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部", 可从歌单分类接口获取(/playlist/catlist)
limit: 取出歌单数量, 默认为 50
offset: 偏移数量, 用于分页, 如 : (评论页数 - 1) * 50, 其中 50 为 limit 的值
接口地址: /top/playlist
调用例子: /top/playlist ? limit = 10 & order=new
*/
export const getTopPlayList = async (data) => {
  const [error, res] = await to(request.post("/top/playlist"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 精品歌单标签列表
/* 
说明 : 调用此接口 , 可获取精品歌单标签列表
接口地址 : /playlist/highquality/tags
调用例子 : /playlist/highquality/tags 
*/
export const getHighqualityTag = async (data) => {
  const [error, res] = await to(
    request.post("/playlist/highquality/tags"),
    data
  );
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 获取精品歌单
/* 
说明 : 调用此接口 , 可获取精品歌单
可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
limit: 取出歌单数量 , 默认为 50
before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
接口地址 : /top/playlist/highquality
调用例子 : /top/playlist/highquality?before=1503639064232&limit=3
*/
export const getHighqualityPlayList = async (data) => {
  const [error, res] = await to(
    request.post("/top/playlist/highquality"),
    data
  );
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 相关歌单推荐
/* 
说明 : 调用此接口,传入歌单 id 可获取相关歌单(对应页面 https://music.163.com/#/playlist?id=1)
必选参数 : id : 歌单 id
接口地址 : /related/playlist
调用例子 : /related/playlist?id=1
*/
export const getRelatedPlaylist = async (data) => {
  const [error, res] = await to(request.post("/related/playlist"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 获取歌单详情
/* 
说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 
接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
必选参数 : id : 歌单 id
可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
接口地址 : /playlist/detail
调用例子 : /playlist/detail?id=24381616
*/
export const getPlayListDetail = async (data) => {
  const [error, res] = await to(request.post("/playlist/detail"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 获取歌单所有歌曲
/* 
说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
必选参数 : id : 歌单 id
可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
可选参数 : offset : 默认值为0
接口地址 : /playlist/track/all
调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1
注：关于offset，你可以这样理解，假设你当前的歌单有200首歌
你传入limit=50&offset=0等价于limit=50，你会得到第1-50首歌曲
你传入limit=50&offset=50，你会得到第51-100首歌曲
如果你设置limit=50&offset=100，你就会得到第101-150首歌曲
*/
export const getPlaylistTrackAll = async (data) => {
  const [error, res] = await to(request.post("/playlist/track/all"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 歌单详情动态
/* 
说明 : 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
必选参数 : id : 歌单 id
接口地址 : /playlist/detail/dynamic
调用例子 : /playlist/detail/dynamic?id=24381616
*/
export const getPlaylistDetailDynamic = async (data) => {
  const [error, res] = await to(request.post("/detail/dynamic"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 歌单更新播放量
/* 
说明 : 调用后可更新歌单播放量
必选参数 : id : 歌单 id
接口地址 : /playlist/update/playcount
调用例子 : /playlist/update/playcount?id=24381616
*/
export const getPlaylistUpdatePlaycount = async (data) => {
  const [error, res] = await to(request.post("/update/playcount"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 音乐是否可用
/* 
说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
必选参数 : id : 歌曲 id
可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
接口地址 : /check/music
调用例子 : /check/music?id=33894312
*/
export const checkMusic = async (data) => {
  const [error, res] = await to(request.post("/check/music"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 获取音乐 url - 新版
/* 
说明 : 使用注意事项同上
必选参数 : id : 音乐 id level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, dolby => 杜比全景声, jymaster => 超清母带
接口地址 : /song/url/v1
调用例子 : /song/url/v1?id=33894312&level=exhigh /song/url/v1?id=405998841,33894312&level=lossless
说明：杜比全景声音质需要设备支持，不同的设备可能会返回不同码率的url。cookie需要传入os=pc保证返回正常码率的url。
*/
export const getSongUrl = async (data) => {
  const [error, res] = await to(request.post("/song/url/v1"), data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

// 所有榜单
/*
说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
调用例子 : /toplist

*/
// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }

// export const  = async (data) => {
//   const [error, res] = await to(request.post(""), data);
//   if (error) return console.log("请求出错:" + error);
//   return res.data;
// }
