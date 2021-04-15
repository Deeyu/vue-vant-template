<template>
  <div class="slide-item">
    <slot>
      <a :href="item.url">
        <img :src="item.image" />
      </a>
    </slot>
  </div>
</template>

<script>
const COMPONENT_NAME = 'slide-item'
export default {
  name: COMPONENT_NAME,
  props: {
    item: {
      type: Object,
      default() {
        /* istanbul ignore next */
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.slide-item {
  float: left;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  > a {
    display: block;
    height: 100%;
    overflow: hidden;
    text-decoration: none;
    > img {
      display: block;
      height: 100%;
    }
  }
}
</style>
