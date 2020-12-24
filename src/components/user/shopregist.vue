<template>
  <div>
    <van-nav-bar title="商铺注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="shopname"
          name="shopname"
          label="商铺名"
          placeholder="商铺名"
          :rules="[{ required: true, message: '请填写商城名字' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="商铺密码"
          placeholder="商铺密码"
          :rules="[{ required: true, message: '请设置密码' }]"
        />
        <van-field
          readonly
          clickable
          name="jytype"
          :value="jytype"
          label="经营类型"
          placeholder="选择经营类型"
          @click="showPicker3 = true"
        />
        <van-popup v-model="showPicker3" position="bottom">
          <van-picker
            title="选择您的经营类型"
            show-toolbar
            :columns="jytypecolumns"
            @confirm="onConfirm3"
            @cancel="showPicker3 = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="area"
          :value="areavalue"
          label="地区"
          placeholder="点击选择城市"
          @click="showPicker1 = true"
        />
        <van-popup v-model="showPicker1" position="bottom">
          <van-picker show-toolbar :columns="SSQcolumns" @confirm="onConfirm1" @cancel="showPicker1 = false" />
        </van-popup>
        <van-field
          v-model="shopaddress"
          name="shopaddress"
          label="地址"
          placeholder="请输入商铺地址"
          :rules="[{ required: true, message: '请输入商铺地址' }]"
        />
        <van-field
          v-model="shopfzr"
          name="shopfzr"
          label="商铺负责人"
          placeholder="请输入商铺负责人"
          :rules="[{ required: true, message: '请输入商铺负责人' }]"
        />
        <van-field
          v-model="shopfzrnum"
          name="shopfzrnum"
          label="负责人电话"
          placeholder="请输入商铺负责人电话"
          :rules="[{ required: true, message: '请输入商铺负责人电话' }]"
        />

        <van-field
          readonly
          clickable
          name="parentMallid"
          :value="parentMall"
          label="所属商城"
          placeholder="选择所属商城"
          @click="showPicker2 = true"
        />
        <van-popup v-model="showPicker2" position="bottom">
          <van-picker
            title="选择您所属商城"
            show-toolbar
            :columns="mallcolumns"
            @confirm="onConfirm2"
            @cancel="showPicker2 = false"
          />
        </van-popup>
        <van-field name="shoplogo" label="商家logo上传">
          <template #input>
            <van-uploader v-model="uploader" :after-read="fileupload" />
          </template>
        </van-field>
        <van-field v-model="invitephone" name="inviter" label="邀请人手机号" placeholder="邀请人手机(可选)" />
        <div style="margin: 0 14px">
          <van-button round block type="info" native-type="submit"> 提交 </van-button>
        </div>
        <div style="height: 50px"></div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { GetAllArea, sellerRegist, getshopbyDistrictid, getShopTypes } from '@/request/api';
