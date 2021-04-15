<template>
  <div class="home">
    <van-notice-bar scrollable text="万顺叫车" />
    <van-list>
      <van-cell title="你看，右下角有一个vConsole,用来调试的" />
      <van-cell title="你再看，地址栏有一个?VNK=xxx,这是路由缓存" />
      <div>{{ currentDate }}</div>
      <svg-icon icon-class="service"></svg-icon>
      <svg-icon icon-class="phone"></svg-icon>
      <svg-icon icon-class="download"></svg-icon>
      <loading2></loading2>
      <spinner></spinner>
      <base-loading></base-loading>
    </van-list>
    <scroll-nav-bar :current-index="currentIndex" :props-config="propsConfig" :labels="labels" @change="changeHandler">
    </scroll-nav-bar>
    <div class="tabs">
      <scroll-nav-bar direction="vertical" :current-index="currentIndex2" :labels="labels2" @change="changeHandler2">
        <i slot-scope="props">{{ props.txt }}</i>
      </scroll-nav-bar>
    </div>
    <swipe :data="swipeData" @item-click="onItemClick" @btn-click="onBtnClick"></swipe>
  </div>
</template>

<script>
// 使用vant 组件
import { List, NoticeBar, Cell, Notify } from 'vant'

// 使用日期工具类
import { format, DATE_FMT } from '@/utils/date'

export default {
  name: 'Home',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [NoticeBar.name]: NoticeBar,
  },
  data() {
    return {
      currentDate: format(new Date(), DATE_FMT),
      currentIndex: 0,
      propsConfig: {
        key: 'name',
        value: 'value',
      },
      labels2: ['快车', '小巴', '专车', '顺风车', '代驾', '公交', '自驾租车', '豪华车', '二手车', '出租车'],
      currentIndex2: 3,
      labels: [
        { name: '快车', value: 1 },
        { name: '小巴', value: 2 },
        { name: '专车', value: 3 },
        { name: '顺风车', value: 4 },
        { name: '代驾', value: 5 },
        { name: '公交', value: 6 },
        { name: '自驾租车', value: 7 },
        { name: '二手车', value: 8 },
        { name: '出租车', value: 9 },
      ],
      swipeData: [
        {
          item: {
            text: '测试1',
            value: 1,
          },
          btns: [
            {
              action: 'clear',
              text: '不再关注',
              color: '#c8c7cd',
            },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32',
            },
            {
              action: 'delete',
              text: '谢谢',
              color: '#bebebe',
            },
          ],
        },
        {
          item: {
            text: '测试2',
            value: 2,
          },
          btns: [
            {
              action: 'clear',
              text: '不再关注',
              color: '#c8c7cd',
            },
            {
              action: 'delete',
              text: '删除',
              color: '#ff3a32',
            },
          ],
        },
      ],
    }
  },
  created() {},

  methods: {
    changeHandler(val) {
      this.currentIndex = val
      console.log(this.currentIndex)
    },
    changeHandler2(val) {
      this.currentIndex2 = val
      console.log(this.currentIndex)
    },
    onItemClick(item) {
      console.log('click item:', item)
    },
    onBtnClick(btn, index) {
      if (btn.action === 'delete') {
        // this.$createActionSheet({
        //   title: '确认要删除吗',
        //   active: 0,
        //   data: [{ content: '删除' }],
        //   onSelect: () => {
        //     this.swipeData.splice(index, 1)
        //   },
        // }).show()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  /** 审查元素，这个样式会转换为 font-size: 4.267vw; */
  font-size: 16px;
}
.tabs {
  height: 300px;
}
</style>
