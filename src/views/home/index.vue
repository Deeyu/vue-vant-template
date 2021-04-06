<template>
  <div class="home">
    <van-notice-bar scrollable text="万顺叫车" />
    <van-list>
      <van-cell title="你看，右下角有一个vConsole,用来调试的" />
      <van-cell title="你再看，地址栏有一个?VNK=xxx,这是路由缓存" />
      <svg-icon icon-class="service"></svg-icon>
      <svg-icon icon-class="phone"></svg-icon>
      <svg-icon icon-class="download"></svg-icon>
    </van-list>
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
    }
  },
  created() {},

  methods: {},
}
</script>
<style lang="less" scoped>
.home {
  /** 审查元素，这个样式会转换为 font-size: 4.267vw; */
  font-size: 16px;
}
</style>
