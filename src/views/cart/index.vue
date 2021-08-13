<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
      <cart-list></cart-list>

<!-- 底部汇总 -->
<cart-bottom-bar></cart-bottom-bar>
  </div>
</template>


<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from"./childComps/CartBottomBar.vue"

import { mapGetters } from "vuex"; // vuex 自带的方法可以调用 getters 方法

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种调用 getters 的方法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
  position: relative;
}

.nav-bar {
  color: #fff;
  background-color: var(--color-tint);
}

</style>