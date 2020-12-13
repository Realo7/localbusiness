<!-- 地图 -->
<template>
  <div class="amap-page-container mainss">
    <van-nav-bar :title="address" left-text="返回" left-arrow @click-left="onClickLeft" />
    <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center" :zoom="zoom" :events="events">
      <!-- 点击显示标记 -->
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="marker.index"
        :position="marker.position"
        :icon="marker.icon"
        :title="marker.title"
        :events="marker.events"
        :visible="marker.visible"
        :draggable="marker.draggable"
        :vid="index"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
export default {
  data() {
    let self = this;
    return {
      address: '', // 获取的位置
      zoom: 14, // 地图缩放
      center: [121.59996, 31.197646], // 初始中心
      lng: 0, // 经纬度
      lat: 0,
      loaded: false,
      // 点击显示的标记默认的定位
      markers: [
        {
          position: [121.59996, 31.197646],
        },
      ],
      //  自动定位到当前位置
      plugin: [
        {
          timeout: 100, // 超过10秒后停止定位，默认：无穷大
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          pName: 'Geolocation',
          events: {
            click(e) {
              // alert(1)
            },
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(status, result);
                console.log(result.formattedAddress);

                if (result && result.position) {
                  self.address = result.formattedAddress;
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
          },
        },
      ],
      // 点击地图获取当前位置并显示标记
      events: {
        click(e) {
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;

          self.markers = [
            {
              position: [self.lng, self.lat],
              icon: '',
              title: '',
              events: {
                click(o) {},
              },
            },
          ];
          // 这里通过高德 SDK 完成。
          let geocoder = new this.$AMap.Geocoder({
            radius: 1000,
            extensions: 'all',
          });
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress; // 获取到位置
                console.log(self.address);

                self.$nextTick();
              }
            }
          });
        },
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.mainss {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  background: #efefef;
}
/* 要是不显示给地图加上宽高 */
.amap-demo {
  width: 100%;
}
</style>
