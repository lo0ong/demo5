<!--
组件说明：表格的操作列
-->
<template>
  <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button v-if="edit" size="mini" type="primary" icon="el-icon-edit" circle @click="edit(scope.$index, scope.row,scope.column)"></el-button>
      <el-button v-if="del" size="mini" type="danger" icon="el-icon-delete" circle @click="del(scope.$index, scope.row,scope.column)"></el-button>
    </template>
  </el-table-column>
</template>

<style lang="scss" scoped>
button {
  margin: 5px;
}
</style>


<script>
export default {
  props:['add','edit','del'],
  data() {
    return {
      msg: "注意：按钮的方法通过props导入"
    };
  },
  methods: {
    tableDel(idx,row,col){
      this.$confirm('确认删除？').then(_ => {
        this.del(idx,row,col);
      }).catch(_ => {});
    }
  },
  mounted() {}
};
</script>
