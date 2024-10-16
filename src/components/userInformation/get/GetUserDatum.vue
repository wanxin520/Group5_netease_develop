<!-- eslint-disable spaced-comment -->
<!-- eslint-disable arrow-body-style -->
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const router = useRouter();

const musicshow = ref(false);
const schoolshow = ref(false);
const gendershow = ref(false);
const regionshow = ref(false);
const brithshow = ref(false);
const fieldValue = ref(""); // 用于性别显示
const brithValue = ref(""); // 用于生日显示
const regionValue = ref(""); // 用于地区显示
const schoolValue = ref(""); //用于学校显示
const musicValue = ref(""); //用于音乐显示

//生日功能
// const date = ref("");
// const show = ref(false);
// const formatDate = (dateValue) => {
//   return `${dateValue.getFullYear()}/${
//     dateValue.getMonth() + 1
//   }/${dateValue.getDate()}`;
// };

// const onConfirm = (value) => {
//   show.value = false;
//   date.value = formatDate(value);
// };

const usergender = [{ text: "男" }, { text: "女" }, { text: "沃尔玛的塑料袋" }];
const userschool = [{ text: "学校A" }, { text: "学校B" }];
const userregion = [
  { text: "北京市" },
  { text: "天津市" },
  { text: "河北省" },
  { text: "山西省" },
  { text: "内蒙古自治区" },
  { text: "辽宁省" },
  { text: "吉林省" },
  { text: "黑龙江省" },
  { text: "上海市" },
  { text: "江苏省" },
  { text: "浙江省" },
  { text: "安徽省" },
  { text: "福建省" },
  { text: "江西省" },
  { text: "山东省" },
  { text: "河南省" },
  { text: "湖北省" },
  { text: "湖南省" },
  { text: "广东省" },
  { text: "广西壮族自治区" },
  { text: "海南省" },
  { text: "重庆市" },
  { text: "四川省" },
  { text: "贵州省" },
  { text: "云南省" },
  { text: "西藏自治区" },
  { text: "陕西省" },
  { text: "甘肃省" },
  { text: "青海省" },
  { text: "宁夏回族自治区" },
  { text: "新疆维吾尔自治区" },
  { text: "香港特别行政区" },
  { text: "澳门特别行政区" },
];
const usermusic = [{ text: "A" }, { text: "B" }];
//性别点击
const onFinish = ({ selectedOptions }) => {
  gendershow.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join("/");
};
//地区点击
const onRegion = ({ selectedOptions }) => {
  regionshow.value = false;
  regionValue.value = selectedOptions.map((option) => option.text).join("/");
};
//学校点击
const onSchool = ({ selectedOptions }) => {
  schoolshow.value = false;
  schoolValue.value = selectedOptions.map((option) => option.text).join("/");
};
//音乐点击
const onMusic = ({ selectedOptions }) => {
  musicshow.value = false;
  musicValue.value = selectedOptions.map((option) => option.text).join("/");
};
//生日样式
const formatDate = (date) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const onConfirm = (value) => {
  brithshow.value = false;
  const formattedDate = formatDate(value);
  brithValue.value = formattedDate; // 更新生日变量
};

