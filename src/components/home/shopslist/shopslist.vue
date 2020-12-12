<!-- 商家列表 组件 -->

<template>
  <div class="seller-list-item" @click="toRestaurant(data)">
    <div class="left">
      <img v-lazy="data.pic_url" />
    </div>

    <div class="right">
      <div class="name">{{ data.name }}</div>

      <div class="mid clearfix">
        <span class="count fl">月售{{ data.month_sale_num }}</span>
        <span class="distance fr">{{ data.distance }}</span>
        <span class="time fr">{{ data.avg_delivery_time }}分钟</span>
      </div>

      <div class="fee">
        <span class="start">{{ data.min_price_tip }}</span>
        <span class="deliver">{{ data.shipping_fee_tip }}</span>
        <span class="average">{{ data.average_price_tip }}</span>
      </div>

      <div v-for="sup in data.discounts2" :key="sup.id" class="activity">
        <p><img :src="sup.icon_url" />{{ sup.info }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.malls {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  background: #efefef;
  /* background: rgba(0, 0, 0, 0.5); */
}
.seller-list-item {
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  overflow: hidden;
  @include onepx('bottom');
}
.left {
  flex: 0 0 90px;
  width: 90px;
  img {
    display: block;
    width: 70px;
    margin: 0 auto;
  }
}

.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  overflow: hidden;
  .name {
    font-size: 17px;
    color: #333;
    overflow: hidden;
    font-weight: bold;
    margin-right: 15px;
    overflow: hidden;
    @include ellipsis(1);
  }
  .mid {
    flex: 1;
    font-size: 12px;
    color: #666;
    margin-top: 7px;

    .count {
      margin-left: 10px;
    }
    .distance {
      margin-left: 5px;
      margin-top: 2px;
    }
    .time {
      @include right-bar();
    }
  }
  .fee {
    flex: 1;
    font-size: 13px;
    margin-top: 7px;
    span {
      display: inline-block;
      color: #656565;
    }
    .start {
      @include right-bar();
    }
    .deliver {
      @include right-bar();
    }
  }
  .activity {
    flex: 1;
    font-size: 13px;
    color: #b0b0b0;
    margin-top: 7px;
    p {
      @include ellipsis(1);
    }
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      vertical-align: top;
    }
  }
}
</style>
