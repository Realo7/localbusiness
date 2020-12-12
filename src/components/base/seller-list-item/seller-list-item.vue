<template>
  <!-- // 商场和商铺的展示区块 -->
  <div>
    <van-card
      v-for="item in listitem"
      :key="item.rowguid"
      :desc="item.shopaddress"
      :title="item.shopname"
      :thumb="item.shoplogo"
    >
      <template #tags>
        <van-tag plain type="danger">限时特惠</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">查看详细</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  props: ['listitem'],
};
</script>

<style></style>
