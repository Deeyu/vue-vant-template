<template>
  <div id="ajaxloader3">
    <div class="outer"></div>
    <div class="inner"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading2',
  components: {},
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
@cyan: red;
@cyan-shadow: darken(@cyan, 30%);
@blue-shadow: darken(@blue, 30%);
.animation (@name, @duration:1s, @delay:5, @ease:linear, @iterations:infinite, @endState:normal) {
  -webkit-animation: @name @duration @ease @iterations @endState;
  -moz-animation: @name @duration @ease @iterations @endState;
  -ms-animation: @name @duration @ease @iterations @endState;
  animation: @name @duration @ease @iterations @endState;
  .delay(@delay);
}
.delay (@delay) {
  -webkit-animation-delay: @delay;
  -moz-animation-delay: @delay;
  -o-animation-delay: @delay;
  animation-delay: @delay;
}

.box-shadow (@string) {
  -webkit-box-shadow: @string;
  -moz-box-shadow: @string;
  box-shadow: @string;
}
.square (@xy:30px) {
  width: @xy;
  height: @xy;
}

#ajaxloader3 {
  margin: 0 auto;
  height: 50px;
  .outer {
    border: 5px solid @cyan;
    opacity: 0.9;
    border-right-color: transparent;
    border-left-color: transparent;
    .square(40px);
    margin: 0 auto;
    border-radius: 50%;
    // .box-shadow(0 0 35px @cyan-shadow);
    .animation(spin-pulse);
  }
  .inner {
    border: 5px solid @cyan;
    opacity: 0.9;
    border-left-color: transparent;
    border-right-color: transparent;
    border-radius: 50%;
    // .box-shadow(0 0 15px @cyan-shadow);
    .square(20px);
    position: relative;
    top: -40px;
    margin: 0 auto;
    .animation(spin-right);
  }
  @keyframes spin-right {
    from {
      transform: rotate(0deg);
      opacity: 0.2;
    }
    50% {
      transform: rotate(180deg);
      opacity: 1;
    }
    to {
      transform: rotate(360deg);
      opacity: 0.2;
    }
  }
  @keyframes spin-pulse {
    from {
      transform: rotate(160deg);
      opacity: 0;
      // box-shadow: 0 0 1px @blue-shadow;
    }
    50% {
      transform: rotate(145deg);
      opacity: 1;
    }
    to {
      transform: rotate(-320deg);
      opacity: 0;
    }
  }
}
</style>
