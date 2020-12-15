<template>
  <div>
    <van-nav-bar title="商城注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="mallname"
        name="shopname"
        label="商城名"
        placeholder="商城名"
        :rules="[{ required: true, message: '请填写商城名字' }]"
      />
      <van-field
        v-model="jytype"
        name="jytype"
        label="经营类型"
        placeholder="请输入经营类型"
        :rules="[{ required: true, message: '请输入经营类型' }]"
      />
      <van-field
        v-model="shopaddress"
        name="shopaddress"
        label="地址"
        placeholder="请输入地址"
        :rules="[{ required: true, message: '请输入地址' }]"
      />
      <van-field
        v-model="shopfzr"
        name="shopfzr"
        label="负责人"
        placeholder="请输入负责人"
        :rules="[{ required: true, message: '请输入负责人' }]"
      />
      <van-field
        v-model="shopfzrnum"
        name="shopfzrnum"
        label="负责人电话"
        placeholder="请输入负责人电话"
        :rules="[{ required: true, message: '请输入负责人电话' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="areavalue"
        label="地区"
        placeholder="点击选择城市"
        @click="showPicker = true"
      />

      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="SSQcolumns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>

      <van-field name="shoplogo" label="商家logo上传">
        <template #input>
          <van-uploader v-model="uploader" :after-read="fileupload" />
        </template>
      </van-field>
      <van-field v-model="invitephone" name="inviter" label="邀请人手机号" placeholder="邀请人手机(可选)" />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { GetAllArea, sellerRegist } from '@/request/api';
import { ssqmode } from '@/assets/utils/utils';
import request from '@/request/request';
export default {
  data() {
    return {
      mallname: '', // 商场名称
      jytype: '', // 经营类型
      uploader: [], // 上传文件
      invitephone: '', // 介绍人电话
      areavalue: '', // 地区选择器绑定
      shopaddress: '', // 店铺地址
      shopfzr: '', // 负责人
      shopfzrnum: '', // 负责人电话
      shopType: 0, // 注册类型，0 商城  1 本地服务商家  2 本地服务商场
      SSQcolumns: [], // 省市区的列表
      showPicker: false, // 控制省市区选择器开关
      districtid: '', // 选择器选择的地区id
      shoplogo: '',
    };
  },
  mounted() {
    this.getSSQ();
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

    onSubmit(values) {
      console.log('表单内容' + values);
      values.shoplogo = this.shoplogo;
      values.districtid = this.districtid;
      values.shopType = 0;
      sellerRegist(values)
        .then((res) => {
          // 返回数据深拷贝
          let obj = JSON.stringify(res);
          obj = JSON.parse(obj);
          this.$toast('上传成功' + obj.data.data);
          this.$router.push('/home');
        })
        .catch((err) => {
          console.log('提交错误返回' + err);
        });
      console.log('submit', values);
    },

    // 地区选择器popup的确认按钮
    onConfirm(value, index) {
      console.log('目录' + index);
      let distid = this.SSQcolumns[index[0]].children[index[1]].children[index[2]].id;
      this.districtid = distid;
      for (let item of value) {
        console.log(item);
        this.areavalue = this.areavalue + ' ' + item;
      }
      this.showPicker = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
