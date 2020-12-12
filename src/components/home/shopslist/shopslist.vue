<template>
  <div>
    <van-card
      v-for="item in shopslistinfo"
      :key="item.rowguid"
      :desc="item.shopaddress"
      :thumb="item.shoplogo"
      @click="gotoshopdetail(item.rowguid)"
    >
      <template #title>
        <span style="font-size: 16px">{{ item.shopname }}</span>
      </template>
      <template #tag>
        <van-tag plain type="danger">认证商家</van-tag>
      </template>
      <template #tags>
        <van-tag type="danger">欢迎新用户活动</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">查看详细</van-button>
      </template>
      <template #price>
        <label>商家电话{{ item.shopphone }}</label>
      </template>
      <template #bottom>
        <div>距离****米</div>
      </template>
    </van-card>
  </div>
</template>

<script>
import { GetShop } from '@/request/api';
export default {
  data() {
    return {
      shopsParams: { mallid: '', pageNum: 1, pageSize: 30 },
      shopslistinfo: [],
    };
  },
  created() {
    this.getshoplist();
  },
  methods: {
    getshopid() {
      this.shopsParams.mallid = this.$route.query.mallid;
    },
    // 获取商城里面的店铺
    getshoplist() {
      let that = this;
      that.getshopid();
      GetShop(that.shopsParams)
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.data.list);
            that.shopslistinfo = res.data.data.list;
          } else {
            this.$toast('网络状态' + res.status);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast('请检查服务器连接');
        });
    },
    // 跳转商品详情
    gotoshopdetail(shopid) {
      this.$router.push('/shopdetail?shopid=' + shopid);
    },
  },
};
</script>

<style></style>
