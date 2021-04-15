<template>
  <div class="page">
    <div class="container1">
      <slide :data="items" :loop="loop" :show-dots="true" direction="vertical" @change="change"></slide>
    </div>
    <div class="container2">
      <slide
        ref="slide"
        :data="items2"
        :initial-index="initialIndex"
        :loop="loop2"
        :auto-play="autoPlay"
        :interval="interval"
        :threshold="threshold"
        :speed="speed"
        @change="changePage"
        @click="clickPage"
      >
        <!-- 自定义指示器内容 -->
        <template slot="dots" slot-scope="props">
          <span v-for="(item, index) in props.dots" :key="index" class="my-dot" :class="{ active: props.current === index }">{{
            index + 1
          }}</span>
        </template>
      </slide>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image: 'https://dpubstatic.udache.com/static/dpubimg/C9lKs8y0E6/IMG_4014.jpg',
        },
        {
          url: 'http://www.didichuxing.com/',
          image: 'https://dpubstatic.udache.com/static/dpubimg/hD6agmm2ov/IMG_4012.jpg',
        },
        {
          url: 'http://www.didichuxing.com/',
          image: 'https://dpubstatic.udache.com/static/dpubimg/twV-VvZOA9/IMG_4011.jpg',
        },
        {
          url: 'http://www.didichuxing.com/',
          image: 'https://dpubstatic.udache.com/static/dpubimg/eR_MahwRUT/IMG_4010.jpg',
        },
        {
          url: 'http://www.didichuxing.com/',
          image: 'https://dpubstatic.udache.com/static/dpubimg/R3tKHhdZuK/IMG_4009.jpg',
        },
      ],
      loop: true,
      items2: [
        {
          // url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
        },
        {
          // url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png',
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png',
        },
      ],
      loop2: true,
      autoPlay: true,
      interval: 4000,
      threshold: 0.3,
      speed: 400,
      allowVertical: false,
      initialIndex: 1,
      dotsSlot: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.items2.push({
        url: 'http://www.didichuxing.com/',
        image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png',
      })
    }, 3000)
  },
  methods: {
    change(v) {
      console.log(v)
    },
    changePage(a) {
      console.log(a)
    },
    clickPage(a) {
      console.log(a)
    },
  },
}
</script>

<style lang="less" scoped>
.container1 {
  height: 265px;
  margin-bottom: 15px;
  transform: translateZ(0px);
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 2px 9px #ddd;
  .slide-dots {
    .my-dot {
      height: auto;
      font-size: 12px;
      background: none;
      &.active {
        color: #fc9153;
      }
    }
  }
  /deep/ .slide-item > a > img {
    width: 100vw;
  }
}
.my-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}
</style>
