<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />

    <scroll
      class="content"
      ref="scroll"
      @scroll="contentscroll"
      :probe-type="3"
    >
      <!-- <div>{{ $store.state.cartList }}</div> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";

import {
  getDetail,
  Goods,
  Shop,
  Param,
  getRecommend,
} from "../../network/detail";
import { debounce } from "../../common/utils";

import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";

import { itemListenerMixin, backTopMixin } from "../../common/mixin";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // console.log(this.$route.params);

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播图数据
      // console.log(res);
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule);
      // console.log(this.paramInfo);

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // console.log(this.commentInfo);

      // this.$nextTick(() => {
      //   this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // });
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },

  mounted() {},
  computed: {},
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0);
    },
    contentscroll(position) {
      //  1.获取y值
      const positoinY = -position.y;

      // 2.positoinY和主题中的值进行对比
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   if ((this.currentIndex != i &&i < length - 1 &&  positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i + 1]) || (i === length - 1 && positoinY >= this.themeTopYs[i])) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex != i &&
          positoinY >= this.themeTopYs[i] &&
          positoinY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 3.判断BackTop是否显示;
      // this.isShowBackTop = -position.y > 1000;
      this.demo(position);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages;
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);
      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
      // this.$store.state.cartList.push(product)
      this.$store.dispatch("addCart", product).then(res =>{  //actions 会返回一个 Promise 
        
        this.$toast.show(res)
        console.log(this.$toast);
      })
     
    },
    // 4.添加到购物车成功
  },
};
</script>
<style lang="less" scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 100;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>