<template>
  <div>
    <nav-bar>
      <div slot="left">
        <img
          src="../../../assets/img/common/back.svg"
          alt=""
          class="back"
          @click="backclick"
        />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="item"
          :class="{ active: index === currentIndex }"
          @click="titleclick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      res: 2,
    };
  },
  methods: {
    titleclick(index) {
      // console.log(index);
      this.currentIndex = index;
      this.$emit('titleClick' ,index)
    },
    backclick() {
      this.$router.back(); // 返回上一个页面
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.item {
  flex: 1;
}
.active {
  color: pink;
}
.back {
  margin-top: 11px;
}
</style>