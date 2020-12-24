<template>
  <div>
    <div v-if="!haveshops">
      <van-empty description="该区域暂时没有注册的餐饮" />
    </div>
    <div v-if="haveshops">
      <van-card
        v-for="item in foodshopslistinfo"
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
          <!-- <div>距离****米</div> -->
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { getKindShop } from '@/request/api';
export default {
  data() {
    return {
      foodshopsParams: { type: 1, pageNum: 1, pageSize: 30 },
      foodshopslistinfo: [],
      haveshops: true,
    };
  },
  created() {
    this.getfoodshoplist();
  },
  methods: {
    getfoodshopid() {
      this.shopsParams.mallid = this.$route.query.mallid;
    },
    // 获取餐饮的的店铺
    getfoodshoplist() {
      let that = this;
      getKindShop(that.foodshopsParams)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.data);
            that.foodshopslistinfo = res.data.data;
            if (that.foodshopslistinfo.length === 0) {
              that.haveshops = false;
            } else {
              that.haveshops = true;
            }
          } else {
            this.$toast('网络状态' + res.status);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast('请检查服务器连接');
        });
    },
    // 跳转商店详情
    gotoshopdetail(shopid) {
      this.$router.push('/shopdetail?shopid=' + shopid);
    },
  },
};
</script>

<style></style>
