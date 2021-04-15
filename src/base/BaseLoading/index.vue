<template>
  <div class="cube-loading">
    <span class="cube-loading-spinners" :style="style">
      <i v-for="item in balde" :key="item" class="cube-loading-spinner"></i>
    </span>
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  name: 'BaseLoading',
  props: {
    size: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      balde: 12
    }
  },
  computed: {
    style() {
      if (!this.size) {
        return
      }
      const value = `${this.size}px`
      return {
        width: value,
        height: value
      }
    }
  }
}
</script>
<style lang="less" scoped>
.loop(@i) when (@i <= 12) {
  &:nth-child(@{i}) {
    animation-delay: unit((@i - 1) / 12, s);
    -webkit-animation-delay: unit((@i - 1) / 12, s);
    transform: rotate(30deg * (@i - 6)) translateY(-150%);
  }
  .loop((@i + 1)); // 递归调用自身
}
.cube-loading {
  font-size: 24px;
}
.cube-loading-spinners {
  position: relative;
  display: block;
  width: 1em;
  height: 1em;
}

.cube-loading-spinner {
  position: absolute;
  left: 44.5%;
  top: 37%;
  width: 2px; // for rem
  height: 25%;
  border-radius: 50%/20%;
  opacity: 0.25;
  background-color: currentColor;
  animation: spinner-fade 1s linear infinite;
  .loop(1);
}
@keyframes spinner-fade {
  0% {
    opacity: 0.85;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    opacity: 0.25;
  }
}
</style>
