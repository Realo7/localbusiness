<template>
  <!-- 商场列表展示 -->
  <div class="malls">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        animation-duration="300"
        @load="onLoad"
      >
        <SellerListItem :listitem="mallslistitem" @click="gotoshoplist" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { GetMall } from '@/request/api';
import SellerListItem from '@/components/base/seller-list-item/seller-list-item';

export default {
  name: 'Mallslist',
  components: { SellerListItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      mallsParams: { pageNum: 1, pageSize: 10 },
      mallslistitem: [],
    };
  },
  methods: {
    onLoad() {
      this.mallsParams.pageNum++;
      this.getmallinfo();
      this.loading = false;
    },
    // 下拉刷新
    onRefresh() {
      this.mallslistitem = [];
      this.mallsParams.pageNum = 1;
      this.loading = true;
      this.getmallinfo();
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    // 获取商场信息
    getmallinfo() {
      let that = this;
      this.loading = true;
      GetMall(that.mallsParams)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.mallslistitem = res.data.data.list;
            this.loading = false;
          } else {
            Toast('请检查获取店铺的网络通讯');
          }
        })
        .catch((err) => {
          console.log(err);
          Toast('请检查获取店铺的网络通讯');
        });
    },
    gotoshopslist() {
      this.$router.push('');
    },
  },
};
</script>

<style>
.malls {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  background: #efefef;
  /* background: rgba(0, 0, 0, 0.5); */
}
</style>
