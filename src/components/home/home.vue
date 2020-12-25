<template>
  <div>
    <van-search
      v-model="searchbarvalue"
      show-action
      input-align="center"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #left>
        <div style="padding-right: 15px" @click="gotomap">{{ district }}<van-icon name="location" /></div>
      </template>
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img width="100%" :src="item.imgs" style="display: block" alt="图片加载错误" />
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item icon="shop-o" text="商场" @click="gotomallslist" />
      <van-grid-item icon="cart-o" text="超市" @click="gotosupermarket" />
      <van-grid-item icon="fire-o" text="餐饮" @click="gotofood" />
      <van-grid-item icon="apps-o" text="综合" @click="gotocomprehensive" />
    </van-grid>
    <SellerListItem :listitem="mallslistitem" />
    <amap style="display: none" />
    <router-view></router-view>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { GetMall } from '@/request/api';
import SellerListItem from '@/components/base/seller-list-item/seller-list-item';
// import { getUrlParams } from '@/assets/utils/utils';
import amap from '@/components/base/amap/amap';

export default {
  name: 'Home',
  components: { SellerListItem, amap },
  props: {},
  data() {
    return {
      district: '',
      lng: 0, // 经纬度
      lat: 0,
      address: '',
      searchbarvalue: '',
      banner: [
        { id: 1, imgs: 'https://img.yzcdn.cn/vant/apple-1.jpg' },
        { id: 2, imgs: 'https://img.yzcdn.cn/vant/apple-2.jpg' },
      ],
      mallslistitem: [],
      mallsParams: { pageNum: 1, pageSize: 20 },
    };
  },
  mounted() {
    this.getmallinfo();
    this.getToken();
    setTimeout(this.getlocalitem(), 5000);

    // this.getwxinfo();
  },
  methods: {
    getlocalitem() {
      this.district = localStorage.getItem('district');
      console.log('地址' + this.district);
    },
    wxLogin() {
      let appid = 'wx4ff2d58212e9510b';
      // let appsecret = '3da6cf3cd9df3d981bffe14ac9576cac';
      // let scope = 'snsapi_userinfo';
      let redirect_uri = encodeURIComponent('http://www.qilin91.com/api/common/weixinLogin');
      let ua = window.navigator.userAgent.toLowerCase();
      // let state = uuid().replace('-', 'S').substring(0, 10).toUpperCase();
      // eslint-disable-next-line eqeqeq
      console.log(ua);

      // eslint-disable-next-line eqeqeq
      if (ua.match(/mobile/i) == 'mobile') {
        let url =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          appid +
          '&redirect_uri=' +
          redirect_uri +
          '&response_type=code&scope=snsapi_userinfo' +
          '#wechat_redirect';
        window.location.href = url;
        // console.log('wewewe' + url);s
      }
    },
    getwxinfo() {
      // 先检测是否有微信的信息，有的话不调用微信登陆
      this.wxLogin();
    },
    // 获取token
    getToken() {
      // let token = getUrlParams('token');
      let token =
        'Bearer eyJhbGciOiJSUzI1NiIsInppcCI6IkRFRiJ9.eNpMjzEOwjAMRe-SuQMtEGhuYxKjRkqTqnUkEGKEGTZWJjZGBu6DyjEIaahYrPct20_esc6vmGD5clHygk8LnrOMgacqNEFK5y0JUCr7sUKDhH-RQJsxGt3RGDqEVlZj9I2CsKmtws0w-C1Curr2VtM2a53B6IogsSW91hJIOzu0kjtxFEeOxyIlZeTkez8O_fPW36_96fg6X8J3uGmYyPkkvDyflcX-AwAA__8.NZcZ1JR0OxauF9kKXNwBkPbt4PvTpRBh4A2mpgXOxwaev_pGEE5E56mTDBC1gvTfX8xgO1cOHXde7WAcaVimzw';

      if (token !== null && token !== '' && token !== undefined) {
        localStorage.setItem('token', token);
        let tt = localStorage.getItem('token');
        console.log('token是' + tt);
      }
    },
    onSearch() {
      console.log('搜索');
    },
    // 获取商场信息
    getmallinfo() {
      let that = this;

      GetMall(that.mallsParams)
        .then((res) => {
          if (res.status === 200) {
            this.mallslistitem = res.data.data.list;
          } else {
            Toast('请检查获取店铺的网络通讯');
          }
        })
        .catch((err) => {
          console.log(err);
          Toast('请检查获取店铺的网络通讯');
        });
    },
    // 跳转商场列表
    gotomallslist() {
      this.$router.push('/mallslist');
    },
    gotosupermarket() {
      this.$router.push('/supermarket');
    },
    gotofood() {
      this.$router.push('/food');
    },
    gotomap() {
      this.$router.push('/amap');
    },
    gotocomprehensive() {
      this.$router.push('/comprehensive');
    },
    // 获取当前位置
  },
};
</script>
<style></style>
