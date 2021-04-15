<template>
  <div class="scroll-nav-bar" :class="'scroll-nav-bar_' + direction">
    <b-scroll ref="scroll" nest-mode="none" :direction="direction" :options="options">
      <div ref="items" class="scroll-nav-bar-items">
        <div
          v-for="(txt, index) in usedTxts"
          :key="index"
          class="scroll-nav-bar-item"
          :class="{ 'scroll-nav-bar-item_active': active === index }"
          @click="clickHandler(index)"
        >
          <slot :txt="propsConfig.key ? txt[propsConfig.key] : txt" :index="index" :active="active" :label="labels[index]">
            <span>{{ propsConfig.key ? txt[propsConfig.key] : txt }}</span>
          </slot>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

const COMPONENT_NAME = 'ScrollNavBar'
const EVENT_CHANGE = 'change'

export default {
  name: COMPONENT_NAME,
  props: {
    propsConfig: {
      type: Object,
      default() {
        return {
          key: '',
          value: null
        }
      }
    },
    direction: { // 方向，默认横向，horizontal
      type: String,
      default: DIRECTION_H,
      validator(val) {
        return val === DIRECTION_H || val === DIRECTION_V
      }
    },
    labels: { // 所有的 key 值集合
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      }
    },
    txts: {
      type: Array,
      default() {
        this._defaultTxts = true
        /* istanbul ignore next */
        return this.labels
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scrollNav: null,
      options: {},
      active: this.currentIndex,
      usedTxts: this.txts
    }
  },
  watch: {
    labels(newLabels) {
      if (this._defaultTxts) {
        this.usedTxts = newLabels
      }
    },
    txts(newTxts) {
      this.usedTxts = newTxts
    },
    currentIndex(index) {
      this.active = index
    },
    active(index) {
      this.$emit(EVENT_CHANGE, index)
      this._adjust()
    }
  },
  mounted() {
    this.scrollNav && this.scrollNav.setBar(this)
    if (this.active) {
      // waiting panels loaded
      this.$nextTick(() => {
        this._adjust()
      })
    }
  },
  beforeDestroy() {
    this.scrollNav && this.scrollNav.setBar(null)
  },
  methods: {
    clickHandler(index) {
      if (index === this.active) {
        return
      }
      this.active = index
      this.scrollNav && this.scrollNav.barChange(index)
    },
    refresh() {
      this.$refs.scroll.refresh()
      this._adjust()
    },
    _adjust() {
      // waiting ui
      this.$nextTick(() => {
        const isHorizontal = this.direction === DIRECTION_H
        const targetProp = isHorizontal ? 'clientWidth' : 'clientHeight'
        const active = this.active
        const viewportSize = this.$refs.scroll.$el[targetProp]
        const itemsEle = this.$refs.items
        const scrollerSize = itemsEle[targetProp]
        const minTranslate = Math.min(0, viewportSize - scrollerSize)
        const middleTranslate = viewportSize / 2
        const items = itemsEle.children
        let size = 0
        this.labels.every((label, index) => {
          if (index === active) {
            size += (items[index][targetProp] / 2)
            return false
          }
          size += items[index][targetProp]
          return true
        })
        let translate = middleTranslate - size
        translate = Math.max(minTranslate, Math.min(0, translate))
        this.$refs.scroll.scrollTo(isHorizontal ? translate : 0, isHorizontal ? 0 : translate, 300)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.scroll-nav-bar {
  position: relative;
  display: flex;
  color: #333;
  background-color: #fff;
}
.scroll-nav-bar_horizontal {
  // 水平
  align-items: center;
  /deep/ .scroll-wrapper {
    flex: 1;
    text-align: center;
  }
  /deep/ .scroll-content {
    display: inline-block;
    vertical-align: top;
  }
  .scroll-nav-bar-items {
    white-space: nowrap;
  }
}
.scroll-nav-bar_vertical {
  height: 100%;
  justify-content: center;
  text-align: center;
  .scroll-nav-bar-item {
    display: block;
  }
}
.scroll-nav-bar-items {
  font-size: 14px;
}
.scroll-nav-bar-item {
  display: inline-block;
  vertical-align: top;
  padding: 20px 15px;
}
.scroll-nav-bar-item_active {
  color: red;
}
</style>
