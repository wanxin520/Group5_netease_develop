/**
 * @注意 :
 *  在开发过程中，此文件的 模块导入 以及 方法命名在 非必要情况下不要改动
 *
 *  如若需要改动请在微信群里进行说明
 *
 */
import to from "await-to-js";
import request from "./request";
/* 
获取歌单详情
说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 
接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
必选参数 : id : 歌单 id
可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
接口地址 : /playlist/detail
调用例子 : /playlist/detail?id=24381616
*/

export const getPlaylistDetail = async (data) => {
  const [error, res] = await to(request.post(`/playlist/detail?id=${data.id}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

/* 
获取歌单所有歌曲
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
export const getPlaylistAllSongs = async (data) => {
  const [error, res] = await to(request.post(`/playlist/detail?id=${data.id}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};


/* 
获取音乐 url - 新版
说明 : 使用注意事项同上
必选参数 : id : 音乐 id level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, dolby => 杜比全景声, jymaster => 超清母带
接口地址 : /song/url/v1
调用例子 : /song/url/v1?id=33894312&level=exhigh /song/url/v1?id=405998841,33894312&level=lossless
说明：杜比全景声音质需要设备支持，不同的设备可能会返回不同码率的url。cookie需要传入os=pc保证返回正常码率的url。
*/
export const getSongsUrl = async (data) => {
  const [error, res] = await to(request.post(`/song/url?id=${data.id}&cookie=${data.cookie}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};


/* 
获取歌曲详情
说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长)
必选参数 : ids: 音乐 id, 如 ids=347230
接口地址 : /song/detail
调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
返回字段说明(感谢 @tuxzz 整理):
name: String, 歌曲标题
id: u64, 歌曲ID
pst: 0，功能未知
t: enum,
  0: 一般类型
  1: 通过云盘上传的音乐，网易云不存在公开对应
    如果没有权限将不可用，除了歌曲长度以外大部分信息都为null。
    可以通过 `/api/v1/playlist/manipulate/tracks` 接口添加到播放列表。
    如果添加到“我喜欢的音乐”，则仅自己可见，除了长度以外各种信息均为未知，且无法播放。
    如果添加到一般播放列表，虽然返回code 200，但是并没有效果。
    网页端打开会看到404画面。
    属于这种歌曲的例子: https://music.163.com/song/1345937107
  2: 通过云盘上传的音乐，网易云存在公开对应
    如果没有权限则只能看到信息，但无法直接获取到文件。
    可以通过 `/api/v1/playlist/manipulate/tracks` 接口添加到播放列表。
    如果添加到“我喜欢的音乐”，则仅自己可见，且无法播放。
    如果添加到一般播放列表，则自己会看到显示“云盘文件”，且云盘会多出其对应的网易云公开歌曲。其他人看到的是其对应的网易云公开歌曲。
    网页端打开会看到404画面。
    属于这种歌曲的例子: https://music.163.com/song/435005015
ar: Vec<Artist>, 歌手列表
alia: Vec<String>,
  别名列表，第一个别名会被显示作副标题
  例子: https://music.163.com/song/536623501
pop: 小数，常取[0.0, 100.0]中离散的几个数值, 表示歌曲热度
st: 0: 功能未知
rt: Option<String>, None、空白字串、或者类似`600902000007902089`的字符串，功能未知
fee: enum,
  0: 免费或无版权
  1: VIP 歌曲
  4: 购买专辑
  8: 非会员可免费播放低音质，会员可播放高音质及下载
  fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
v: u64, 常为[1, ?]任意数字, 代表歌曲当前信息版本
version: u64, 常为[1, ?]任意数字, 代表歌曲当前信息版本
crbt: Option<String>, None或字符串表示的十六进制，功能未知
cf: Option<String>, 空白字串或者None，功能未知
al: Album, 专辑，如果是DJ节目(dj_type != 0)或者无专辑信息(single == 1)，则专辑id为0
dt: u64, 歌曲时长
hr: Option<Quality>, Hi-Res质量文件信息
sq: Option<Quality>, 无损质量文件信息
h: Option<Quality>, 高质量文件信息
m: Option<Quality>, 中质量文件信息
l: Option<Quality>, 低质量文件信息
a: Option<未知>, 常为None, 功能未知
cd: Option<String>, None或如"04", "1/2", "3", "null"的字符串，表示歌曲属于专辑中第几张CD，对应音频文件的Tag
no: u32, 表示歌曲属于CD中第几曲，0表示没有这个字段，对应音频文件的Tag
rtUrl: Option<String(?)>, 常为None, 功能未知
rtUrls: Vec<String(?)>, 常为空列表, 功能未知
djId: u64,
  0: 不是DJ节目
  其他：是DJ节目，表示DJ ID
copyright: u32, 0, 1, 2: 功能未知
s_id: u64, 对于t == 2的歌曲，表示匹配到的公开版本歌曲ID
mark: u64, 一些歌曲属性，用按位与操作获取对应位置的值
  8192 立体声?(不是很确定)
  131072 纯音乐
  262144 支持 杜比全景声(Dolby Atmos)
  1048576 脏标 🅴
  17179869184 支持 Hi-Res
  其他未知，理论上有从1到2^63共64种不同的信息
  专辑信息的mark字段也同理
  例子:id 1859245776 和 1859306637 为同一首歌，前者 mark & 1048576 == 1048576,后者 mark & 1048576 == 0，因此前者是脏版。

originCoverType: enum
  0: 未知
  1: 原曲
  2: 翻唱
originSongSimpleData: Option<SongSimpleData>, 对于翻唱曲，可选提供原曲简单格式的信息
single: enum,
  0: 有专辑信息或者是DJ节目
  1: 未知专辑
noCopyrightRcmd: Option<NoCopyrightRcmd>, 不能判断出歌曲有无版权
mv: u64, 非零表示有MV ID
rtype: 常为0，功能未知
rurl: Option<String(?)>, 常为None，功能未知
mst: u32, 偶尔为0, 常为9，功能未知
cp: u64, 功能未知
publishTime: i64, 毫秒为单位的Unix时间戳
pc: 云盘歌曲信息，如果不存在该字段，则为非云盘歌曲
privilege:权限相关信息
  cs:bool,是否为云盘歌曲
  st:小于0时为灰色歌曲, 使用上传云盘的方法解灰后 st == 0
  toast:bool,是否「由于版权保护，您所在的地区暂时无法使用。」
  flLevel:免费用户的该歌曲播放音质
  plLevel:当前用户的该歌曲最高试听音质
  dlLevel:当前用户的该歌曲最高下载音质
  maxBrLevel；歌曲最高音质
*/
export const getSongsDetail = async (data) => {
  const [error, res] = await to(request.post(`/song/detail?ids=${data.id}&cookie=${data.cookie}`));
  if (error) return console.log("请求出错:" + error);
  return res.data;
};

/* 
获取歌词
说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
必选参数 : id: 音乐 id
接口地址 : /lyric
调用例子 : /lyric?id=33894312
获取逐字歌词
说明 : 此接口的 yrc 字段即为逐字歌词 (可能有歌曲不包含逐字歌词)
必选参数 : id: 音乐 id
接口地址 : /lyric/new
调用例子 : /lyric/new?id=1824020871
相关讨论可见: Issue
歌词格式解析 :
当逐字歌词适用时，yrc的lyric字段包括形式如下的内容
（可能存在）JSON 歌曲元数据
{"t":0,"c":[{"tx":"作曲: "},{"tx":"柳重言","li":"http://p1.music.126.net/Icj0IcaOjH2ZZpyAM-QGoQ==/6665239487822533.jpg","or":"orpheus://nm/artist/home?id=228547&type=artist"}]}
{"t":5403,"c":[{"tx":"编曲: "},{"tx":"Alex San","li":"http://p1.music.126.net/pSbvYkrzZ1RFKqoh-fA9AQ==/109951166352922615.jpg","or":"orpheus://nm/artist/home?id=28984845&type=artist"}]}
{"t":10806,"c":[{"tx":"制作人: "},{"tx":"王菲","li":"http://p1.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg","or":"orpheus://nm/artist/home?id=9621&type=artist"},{"tx":"/"},{"tx":"梁荣骏","li":"http://p1.music.126.net/QrD8drwrRcegfKLPoiiG2Q==/109951166288436155.jpg","or":"orpheus://nm/artist/home?id=189294&type=artist"}]}
该字段不一定出现；可能出现的数据意义有：
t : 数据显示开始时间戳 (毫秒)
c : 元数据list
tx: 文字段
li: 艺术家、歌手头像图url
or：云音乐app内路径；例中作用即打开艺术家主页
逐字歌词
[16210,3460](16210,670,0)还(16880,410,0)没...
~~~~1 ~~~2  ~~~~3 ~~4 5 ~6 (...) 
由标号解释:
歌词行显示开始时间戳 (毫秒)
歌词行显示总时长(毫秒)
逐字显示开始时间戳 (毫秒)
逐字显示时长 (厘秒/0.01s)
未知
文字
yrc的version字段貌似与lyric字段格式无关
*/
export const getSongsLyric = async (data) => {
  const [error, res] = await to(request.post(`/lyric/new?id=${data.id}`));

  if (error) return console.log("请求出错:" + error);
  return res.data;
};

/* 
最近播放-歌曲
说明 : 调用此接口 , 可获得最近播放-歌曲
可选参数 : limit : 返回数量 , 默认为 100
接口地址 : /record/recent/song
调用例子 : /record/recent/song?limit=1
*/
export const getRecordSongs = async (data) => {
  const [error, res] = await to(request.post(`/record/recent/song?cookie=${data.cookie}`));
  console.log(error.data);
  console.log(data);
  if (error) return console.log("请求出错:" + error);
  return res.data;
};