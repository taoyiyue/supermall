<template>
  <div class="recommends">
    <div v-for="(item,index) in recommend" :key="index" class="recommends-item">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommends{
    display: flex;
    text-align: center;
    font-size: 14px;
    padding:10px 0 20px;
    border-bottom: 8px solid #eee;
}
.recommends-item{
    flex: 1;
}
.recommends-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 15px;
}
</style>