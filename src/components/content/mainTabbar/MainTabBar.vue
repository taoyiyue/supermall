<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/04.png" alt="" /> 
      <img slot="item-icon-active" src="~assets/img/tabbar/03.png" alt="" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/02.png" alt="" />
      <img slot="item-icon-active" src="~assets/img/tabbar/01.png" alt="" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/06.png" alt="" />
      <img slot="item-icon-active" src="~assets/img/tabbar/05.png" alt="" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/07.png" alt="" />
      <img slot="item-icon-active" src="~/assets/img/tabbar/08.png" alt="" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>


<script>
import TabBar from "../../common/tabbar/TabBar.vue";
import TabBarItem from "../../common/tabbar/TabBarItem.vue";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>