import {
  request
} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 获取商品信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

//商铺信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells
    this.score = shopInfo.score;
    this.goodscount = shopInfo.cGoods;
  }
}
//参数信息
export class Param {
  constructor(info, rule) {
    this.image = info.image ?info.image[0] : '';
    this.info = info.set;
    this.rule = rule.tables;
  }
}
