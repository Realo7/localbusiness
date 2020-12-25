<template>
  <div>
    <!-- 我的商铺 -->
    <div v-if="!haveshops">
      <van-empty description="该用户暂时没有注册的商店" />
    </div>
    <div v-if="haveshops">
      <van-card
        v-for="item in usershopslistinfo"
        :key="item.rowguid"
        :desc="item.shopaddress"
        :thumb="item.shoplogo"
        @click="shopmana(item.rowguid)"
      >
        <template #title>
          <span style="font-size: 16px">{{ item.shopname }}</span>
        </template>
        <template #tag>
          <van-tag plain type="danger">认证商家</van-tag>
        </template>
        <template #tags>
          <!-- <van-tag type="danger">欢迎新用户活动</van-tag> -->
        </template>
        <template #footer>
          <van-button size="mini">进入编辑商店</van-button>
        </template>
        <template #price>
          <label>商家电话：{{ item.shopphone }}</label>
        </template>
        <template #bottom>
          <!-- <div>距离****米</div> -->
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { getUserShop } from '@/request/api';
export default {
  data() {
    return {
      usershopsParams: { type: 1 },
      usershopslistinfo: [],
      haveshops: true,
    };
  },
  created() {
    this.gettoken();
    this.getusershops();
  },
  mounted() {
    this.shopmana();
  },
  methods: {
    gettoken() {
      this.token = localStorage.getItem('token');
    },
    getfoodshopid() {
      this.shopsParams.mallid = this.$route.query.mallid;
    },
    // 获取该用户的店铺
    getusershops() {
      let that = this;
      // let config = { headers: { Authorization: this.token } };
      getUserShop(that.usershopsParams)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.data);
            that.usershopslistinfo = res.data.data;
            if (that.usershopslistinfo.length === 0) {
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
          that.haveshops = false;
        });
    },
    // 跳转商店商品管理
    shopmana(shopid) {
      window.location.href = 'http://www.99bianyi.com:8090/WzAdmin/login_init';
    },
  },
};
</script>

<style></style>
