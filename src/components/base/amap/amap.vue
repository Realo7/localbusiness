<!-- 地图 -->
<template>
  <div class="amap-page-container">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="mainss">
      <el-amap vid="amap" :amap-manager="amapmanager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      </el-amap>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { lazyAMapApiLoaderInstance, AMapManager } from 'vue-amap';
let amapmanager = new AMapManager();
export default {
  name: 'Amap',
  data() {
    const self = this;
    return {
      address: '',
      map: null,
      zoom: 16,
      center: [116.404765, 39.918052],
      amapmanager,
      events: {
        init(o) {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initMap();
          });
        },
      },
    };
  },
  mounted() {
    // this.initMap();
  },
  methods: {
    initMap() {
      this.map = amapmanager.getMap();

      //   // 设置标记点

      // let maker = new AMap.Marker({
      //   position: [116.404765, 39.918052],
      // });
      // 定位

      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：无穷大
        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, // 显示定位按钮，默认：true
        buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        noIpLocate: 0,
        noGeoLocation: 0,
      });
      this.map.addControl(geolocation);
      geolocation.getCurrentPosition();
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          console.log('定位结果' + result);
          console.log(result);
          console.log(result.formattedAddress);
          console.log(result.addressComponent.district);
          localStorage.setItem('GDaddress', result.formattedAddress);
          localStorage.setItem('lng', result.position.lng);
          localStorage.setItem('lat', result.position.lat);
          localStorage.setItem('district', result.addressComponent.district);
        } else {
          console.log('有点小问题' + status);
        }
      });
      console.log(this.map);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.mainss {
  width: 100%;
  height: 4rem;
  position: absolute;
  top: 0.5rem;
  z-index: 99;
  background: #efefef;
}
/* 要是不显示给地图加上宽高 */
.amap-demo {
  width: 100%;
}
</style>
