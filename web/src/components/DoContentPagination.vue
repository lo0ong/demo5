<!--
组件说明：主要内容区的分页功能
注意：每页显示数保存在vuex中
-->
<template>
  <el-pagination 
    @size-change="doSizeChange" 
    @current-change="doCurrentChange" 
    :current-page="currentPage" 
    :total="total"
    :page-sizes="pageSizes" 
    :page-size="pageSize"
    :layout="layout" 
    >
  </el-pagination>
</template>

<style lang="scss" scoped>
.el-pagination{
    margin-top:10px;
    margin-right: 10px;
    text-align: right;
}

</style>


<script>
import store from '../vuex/store.js';
export default {
  store, 
  props:['currentPage','total','getData'],
  data() {
    return {
      pageSize:this.$store.state.pagination.pageSize,
      pageSizes:[10, 200, 300, 400],
      layout:'total, sizes, prev, pager, next, jumper'
    };
  },
  methods: {
    doSizeChange(val) {
      this.$store.commit('setPageSize',val);
      this.getData()
    },
    doCurrentChange(val) {//修改
      this.getData(val);
    }
  },
  mounted() {}
};
</script>