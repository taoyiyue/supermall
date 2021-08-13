<template>
  <div class="toast" v-show="shows">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  //   props: {
  //     message: {
  //       type: String,
  //       default: "",
  //     },
  //     show: {
  //       type: Boolean,
  //       default: false,
  //     },
  //   },
  data() {
    return {
      message: "",
      shows: false,
    };
  },
  methods: {
    show(message='默认文字', duration = 2000) {
      this.shows = true;
      this.message = message;
      setTimeout(() => {
        this.shows = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  padding: 8px 10px;
  z-index: 999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>