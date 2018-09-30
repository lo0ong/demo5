<template>
  <div class="homePage">
    <el-container class="app-container">
      <!-- 头部 -->
      <el-header height="auto">
          <do-header></do-header>
      </el-header>
      <!-- 中部：侧栏导航、主体内容区 -->
      <el-container class="app-center-container">
          <el-aside width="auto">
              <do-nav-menu-left></do-nav-menu-left>
          </el-aside>
          <el-main>
              <router-view></router-view>
          </el-main>
      </el-container>
      <!-- 脚本 -->
      <el-footer height="auto">
          <do-footer></do-footer>
      </el-footer>
    </el-container>
  </div>
</template>


<style lang="scss">
.homePage{
  height: 100%;
}
.el-header,
.el-footer {
  padding: 0px !important;
  color: #333;
}

.el-aside{
  border-right: 5px solid #ccc;
}

.el-main {
  padding:0px !important;
  background-color: #f7f7f7;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

li{
  list-style: none;
}

</style>


<script>
export default {
  data() {
    return {
      //msg: "msg：触发了"
    };
  },
  methods: {
    test() {
    }
  },
  mounted() {}
};
</script>
