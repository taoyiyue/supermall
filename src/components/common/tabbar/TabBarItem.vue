<template>
  <div class="tabbar-item" @click="itemClick" >
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="../../assets/img/tabbar/04.png" alt="" />
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  
  props: {
    path: String,
    activeColor:{
        type:String,
        default:'red'
    }
  },
  data() {
    return {
      
        // isActive: true,
    };
  },
  computed: {
    isActive() {
  
      if (this.$route.path == this.path) {
        return true;
      }
      return false     
    },
    activeStyle(){
        return this.isActive ?{color: this.activeColor} :{}
    }
  },
  methods: {
    itemClick() {

        console.log(this.path);
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tabbar-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 49px;
  font-size: 14px;
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
/* .active {
  color: red;
} */
</style>