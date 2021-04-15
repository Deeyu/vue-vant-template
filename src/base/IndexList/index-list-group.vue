<template>
  <li class="index-list-group">
    <div class="index-list-anchor">{{ group[propsConfig.shortcutName] }}</div>
    <ul>
      <slot>
        <index-list-item
          v-for="(item, index) in group[propsConfig.listName]"
          :key="index"
          :item="item"
          :props-config="propsConfig"
          @select="selectItem"
        ></index-list-item>
      </slot>
    </ul>
  </li>
</template>

<script>
import IndexListItem from './index-list-item.vue'

const COMPONENT_NAME = 'index-list-group'
const EVENT_SELECT = 'select'

export default {
  name: COMPONENT_NAME,
  components: {
    IndexListItem,
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
    group: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    selectItem(item) {
      this.$emit(EVENT_SELECT, item)
    },
  },
}
</script>
