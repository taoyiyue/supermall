<template>
  <div class="detail-shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="flex shop-name-info">
      <img :src="shop.logo" alt="" class="shop-img" />
      <div>{{ shop.name }}</div>
    </div>
    <div class="flex shop-other-info">
      <div class="flex shop-other-item shop-other-sell">
        <div>
          <p class="f16">{{ shop.sells | saveNum }}</p>
          <p>总销量</p>
        </div>
        <div>
          <p class="f16">{{ shop.goodscount }}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="shop-other-item shop-other-right">
        <div v-for="(item, index) in shop.score" :key="index">
          {{ item.name }}&ensp;
          <span class="score" :class="{ active: item.isBetter }">{{
            item.score
          }}</span>
          <span class="score-bg" :class="{ active: item.isBetter }">{{
            item.isBetter ? "低" : "高"
          }}</span>
        </div>
      </div>
    </div>
    <div class="enter-shop-wrap">
      <div class="enter-shop">进店逛逛</div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  filters: {
    saveNum(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style lang="less" scoped>
.f16 {
  font-size: 16px;
}
.shop-name-info {
  display: flex;
  align-items: center;
  margin: 20px 10px;
  .shop-img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    vertical-align: middle;
  }
}
.shop-other-info {
  display: flex;
  font-size: 12px;
  align-items: center;
  line-height: 22px;
  .shop-other-item {
    flex: 1;
  }
  .shop-other-sell {
    border-right: 1px solid #ececec;
    div {
      flex: 1;
      text-align: center;
    }
  }
  .shop-other-right {
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    .score {
      display: inline-block;
      width: 30px;
      color: #558F24;
      &.active {
        color: #F26450;
      }
    }
    .score-bg {
      background-color: #558F24;
      color: #fff;
      padding: 1px 4px;
      font-size: 12px;
      &.active {
        background-color: #F26450;
      }
    }
  }
}
.enter-shop-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  .enter-shop {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    font-size: 12px;
    margin: 20px 0 20px 0;
	height: 40px;
	width: 130px;
	border-radius:50px ;
  }
}
</style>
