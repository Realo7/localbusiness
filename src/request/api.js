import request from './request';

// 获取商场列表,get请求需要{}进行解构，post请求不需要解构
export const GetMall = (param) => request.get('/shopinfo/getMall', { params: param });

// 获取商铺列表
export const GetShop = () => request.get('/shopinfo/getShopByMall');

// 获取商铺的商品列表
export const GetShopGoods = () => request.get('/goodsinfo/getGoodsList');
