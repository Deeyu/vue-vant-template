<template>
  <div class="view-wrapper">
    <div class="index-list-wrapper custom">
      <!-- <index-list :data="singerData"></index-list> -->
      <index-list :data="singerData">
        <index-list-group v-for="(group, index) in singerData" :key="index" :group="group">
          <index-list-item v-for="(item, i) in group.items" :key="i" :item="item" @select="selectItem">
            <div class="custom-item">
              <img :key="item.value" v-lazy.container="item.avatar" class="avatar" />
              <span class="name">{{ item.name }}</span>
            </div>
          </index-list-item>
        </index-list-group>
        <span slot="nav-item" slot-scope="props" class="custom-nav-item">{{ props.item }}</span>
      </index-list>
    </div>
  </div>
</template>

<script>
import singerData from './data.json'
import IndexListGroup from '@/base/IndexList/index-list-group'
import IndexListItem from '@/base/IndexList/index-list-item'
export default {
  components: {
    IndexListGroup,
    IndexListItem,
  },
  data() {
    return {
      singerData,
    }
  },
  methods: {
    selectItem(item) {
      console.log(item.name)
    },
    clickTitle(title) {
      console.log(title)
    },
  },
}
</script>

<style lang="less" scoped>
.view-wrapper {
  // position: fixed;
  // top: 54px;
  // left: 0;
  // bottom: 0;
  height: 100vh;
  width: 100%;
  .index-list-wrapper {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    &.custom {
      /deep/ .index-list-content {
        background-color: #222;
        color: #909090;
      }
      /deep/ .index-list-group {
        padding-bottom: 30px;
      }
      /deep/ .index-list-anchor {
        background-color: #333;
        height: 30px;
        line-height: 30px;
        padding: 0 0 0 20px;
      }
      .custom-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        img[lazy='loading'] {
          background: #bebebe;
        }
        .name {
          margin-left: 20px;
          color: #fff;
          font-size: 14px;
        }
      }
      /deep/ .index-list-nav {
        padding: 20px 0;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.3);
        > ul {
          > li {
            padding: 3px;
            &.active {
              .custom-nav-item {
                color: red;
              }
            }
          }
        }
      }
      .custom-nav-item {
        font-size: 12px;
        color: #909090;
      }
    }
  }
}
</style>
