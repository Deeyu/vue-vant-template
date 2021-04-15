<template>
  <div class="swipe">
    <slot>
      <transition-group name="swipe" tag="ul">
        <li v-for="(item, index) in data" :key="item.item.value">
          <swipe-item :btns="item.btns" :item="item.item" :index="index" :auto-shrink="autoShrink" />
        </li>
      </transition-group>
    </slot>
  </div>
</template>

<script>
import SwipeItem from './swipe-item'

const COMPONENT_NAME = 'swipe'
const EVENT_ITEM_CLICK = 'item-click'
const EVENT_BTN_CLICK = 'btn-click'

export default {
  name: COMPONENT_NAME,
  components: {
    SwipeItem,
  },
  provide() {
    return {
      swipe: this,
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    autoShrink: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.activeIndex = -1
    this.items = []
  },
  methods: {
    addItem(item) {
      this.items.push(item)
    },
    removeItem(item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
      if (index <= this.activeIndex) {
        this.activeIndex -= 1
      }
    },
    onItemClick(item, index) {
      this.$emit(EVENT_ITEM_CLICK, item, index)
    },
    onBtnClick(btn, index) {
      const item = this.data[index]
      this.$emit(EVENT_BTN_CLICK, btn, index, item)
    },
    onItemActive(index) {
      if (index === this.activeIndex) {
        return
      }
      if (this.activeIndex !== -1) {
        const activeItem = this.items[this.activeIndex]
        activeItem.shrink()
      }
      this.activeIndex = index
    },
  },
}
</script>

<style lang="less" scoped>
.swipe {
  overflow: hidden;
}
.swipe-enter-active,
.swipe-leave-active {
  transition: all 0.3s;
  .swipe-item-inner {
    transition: all 0.3s;
  }
}
.swipe-enter,
.swipe-leave-to {
  .swipe-item-inner {
    height: 0;
  }
}
</style>
