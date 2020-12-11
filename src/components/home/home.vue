<template>
  <div>
    <van-search
      v-model="value"
      show-action
      label="地址"
      input-align="center"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <p>啊顶顶顶顶顶顶顶顶顶</p>
  </div>
</template>
<script>
export default {
  name: 'Home',
  props: {},
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onSearch() {
      console.log('搜索');
    },
  },
};
</script>
<style></style>
