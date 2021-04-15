<template>
  <div class="page">
    <b-scroll
      ref="scroll"
      :data="data"
      :scroll-events="['scroll']"
      :options="options"
      @scroll="onScrollHandle"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <div v-for="i in data" :key="i" class="item">{{ i }}</div>
      <!-- <template v-if="customPullDown" slot="pulldown" slot-scope="props">
        <div v-if="props.pullDownRefresh" class="cube-pulldown-wrapper" :style="props.pullDownStyle">
          <div v-show="props.beforePullDown" class="before-trigger" :style="{ paddingTop: props.bubbleY + 'px' }">
            <span :class="{ rotate: props.bubbleY > pullDownRefreshThreshold - 40 }">↓</span>
          </div>
          <div class="after-trigger" v-show="!props.beforePullDown">
            <div v-show="props.isPullingDown" class="loading"></div>
            <div v-show="!props.isPullingDown" class="text"><span class="refresh-text">Refresh success</span></div>
          </div>
        </div>
      </template> -->
    </b-scroll>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pullDownRefreshThreshold: 60,
      options: {
        // 下拉阈值（threshold）, 回弹位置（stop）, 更新成功文案（txt）和文案显示时间（stopTime）
        pullDownRefresh: {
          threshold: 60, // 下拉阈值
          stop: 90, // 回弹位置
          txt: '更新成功', // 更新成功文案
          // stopTime: 10, // 文案显示时间（stopTime）
        },
        pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载更多...',
            noMore: '到底啦！',
          },
        },
        scrollbar: true,
      },
      pullDownY: 0,
      pullDownStyle: '',
      data: new Array(10).fill().map((v, i) => i + 1),
      customPullDown: true,
    }
  },
  computed: {
    pullDownTip() {
      if (this.pullDownY <= 60) {
        return '下拉刷新...'
      } else if (this.pullDownY <= 90) {
        return '继续下拉有惊喜...'
      } else {
        return '松手得惊喜！'
      }
    },
    headerStyle() {
      return Math.min(1, Math.max(0, 1 - this.pullDownY / 40))
    },
  },
  methods: {
    onScrollHandle(pos) {
      this.pullDownY = pos.y
      if (pos.y > 0) {
        this.pullDownStyle = `top:${pos.y}px`
        this.triggerSurpriseFlag = false
        if (this.pullDownY > 90) {
          this.triggerSurpriseFlag = true
        }
      }
    },
    // 下拉刷新
    onPullingDown() {
      if (this.triggerSurpriseFlag) {
        setTimeout(() => {
          console.log('刷新了')
          this.triggerSurprise = true
          this.data = new Array(10).fill().map((v, i) => i + 1)
          this.$refs.scroll.forceUpdate()
          return
        }, 2000)
      }
    },
    // 上拉加载
    onPullingUp() {
      console.log('上拉加载')
      setTimeout(() => {
        if (Math.random() > 0.5) {
          let index = this.data[this.data.length - 1]
          let data = new Array(10).fill().map((v, i) => index + i + 1)
          console.log(data)
          this.data.push(...data)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 2000)
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  overflow: hidden;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #bebebe;
  width: 100%;
  height: 100px;
}
</style>
