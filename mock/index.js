const Mock = require('mockjs');
const fs = require('fs');
const path = require('path');

function getJsonFile(filePath) {
  let json = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
  let obj = JSON.parse(json);
  return obj;
}

module.exports = function (app) {
  app.get('/goodsinfo/getGoodsList', (rep, res) => {
    let json = getJsonFile('./goods.json');
    res.json(Mock.mock(json));
  });
  app.get('/goodsinfo/getrating', (rep, res) => {
    let json = getJsonFile('./rating.json');
    res.json(Mock.mock(json));
  });
  app.get('/goodsinfo/getseller', (rep, res) => {
    let json = getJsonFile('./seller.json');
    res.json(Mock.mock(json));
  });
};
