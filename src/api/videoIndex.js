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

/* 

最新 mv
说明 : 调用此接口 , 可获取最新 mv

可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部

可选参数 : limit: 取出数量 , 默认为 30

接口地址 : /mv/first

调用例子 : /mv/first?limit=10

*/

/* 
网易出品 mv
说明 : 调用此接口 , 可获取网易出品 mv

可选参数 : limit: 取出数量 , 默认为 30

offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0

接口地址 : /mv/exclusive/rcmd

调用例子 : /mv/exclusive/rcmd?limit=10
*/

/*  
推荐 mv
说明 : 调用此接口 , 可获取推荐 mv

接口地址 : /personalized/mv

调用例子 : /personalized/mv
*/