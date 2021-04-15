<template>
  <div class="index-list">
    <b-scroll
      ref="scroll"
      :scroll-events="scrollEvents"
      :options="scrollOptions"
      :data="data"
      @scroll="scroll"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <div ref="content" class="index-list-content">
        <h1 v-if="hasTitle" ref="title" class="index-list-title" @click="titleClick">
          <slot name="title">{{ title }}</slot>
        </h1>
        <ul>
          <slot>
            <index-list-group
              v-for="(group, index) in data"
              :key="index"
              :group="group"
              :props-config="propsConfig"
              @select="selectItem"
            >
            </index-list-group>
          </slot>
        </ul>
      </div>
      <template v-if="$slots.pullup || $scopedSlots.pullup" slot="pullup" slot-scope="props">
        <slot name="pullup" :pullUpLoad="props.pullUpLoad" :isPullUpLoad="props.isPullUpLoad"> </slot>
      </template>
      <template v-if="$slots.pulldown || $scopedSlots.pulldown" slot="pulldown" slot-scope="props">
        <slot
          name="pulldown"
          :pullDownRefresh="props.pullDownRefresh"
          :pullDownStyle="props.pullDownStyle"
          :beforePullDown="props.beforePullDown"
          :isPullingDown="props.isPullingDown"
          :bubbleY="props.bubbleY"
        >
        </slot>
      </template>
    </b-scroll>
    <div
      v-if="navbar"
      id="container"
      class="index-list-nav"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul class="index-list-nav-list">
        <li
          v-for="(item, index) in shortcutList"
          :key="index"
          :data-index="index"
          class="index-list-nav-item"
          :class="{ active: currentIndex === index }"
        >
          <slot name="nav-item" :item="item">{{ item }}</slot>
        </li>
      </ul>
    </div>
    <div v-show="fixedTitle" ref="fixed" class="index-list-fixed index-list-anchor">{{ fixedTitle }}</div>
  </div>
</template>

<script>
import { getData, getRect, prefixStyle, getMatchedTarget } from '@/utils/dom'
import { inBrowser } from '@/utils/env'

import BScroll from '../BetterScroll'
import IndexListGroup from './index-list-group'

const COMPONENT_NAME = 'index-list'
const EVENT_SELECT = 'select'
const EVENT_TITLE_CLICK = 'title-click'
const EVENT_PULLING_UP = 'pulling-up'
const EVENT_PULLING_DOWN = 'pulling-down'

const ANCHOR_HEIGHT = inBrowser ? (window.innerHeight <= 480 ? 17 : 18) : 18
const transformStyleKey = prefixStyle('transform')

export default {
  name: COMPONENT_NAME,
  components: {
    BScroll,
    IndexListGroup,
  },
  props: {
    propsConfig: {
      type: Object,
      default() {
        return {
          keyName: 'name',
          valueName: 'value',
          listName: 'items',
          shortcutName: 'name',
        }
      },
    },
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default() {
        return []
      },
    },
    speed: {
      type: Number,
      default: 0,
    },
    navbar: {
      type: Boolean,
      default: true,
    },
    pullDownRefresh: {
      type: [Object, Boolean],
      default: undefined,
      deprecated: {
        replacedBy: 'options',
      },
    },
    pullUpLoad: {
      type: [Object, Boolean],
      default: undefined,
      deprecated: {
        replacedBy: 'options',
      },
    },
  },
  data() {
    return {
      scrollEvents: ['scroll'],
      currentIndex: 0,
      scrollY: -1,
      diff: -1,
      titleHeight: 0,
    }
  },
  computed: {
    hasTitle() {
      return this.title || this.$slots.title
    },
    fixedTitle() {
      this.hasTitle && !this.titleHeight && this._caculateTitleHeight()

      return this.scrollY <= -this.titleHeight && this.data[this.currentIndex]
        ? this.data[this.currentIndex][this.propsConfig.shortcutName]
        : ''
    },
    shortcutList() {
      let { keyName, shortcutName } = this.propsConfig
      return this.data.map(group => {
        return group ? group[shortcutName].substr(0, 1) : ''
      })
    },
    scrollOptions() {
      return Object.assign(
        {},
        {
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
        },
        this.options
      )
    },
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._calculateHeight()
      })
    },
    title(newVal) {
      this.$nextTick(() => {
        this.refresh()
      })
    },
    diff(newVal) {
      let fixedTop = newVal > 0 && newVal < this.subTitleHeight ? newVal - this.subTitleHeight : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style[transformStyleKey] = `translate3d(0,${fixedTop}px,0)`
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // top
      if (newY > -this.titleHeight) {
        this.currentIndex = 0
        return
      }
      // midd
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // bottom
      this.currentIndex = listHeight.length - 2
    },
  },
  created() {
    this.groupList = []
    this.listHeight = []
    this.touch = {}
    this.subTitleHeight = 0
  },
  mounted() {
    this.$nextTick(() => {
      this.refresh()
    })
  },
  methods: {
    /* TODO: remove refresh next minor version */
    refresh() {
      this._caculateTitleHeight()
      this._calculateHeight()
      this.$refs.scroll && this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$emit(EVENT_SELECT, item)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    titleClick() {
      this.$emit(EVENT_TITLE_CLICK, this.title)
    },
    forceUpdate(dirty = false, nomore = false) {
      this.$refs.scroll.forceUpdate(dirty, nomore)
      dirty &&
        this.$nextTick(() => {
          this._calculateHeight()
        })
    },
    onShortcutTouchStart(e) {
      const target = getMatchedTarget(e, 'index-list-nav-item')
      if (!target) return
      let anchorIndex = getData(target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex

      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta

      this._scrollTo(anchorIndex)
    },
    onPullingUp() {
      this.$emit(EVENT_PULLING_UP)
    },
    onPullingDown() {
      this.$emit(EVENT_PULLING_DOWN)
    },
    _caculateTitleHeight() {
      this.titleHeight = this.$refs.title ? getRect(this.$refs.title).height : 0
    },
    _calculateHeight() {
      this.groupList = this.$el.getElementsByClassName('index-list-group')
      const subTitleEl = this.$el.getElementsByClassName('index-list-anchor')[0]
      this.subTitleHeight = subTitleEl ? getRect(subTitleEl).height : 0
      this.listHeight = []

      if (!this.groupList) {
        return
      }

      let height = this.titleHeight
      this.listHeight.push(height)
      for (let i = 0; i < this.groupList.length; i++) {
        let item = this.groupList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo(index) {
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.$refs.scroll.scrollToElement(this.groupList[index], this.speed)
      this.scrollY = this.$refs.scroll.scroll.y
    },
  },
}
</script>

<style lang="less" scoped>
.index-list {
  position: relative;
  height: 100%;
  overflow: hidden;
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
.index-list-content {
  background: #fff;
  border-radius: 2px;
}
.index-list-title {
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}
.index-list-anchor {
  padding: 16px 16px 10px 16px;
  line-height: 1;
  font-size: 14px;
  color: #999;
  background: #f7f7f7;
}
.index-list-fixed {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.index-list-nav {
  position: absolute;
  z-index: 30;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-family: Helvetica;
  > ul {
    padding: 0;
    margin: 0;
    > li {
      padding: 6px 16px 0 16px;
      line-height: 1;
      text-align: center;
      box-sizing: border-box;
      font-size: 12px;
      color: #666;
      &.active {
        color: #fc9153;
      }
      @media (max-height: 480px) {
        & {
          padding-top: 3px;
        }
      }
    }
  }
}
</style>
