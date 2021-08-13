<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        @click.native="checkclick"
        class="check-button"
      ></check-button>
      <div>全选</div>
    </div>

    <div class="price">合计：{{ totalprice }}</div>

    <div class="calculate" @click="calcClick">去计算：{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";

export default {
  components: {
    CheckButton,
  },
  computed: {
    totalprice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length == 0) {
        return false;
      }
      // return !(this.$store.state.cartList.filter((item) => !item.checked).length)
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkclick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.filter((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.filter((item) => (item.checked = true));
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品')
      }
    }
  },
};
</script>


<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
}
.check-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin: 0 5px 0 10px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100%;
  color: #eee;
  background-color: red;
}
</style>