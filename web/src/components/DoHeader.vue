<template>
    <div class="do-header">
      <!-- 左侧logo -->
      <img class="logo" src="../assets/top-logo.png">

      <!-- 右侧 导航信息 -->
      <ul class="right-box">
        <li>叶晓东[开发人员]</li>
        <li>  <el-button type="danger" v-on:click="exit">退出</el-button></li>
      </ul>
    </div>
</template>

<style lang="scss" scoped>

.do-header{
  $header-height:90px;

  position: relative;
  padding: 0px;
  height: $header-height;
  background: url(../assets/top-bg.png) center top no-repeat;
  .logo{
    height: $header-height;
    width: auto;
  }
  .right-box{
    position: absolute;
    top:0px;
    right: 0px;
    height: $header-height;
    line-height: $header-height;
    li{
      float: left;
      margin-left:20px;
      height: 40px;;
      line-height: 40px;
      padding:5px 20px; 
      border-radius:20px;
    }
  }
}
</style>


<script>
export default {
  data() {
    return {
      msg: "msg：触发了"
    };
  },
  methods: {
    exit(){
      this.$router.push('/login');
    }
  },
  mounted() {}
};
</script>
