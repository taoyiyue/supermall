<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
      <!-- {{cartList}} -->
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll.vue";


import { mapGetters } from "vuex"; // vuex 自带的方法可以调用 getters 方法
import CartListItem from './CartListItem.vue';

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
activated(){
 this.$refs.scroll.refresh()
}
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}

.content {
  overflow: hidden;
  height: 100%;
}
</style>