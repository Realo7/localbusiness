import request from './request';

// 获取商场列表,get请求需要{}进行解构，post请求不需要解构
export const GetMall = (param) => request.get('/shopinfo/getMall', { params: param });

// 获取商铺列表
export const GetShop = (param) => request.get('/shopinfo/getShopByMall', { params: param });

// 获取商铺的商品列表
export const GetGoods = (param) => request.get('/goodsinfo/getGoodsListByShop', { params: param });

// 获取商铺的评价
export const GetRating = (param) => request.get('/goodsinfo/getrating', { params: param });
// 获取商铺的信息
export const GetSeller = (param) => request.get('/goodsinfo/getseller', { params: param });
// 获取所有省市区
export const GetAllArea = (param) => request.get('/areas/getAllAreaid', { params: param });
// 文件上传
export const fileUpload = (param) => request.post('/common/fileUpload', param);
// 商铺注册POST /api/shopinfo/registerShop
export const sellerRegist = (param) => request.post('/shopinfo/registerShop', param);
// 根据区县id获取商场 GET /api/shopinfo/getMallByDistrictid
export const getshopbyDistrictid = (param) => request.get('/shopinfo/getMallByDistrictid', { params: param });
// 获取商城类型 GET /api/shopType/getTypes
export const getShopTypes = (param) => request.get('/shopType/getTypes', { params: param });
// 根据1餐饮、2超市、0综合类型查询独立店铺 GET /api/shopinfo/getShopByType
export const getKindShop = (param) => request.get('/shopinfo/getShopByType', { params: param });
// 获取用户店铺
export const getUserShop = (param) => request.get('/shopinfo/getMyShop', { params: param });
// 获取用户token /account/getAccountInfo
export const getAccountInfo = (param) => request.get('/account/getAccountInfo', { params: param });
