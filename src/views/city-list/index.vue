<template>
  <div class="city">
    <van-search
      v-model="searchKey"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      @cancel="onCancel"
      @input="changValue"
    />
    <div class="view-wrapper">
      <div class="index-list-wrapper custom">
        <index-list :data="cityList" :props-config="propsConfig" @select="select"></index-list>
      </div>
    </div>
  </div>
</template>

<script>
import cityList from './city'
import { Search } from 'vant'
export default {
  components: {
    [Search.name]: Search,
  },
  data() {
    return {
      searchKey: '',
      cityList,
      propsConfig: {
        keyName: 'name',
        valueName: 'code',
        listName: 'cityList',
        shortcutName: 'firstLetter',
      },
    }
  },
  methods: {
    select(e) {
      console.log(e)
    },
    onCancel() {},
    changValue(v) {
      console.log(v)
    },
  },
}
</script>

<style lang="less" scoped>
.city {
  height: 100vh;
  width: 100%;
}
.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  // height: 100vh;
  width: 100%;
  .index-list-wrapper {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    /deep/ .index-list-anchor {
      background-color: #bebebe;
      height: 30px;
      line-height: 30px;
      padding: 0 0 0 20px;
    }
  }
}
</style>
