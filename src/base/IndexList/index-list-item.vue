<template>
  <li class="index-list-item" :class="itemClass" @touchstart="addActiveCls" @touchend="removeActiveCls" @click="selectItem()">
    <slot>
      <div class="index-list-item-def van-hairline--bottom">
        {{ item[propsConfig.keyName] }}
      </div>
    </slot>
  </li>
</template>

<script>
import { addClass, removeClass } from '@/utils/dom'

const COMPONENT_NAME = 'index-list-item'
const ACTIVE_CLS = 'index-list-item_active'
const EVENT_SELECT = 'select'

export default {
  name: COMPONENT_NAME,
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
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    itemClass() {
      return this.item.active ? ACTIVE_CLS : ''
    },
  },
  methods: {
    addActiveCls(e) {
      addClass(e.currentTarget, ACTIVE_CLS)
    },
    removeActiveCls(e) {
      removeClass(e.currentTarget, ACTIVE_CLS)
    },
    selectItem() {
      this.$emit(EVENT_SELECT, this.item)
    },
  },
}
</script>

<style lang="less" scoped>
.index-list-item-def {
  position: relative;
  height: 50px;
  line-height: 50px;
  padding: 0 16px;
  font-size: 14px;
  color: #333;
  &:last-child {
    border: none;
  }
}
.index-list-item_active {
  background: rgba(0, 0, 0, 0.04);
}
</style>
