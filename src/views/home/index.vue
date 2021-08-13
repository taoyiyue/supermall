<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />

      <home-recommend-view :recommend="recommend" />

      <feature-view />

      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./chlidComps/HomeSwiper.vue";
import HomeRecommendView from "./chlidComps/HomeRecommendView.vue";
import FeatureView from "./chlidComps/FeatureView.vue";

import NavBar from "../../components/common/navbar/NavBar.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
// import { debounce } from "../../common/utils";
import {itemListenerMixin} from"../../common/mixin"
export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners: [],
      dKeyword: [],
      keywords: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  // 计算属性
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log("销毁");
  },
  activated() {
    // 进入组件时
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 离开组件时

    //  1. 保存 y 值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.$refs.scroll.scroll.y)

    // 2. 取消全局事件监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  // 组件创建之后 调用该函数
  async created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {

  },
  methods: {
    // 事件监听相关的方法
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backclick() {
      // this.$refs.scroll.scroll.scrollTo(0,0,1000);
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentscroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // console.log("加载更多");
      // this.$refs.scroll.refresh(); //重新计算可滚动区域
    },
    swiperImageLoad() {
      // 1.获取 tabOffsetTop 的 offseTop
      //  2.所有的组件都有一个属性$el 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求相关的方法
    getHomeMultidata() {
      // 发送多个网络请求
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.dKeyword = res.data.dKeyword.list;
        this.keywords = res.data.keywords.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp(); // 完成上拉加载更多
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  color: #fff;
  background-color: var(--color-tint);
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  top: 0;
  right: 0;
  z-index: 1; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tab-control {
  position: relative;
  z-index: 1;
}
</style>