// 解析省市区地址
function ssqmodel(obj) {
  for (let item of obj) {
    item.text = item.areaName;
    item.children = item.thinkAreas;
    delete item.areaName;
    delete item.thinkAreas;
    for (let item1 of item.children) {
      item1.text = item1.areaName;
      item1.children = item1.thinkAreas;
      delete item1.areaName;
      delete item1.thinkAreas;
      for (let item2 of item1.children) {
        item2.text = item2.areaName;
        item2.children = item2.thinkAreas;
        delete item2.areaName;
        delete item2.thinkAreas;
        // console.log(item2.text);
      }
    }
  }
  // console.log(obj);
  return obj;
}

module.exports = {
  ssqmode: ssqmodel,
};