import { ssqmode } from '@/assets/utils/utils';
import request from '@/request/request';
export default {
  data() {
    return {
      parentMall: '',
      parentMallid: '',
      shopname: '', // 商铺名称
      password: '',
      jytype: '', // 经营类型
      uploader: [], // 上传文件
      invitephone: '', // 介绍人电话
      areavalue: '', // 地区选择器绑定
      shopaddress: '', // 店铺地址
      shopfzr: '', // 负责人
      shopfzrnum: '', // 负责人电话
      shopType: 1, // 注册类型，0 商城  1 本地服务商家  2 本地服务商场
      SSQcolumns: [], // 省市区的列表
      mallcolumns: [], // mall列表
      jytypecolumns: [], // 经营类型列表
      showPicker1: false, // 控制省市区选择器开关
      showPicker2: false, // 控制商城选择器开关
      showPicker3: false, // 控制经营类型选择器开关
      districtid: '', // 选择器选择的地区id
      jytypeid: '', // 选择器选择的经营类型的id
      shoplogo: '',
      shopbelong: '', // 商铺所属商城的id
    };
  },
  mounted() {
    this.getSSQ();
    this.getshopType();
  },
  methods: {
    // 读取文件之后触发文件上传接口
    fileupload(file) {
      console.log(file.File);

      file.status = 'uploading';
      file.message = '上传中...';
      let forms = new FormData();

      forms.append('file', file.file);
      forms.append('fileType', 'USER_FILES');

      request({
        url: process.env.VUE_APP_BASE_URL + '/common/fileUpload',
        method: 'post',
        data: forms,
        processData: false,
        contentType: 'multipart/form-data',
      })
        .then((res) => {
          console.log(res);
          this.shoplogo = res.data.data.fileOssUrl;
          console.log('店铺logo' + this.shoplogo);

          file.status = 'done';
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取省市区并渲染
    getSSQ() {
      GetAllArea()
        .then((res) => {
          console.log('获取省市区成功' + res);
          // 省市区的数组
          console.log(res.data.data.thinkAreas);
          this.SSQcolumns = res.data.data.thinkAreas;
          // 将获取到的省市区渲染到组件上面
          let obj = res.data.data.thinkAreas;
          ssqmode(obj);
        })
        .catch((err) => {
          this.$toast('获取省市区列表失败，请尝试联系');
          console.log('获取省市区失败' + err);
        });
    },

    // 提交表单
    onSubmit(values) {
      console.log('表单内容' + values);
      values.shopphone = this.shopfzrnum;
      values.shoplogo = this.shoplogo;
      values.districtid = this.districtid;
      values.shopType = 1;
      values.jytype = this.jytypeid;
      sellerRegist(values)
        .then((res) => {
          // 返回数据深拷贝
          let obj = JSON.stringify(res);
          obj = JSON.parse(obj);
          this.$toast('上传成功' + obj.data.data);
          this.$dialog
            .confirm({
              title: '标题',
              message: '',
            })
            .then(() => {
              this.$router.push('/home');
            })
            .catch(() => {
              this.$toast('用户点击取消');
            });
        })
        .catch((err) => {
          console.log('提交错误返回' + err);
        });
      console.log('submit', values);
    },

    // 通过地区获取该地区下商城
    getmallsByDid() {
      console.log('获取地区商城列表');
      console.log('地区id' + this.districtid);

      if (this.districtid !== '') {
        let districtparams = {};
        districtparams.districtid = this.districtid;
        getshopbyDistrictid(districtparams)
          .then((res) => {
            let obj = JSON.stringify(res);
            obj = JSON.parse(obj);
            console.log('地区商城列表的数据');
            if (obj.data.code === 200) {
              // eslint-disable-next-line eqeqeq
              if (obj.data.data == '') {
                this.$toast('该区域暂时没有已注册的商城');
              } else {
                for (let item of obj.data.data) {
                  this.mallcolumns.push(item.shopname);
                }
                console.log('2333' + this.mallcolumns);
              }
            } else {
              this.$toast('返回了错误的结果' + obj.data.code);
            }
            console.log('获取地区商城返回' + obj.data.code);
            console.log('wwwwwwwwww' + JSON.stringify(obj.data));
          })
          .catch((err) => {
            console.log('获取地区商城返回错误' + err);
          });
      } else {
        this.$toast('请先选择地区');
      }
    },
    // 获取商铺类型
    getshopType() {
      getShopTypes()
        .then((res) => {
          let ttt = JSON.stringify(res);
          let typeres = JSON.parse(ttt);
          console.log('获取的店铺类型合集' + typeres.data.code);
          if (typeres.data.code === 200) {
            let obj = typeres.data.data;
            for (let item of obj) {
              this.jytypecolumns.push(item.name);
            }
            console.log('23');
          } else {
            this.$toast('获取商铺类型错误');
          }
        })
        .catch((err) => {
          console.log('获取店铺类型过程出现错误' + err);
        });
    },
    // 地区选择器popup的确认按钮
    onConfirm1(value, index) {
      console.log('目录' + index);
      this.areavalue = '';
      let distid = this.SSQcolumns[index[0]].children[index[1]].children[index[2]].id;
      this.districtid = distid;
      for (let item of value) {
        console.log(item);
        this.areavalue = this.areavalue + ' ' + item;
      }
      this.showPicker1 = false;
      this.getmallsByDid();
    },
    // 商城选择器popup的确认按钮
    onConfirm2(value, index) {
      this.parentMall = '';
      console.log('目录' + index);
      this.parentMall = value;
      this.parentMallid = index + 1;
      this.showPicker2 = false;
    },
    // 经营类型的确认按钮
    onConfirm3(value, index) {
      this.jytype = '';
      console.log('目录' + index + value);
      this.jytype = value;
      this.jytypeid = index + 1;
      this.showPicker3 = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
