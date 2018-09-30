<!--
组件说明：左侧的导航菜单
-->
<template>
  <div class="do-nav-menu-left">
    <!-- 导航菜单-侧栏 -->
    <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <template v-for="item in list">
        <!-- 无下级 -->
        <el-menu-item v-if="item.children.length == 0" :key="item.index" :index="item.index">
          <i :class="item.icon"></i>
          <span slot="title" v-on:click="clickNav(item)">{{item.title}}</span>
        </el-menu-item>

        <!-- 有下级 -->
        <el-submenu v-else :key="item.index" :index="item.index" >
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item v-for="o in item.children" :key="o.index" :index="o.index"  v-on:click="clickNav(o)">
            {{o.title}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>

    <!-- 展开、收起 -->
    <el-row>
      <el-col class="do-nav-menu-left-col" :span="12"><i class="el-icon-arrow-left" v-on:click="clickCollapse(true)"></i></el-col>
      <el-col class="do-nav-menu-left-col" :span="12"><i class="el-icon-arrow-right"  v-on:click="clickCollapse(false)"></i></el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.do-nav-menu-left{
  display: flex;
  flex-direction:column;
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu-vertical-demo{
    height: 100%;
    overflow: auto;
  }
  .el-submenu__title,.el-menu-item{
    text-align: left !important;
  }
  ul {
    border: 0px;
  }
  .do-nav-menu-left-col{
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-top:1px solid #ccc;
    cursor: pointer;
    overflow: hidden;

    &:first-child{
      border-right: 1px solid #ccc;
    }
    &:hover{
      background-color: #ecf5ff
    }
    i{
      display: block;
      line-height: 36px;

    }
  }

}

</style>


<script>
export default {
  data() {
    return {
      isCollapse: false,
      list:[
        {
          index:'1',
          icon:'el-icon-setting',
          title:'广电视听',
          url:'',
          children:[
            {index:'1-1',title:'视听频道管理',url:'/channel'},
            {index:'1-2',title:'视听栏目管理',url:'/topic'},
            {index:'1-3',title:'视听片源管理',url:'/media'},
          ]
        },
        {
          index:'2',
          icon:'el-icon-setting',
          title:'图文信息',
          url:'',
          children:[
            {index:'2-1',title:'图文栏目管理',url:'/column'},
            {index:'2-2',title:'我的草稿图文',url:'/articleDraft'},
            {index:'2-3',title:'我的提交图文',url:'/articleSubmit'},
            {index:'2-4',title:'待审核的图文',url:'/reviewBefore'},
            {index:'2-5',title:'审核通过图文',url:'/reviewAffer'},
          ]
        },
        {
          index:'10',
          icon:'el-icon-setting',
          title:'系统管理',
          url:'',
          children:[
            //{index:'1-1',title:'功能管理',url:''},
            {index:'10-2',title:'用户管理',url:'/user'},
            {index:'10-3',title:'组织机构',url:'/dept'},
            {index:'10-4',title:'角色管理',url:'/role'},
            {index:'10-5',title:'数据字典',url:'/dict'},
          ]
        },
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    clickNav(o){
      this.$router.push({path:o.url});
    },
    clickCollapse(val){
      this.isCollapse = val;
    }
  },
  mounted() {}
};
</script>
