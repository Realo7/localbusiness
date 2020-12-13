// const { mock } = require('mockjs');
const fs = require('fs');
const path = require('path');

let json = fs.readFileSync(path.join(__dirname, './seller.json'), 'utf-8');
// console.log(json.code);
let obj = JSON.parse(json);
console.log(obj.code);
// const Mock = require('mockjs');
// const { dirname } = require('path');
// Mock.mock('');
