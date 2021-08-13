<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="params-wrap">
    <div
      v-for="(item, index) in paramInfo.rule"
      :key="index"
      class="param-item"
    >
      <div v-for="(list, index) in item" :key="index" class="param-list">
        <div
          v-for="(listitem, index) in list"
          class="rule-list-item"
          :key="index"
        >
          {{ listitem }}
        </div>
      </div>
    </div>
    <div>
      <div
        v-for="(info, index) in paramInfo.info"
        :key="index"
        class="flex info-list-wrap"
      >
        <div class="info-list-tit">{{ info.key }}</div>
        <div class="param-value">{{ info.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.params-wrap {
  border-top: 4px solid #ececec;
  border-bottom: 4px solid #ececec;
}
.rule-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 100%;
  border-bottom: 1px solid #ececec;
  padding: 10px 4px;
  font-size: 16px;
}
.info-list-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid #ececec;
  padding: 10px 4px;
}
.param-item {
  display: flex;
}
.param-list {
  flex: 1;
}
.info-list-tit {
  width: 88px;
  padding: 10px 4px;
}
.param-value {
  color: pink;
  width: 400px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>