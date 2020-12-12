<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return { detailParams: { shopid: '', pageNum: 1, pageSize: 20 } };
  },
  created() {
    this.getshopid();
  },
  methods: {
    getshopid() {
      this.detailParams.shopid = this.$route.query.shopid;
    },
  },
};
</script>

<style></style>