// 返回上一个页面
const toBack = () => {
  router.go(-1);
};
</script>
<template>
  <div>
    <!-- 顶部 -->
    <div class="top">
      <!-- <van-nav-bar title="我的资料" left-arrow @click-left="toBack" /> -->
      <div class="van-nav-bar van-hairline--bottom">
        <div class="van-nav-bar__content">
          <div class="van-nav-bar__left van-haptics-feedback" @click="toBack">
            <Icon icon="ooui:arrow-next-rtl" style="font-size: 24px"></Icon>
          </div>
          <div class="van-nav-bar__title van-ellipsis">我的资料</div>
        </div>
      </div>
    </div>
    <!-- 头像 -->
    <div class="w-[100%] flex justify-center items-center">
      <div
        class="w-[7.2rem] h-[7.2rem] rounded-[50%] bg-[rgb(200,217,230)] flex justify-center items-center"
      >
        <img
          class="w-[7rem] h-[7rem] rounded-[50%]"
          src="http://p2.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="w-[100%] flex justify-center flex-direction-row">
      <div
        class="w-[5rem] h-[5vw] flex items-center justify-center bg-[rgb(192,192,192)] rounded-[30%]"
        style="margin-top: -1vw"
      >
        <Icon icon="ion:camera-sharp" class="margin-right-5vw"></Icon>
        <div>更换</div>
      </div>
    </div>
    <!-- 主体 -->
    <div>
      <van-cell-group inset>
        <!-- 昵称 -->
        <van-field is-link label="昵称" readonly />
        <!-- 性别 -->
        <van-field
          v-model="fieldValue"
          is-link
          readonly
          label="性别"
          placeholder="请选择"
          @click="gendershow = true"
          style="border-bottom: none"
        />
        <van-popup v-model:show="gendershow" round position="bottom">
          <van-cascader
            v-model="fieldValue"
            :options="usergender"
            @close="gendershow = false"
            @finish="onFinish"
          />
        </van-popup>
        <!-- 我的二维码 -->

        <!-- <van-field
          is-link
          readonly
          label="我的二维码"
          style="border-bottom: none"
        />       -->
        <div
          class="van-cell van-cell--clickable van-field"
          role="button"
          tabindex="0"
        >
          <div class="van-cell__title van-field__label">
            <label
              id="van-field-3-label"
              for="van-field-3-input"
              data-allow-mismatc="attribute"
              >我的二维码</label
            >
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                type="text"
                id="van-field-3-input"
                class="van-field__control"
                aria-labelledby="van-field-3-label"
                data-allow-mismatch="attribute"
                readonly
              />
            </div>
          </div>
          <Icon
            icon="ph:qr-code-light"
            style="margin-top: 1.5vw; font-size: 24px"
          />
          <i
            class="van-badge__wrapper van-icon van-icon-arrow van-cell__right-icon"
          >
          </i>
        </div>

        <!-- 我的村龄 -->
        <van-field
          label="我的村龄"
          model-value="××天(20××年×月×日创建)"
          readonly
        />
        <!-- IP属地 -->
        <van-field label="IP属地" model-value="湖北" readonly />
      </van-cell-group>
    </div>
    <div style="margin-top: 5vw">
      <!-- 生日 -->
      <van-cell-group inset>
        <!-- 日历样式 -->
        <van-field
          label="生日"
          readonly
          v-model="brithValue"
          is-link
          @click="brithshow = true"
          model-value="请选择日期"
        />
        <van-calendar v-model:show="brithshow" @confirm="onConfirm" />
        <!-- 日历功能 -->
        <!-- <van-cell title="生日" :value="date" @click="show = true" placeholder="请选择日期" />
        <van-calendar v-model:show="show" @confirm="onConfirm" /> -->
        <!-- 地区 -->
        <van-field
          v-model="regionValue"
          is-link
          readonly
          label="地区"
          placeholder="请选择所在地区"
          @click="regionshow = true"
        />
        <van-popup v-model:show="regionshow" round position="bottom">
          <van-cascader
            v-model="regionValue"
            title="请选择所在地区"
            :options="userregion"
            @close="regionshow = false"
            @finish="onRegion"
          />
        </van-popup>
        <!-- 学校 -->
        <van-field
          v-model="schoolValue"
          is-link
          readonly
          label="大学"
          placeholder="请选择"
          @click="schoolshow = true"
        />
        <van-popup v-model:show="schoolshow" round position="bottom">
          <van-cascader
            v-model="schoolValue"
            :options="userschool"
            @close="schoolshow = false"
            @finish="onSchool"
          />
        </van-popup>
        <!-- 音乐 -->
        <van-field
          v-model="musicValue"
          is-link
          readonly
          label="音乐标签"
          placeholder="请选择"
          @click="musicshow = true"
        />
        <van-popup v-model:show="musicshow" round position="bottom">
          <van-cascader
            v-model="musicValue"
            :options="usermusic"
            @close="musicshow = false"
            @finish="onMusic"
          />
        </van-popup>
        <!-- 简介 -->
        <van-field is-link readonly label="简介" placeholder="介绍一下自己吧" />
      </van-cell-group>
    </div>
    <div style="margin-top: 5vw">
      <van-cell-group inset>
        <!-- 云音乐等级 -->
        <van-field is-link readonly label="云音乐等级" />
        <!-- 个人相册 -->
        <van-field
          is-link
          readonly
          label="个人相册"
          placeholder="上传照片介绍自己"
        />
        <!-- 村民证 -->
        <van-field is-link readonly label="村民证" placeholder="领取村民证" />
      </van-cell-group>
    </div>
    <div style="margin-top: 5vw">
      <van-cell-group inset>
        <!-- 个人主页隐私设置 -->
        <van-field is-link readonly label="个人主页隐私设置" />
        <!-- 账号与绑定设置 -->
        <van-field is-link readonly label="村账号与绑定设置民证" />
      </van-cell-group>
    </div>
  </div>
</template>
<style>
.van-field__control::placeholder {
  text-align: right;
}

#van-field-2-input {
  text-align: right;
}
#van-field-3-input {
  text-align: right;
}
#van-field-4-input {
  text-align: right;
}
#van-field-5-input {
  text-align: right;
}
#van-field-6-input {
  text-align: right;
}
#van-field-7-input {
  text-align: right;
}
#van-field-8-input {
  text-align: right;
}
#van-field-9-input {
  text-align: right;
}
#van-cell__title van-field__label {
  width: 15vw;
}
</style>
