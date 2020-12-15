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
        <div style="padding-right: 15px" @click="gotomap">地址<van-icon name="location" /></div>
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
      <van-grid-item icon="gem" text="商场" @click="gotomallslist" />
      <van-grid-item icon="live" text="美食" />
      <van-grid-item icon="audio" text="便民" />
      <van-grid-item icon="invition" text="电影" />
    </van-grid>
    <SellerListItem :listitem="mallslistitem" />
    <router-view></router-view>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { GetMall } from '@/request/api';
import SellerListItem from '@/components/base/seller-list-item/seller-list-item';

export default {
  name: 'Home',
  components: { SellerListItem },
  props: {},
  data() {
    return {
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
    // this.GetCode();
  },
  methods: {
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
    gotomap() {
      this.$router.push('/amap');
    },
    // 获取当前位置
  },
};
</script>
<style></style>
