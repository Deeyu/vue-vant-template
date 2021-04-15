<template>
  <span class="loader loader-double"></span>
</template>

<script>
export default {
  name: 'Spinner',
  components: {},
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
@color: red;
.loader {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.loader-double {
  border-radius: 50px;
  border: 6px solid transparent;
  border-top-color: @color;
  border-bottom-color: @color;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
}
.loader-double:before,
.loader-double:after {
  content: '';
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 50px;
  border: 6px solid transparent;
  border-top-color: @color;
  border-bottom-color: @color;
  opacity: 0.6;
  filter: alpha(opacity=60);
  -webkit-animation: spinreverse 2s linear infinite;
  animation: spinreverse 2s linear infinite;
}
.loader-double:before {
  top: 13px;
  left: 13px;
  bottom: 13px;
  right: 13px;
  -webkit-animation: spinreverse 3s linear infinite;
  animation: spinreverse 3s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    tranform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    tranform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    tranform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    tranform: rotate(360deg);
  }
}
@-webkit-keyframes spinreverse {
  0% {
    -webkit-transform: rotate(0deg);
    tranform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    tranform: rotate(-360deg);
  }
}
@keyframes spinreverse {
  0% {
    -webkit-transform: rotate(0deg);
    tranform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    tranform: rotate(-360deg);
  }
}
</style>
