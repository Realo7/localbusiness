import request from './request';

// 获取商场列表,get请求需要{}进行解构，post请求不需要解构
export const GetMall = (param) => request.get('/shopinfo/getMall', { params: param });

// 获取商铺列表
export const GetShop = (param) => request.get('/shopinfo/getShopByMall', { params: param });

// 获取商铺的商品列表
export const GetGoods = (param) => request.get('/goodsinfo/getGoodsList', { params: param });

// 获取商铺的评价
export const GetRating = (param) => request.get('/goodsinfo/getrating', { params: param });
// 获取商铺的信息
export const GetSeller = (param) => request.get('/goodsinfo/getseller', { params: param });
