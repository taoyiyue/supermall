<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true, // 如果拉不动可以设置 这个属性来滑动
      click: true, // click 属性让里面内容能被点击
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    // 2.监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    // 3 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        // console.log('滚动到底部');
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
     
    },
    finishPullUp() {
      this.scroll.finishPullUp();
       
    },
    refresh() {
      // console.log("11");
      this.scroll.refresh(); // 刷新后重新计算页面高度
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style >
</style>