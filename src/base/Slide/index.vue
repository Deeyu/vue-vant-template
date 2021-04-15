<template>
  <div ref="slide" class="slide">
    <div ref="slideGroup" class="slide-group">
      <slot>
        <slide-item v-for="(item, index) in data" :key="index" :item="item" @click.native="clickItem(item, index)"> </slide-item>
      </slot>
    </div>
    <div v-if="showDots" class="slide-dots">
      <slot name="dots" :current="currentPageIndex" :dots="dots">
        <span v-for="(item, index) in dots" :key="index" :class="{ active: currentPageIndex === index }"></span>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SlideItem from './slide-item.vue'
import BScroll from 'better-scroll'

const COMPONENT_NAME = 'slide'
const EVENT_CHANGE = 'change'
const EVENT_SELECT = 'click'
const EVENT_SCROLL_END = 'scroll-end'
const EVENT_SCROLL = 'scroll'

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

const DEFAULT_OPTIONS = {
  momentum: false,
  click: true,
  observeDOM: false,
  bounce: false
}

export default {
  name: COMPONENT_NAME,
  components: {
    SlideItem
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      }
    },
    initialIndex: { // 初始化时展示的位置索引值
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    threshold: { // 切换页面的滑动阈值
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: { // 自动播放的时间间隔
      type: Number,
      default: 4000
    },
    showDots: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: DIRECTION_H
    },
    // The props allowVertical, stopPropagation could be removed in next minor version.
    allowVertical: { // 允许纵向滚动
      type: Boolean,
      default: undefined,
      deprecated: {
        replacedBy: 'options'
      }
    },
    stopPropagation: {
      type: Boolean,
      default: undefined,
      deprecated: {
        replacedBy: 'options'
      }
    },
    refreshResetCurrent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dots: 0,
      currentPageIndex: this.initialIndex || 0
    }
  },
  watch: {
    initialIndex(newIndex) {
      if (newIndex !== this.currentPageIndex) {
        this._goToPage(newIndex)
      }
    }
  },
  created() {
    this._dataWatchers = []
    const needRefreshProps = ['data', 'loop', 'autoPlay', 'options.eventPassthrough', 'threshold', 'speed', 'allowVertical']
    needRefreshProps.forEach((key) => {
      this._dataWatchers.push(this.$watch(key, () => {
        // To fix the render bug when add items since loop.
        if (key === 'data') {
          this._destroy()
        }

        /* istanbul ignore next */
        this.$nextTick(() => {
          this.refresh()
        })
      }))
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.refresh()
    })

    window.addEventListener('resize', this._resizeHandler)
  },
  activated() {
    /* istanbul ignore next */
    if (this.autoPlay) {
      this._play()
    }
    window.addEventListener('resize', this._resizeHandler)
  },
  deactivated() {
    /* istanbul ignore next */
    this._deactivated()
  },
  destroyed() {
    this._deactivated()
    this._destroy()
    this.slide = null

    this._dataWatchers.forEach((cancalWatcher) => {
      cancalWatcher()
    })
    this._dataWatchers = null
  },
  methods: {
    clickItem(item, index) {
      /* istanbul ignore next */
      this.$emit(EVENT_SELECT, item, index)
    },
    refresh() {
      /* istanbul ignore if */
      if (this.slide === null) {
        return
      }
      this._destroy()
      clearTimeout(this._timer)

      if (this.slide && this.refreshResetCurrent) {
        this.currentPageIndex = 0
      }
      this._updateSlideDom()
      if (this.showDots) {
        this._initDots()
      }
      if (this.currentPageIndex >= this.dots.length) {
        this.currentPageIndex = this.dots.length - 1
      }
      this._initSlide()

      if (this.autoPlay) {
        this._play()
      }
    },
    _destroy() {
      this.slide && this.slide.destroy()
    },
    _refresh() {
      this._updateSlideDom(true)
      this.slide.refresh()
    },
    _updateSlideDom(isResize) {
      this._setSlideStyle(isResize)
    },
    _setSlideStyle(isResize) {
      this.children = this.$refs.slideGroup.children

      const target = this.direction === DIRECTION_H ? 'width' : 'height'
      let allSize = 0
      const slideSize = this.$refs.slide[`client${target[0].toUpperCase() + target.slice(1)}`]
      const len = this.children.length
      for (let i = 0; i < len; i++) {
        const child = this.children[i]
        child.style[target] = slideSize + 'px'
        allSize += slideSize
      }
      if (this.loop && !isResize && len > 1) {
        allSize += 2 * slideSize
      }
      this.$refs.slideGroup.style[target] = allSize + 'px'
    },
    _initSlide() {
      const eventPassthrough = this.direction === DIRECTION_H && this.allowVertical ? DIRECTION_V : ''

      const options = Object.assign({}, DEFAULT_OPTIONS, {
        scrollX: this.direction === DIRECTION_H,
        scrollY: this.direction === DIRECTION_V,
        // eventPassthrough,
        slide: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed
        },
        stopPropagation: this.stopPropagation
      }, this.options)

      this.slide = new BScroll(this.$refs.slide, options)

      this.slide.on('scrollEnd', this._onScrollEnd)

      this._goToPage(this.currentPageIndex, 0)

      /* dispatch scroll position constantly */
      if (this.options.listenScroll && this.options.probeType === 3) {
        this.slide.on('scroll', this._onScroll)
      }
      const slideEl = this.$refs.slide
      slideEl.removeEventListener('touchend', this._touchEndEvent, false)
      this._touchEndEvent = () => {
        if (this.autoPlay) {
          this._play()
        }
      }
      slideEl.addEventListener('touchend', this._touchEndEvent, false)

      this.slide.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this._timer)
        }
      })
    },
    _onScrollEnd() {
      const { pageX, pageY } = this.slide.getCurrentPage()
      let pageIndex = this.direction === DIRECTION_H ? pageX : pageY
      if (this.currentPageIndex !== pageIndex) {
        this.currentPageIndex = pageIndex
        this.$emit(EVENT_CHANGE, pageIndex)
      }

      this.$emit(EVENT_SCROLL_END, pageIndex)

      if (this.autoPlay) {
        this._play()
      }
    },
    _onScroll(pos) {
      this.$emit(EVENT_SCROLL, pos)
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      clearTimeout(this._timer)
      this._timer = setTimeout(() => {
        this.slide.next()
      }, this.interval)
    },
    _deactivated() {
      clearTimeout(this._timer)
      clearTimeout(this._resizeTimer)
      window.removeEventListener('resize', this._resizeHandler)
      const slideEl = this.$refs.slide
      if (slideEl) {
        slideEl.removeEventListener('touchend', this._touchEndEvent, false)
      }
    },
    _resizeHandler() {
      /* istanbul ignore if */
      if (!this.slide) {
        return
      }
      clearTimeout(this._resizeTimer)
      this._resizeTimer = setTimeout(() => {
        /* istanbul ignore if */
        if (this.slide.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this._refresh()
      }, 60)
    },
    _goToPage(index, time) {
      if (this.direction === DIRECTION_H) {
        this.slide && this.slide.goToPage(index, 0, time)
      } else if (this.direction === DIRECTION_V) {
        this.slide && this.slide.goToPage(0, index, time)
      }
    }
  },
}
</script>

<style lang="less">
.slide {
  position: relative;
  min-height: 1px;
  height: 100%;
  overflow: hidden;
}
.slide-group {
  position: relative;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  transition-property: transform;
}
.slide-dots {
  position: absolute;
  bottom: 2px;
  right: 0;
  left: 0;
  padding: 0 6px;
  font-size: 0;
  text-align: center;
  transform: translateZ(1px);
  > span {
    display: inline-block;
    vertical-align: bottom;
    margin: 0 1px;
    width: 10px;
    height: 1px;
    background: #ccc;
    &.active {
      background: #fc9153;
    }
  }
}
</style>
