<template>
  <div class="do-tree-dept">
    <el-tree :data="this.$store.state.dept.deptTreeData" :props="defaultProps" @node-click="cellBackTreeClick"></el-tree>
  </div>
</template>

<style lang="scss" scoped>
.do-tree-dept{
  height: 100%;
  background-color:#fff;
}
</style>


<script>
 export default {
  props:['cellBackTreeClick'],

    data() {
      return {
        data: [],//全部部门
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    methods: {
      getData(){
        let api = this.global.ip + 'sysmanager/dept/getAllTreeInfo'
        this.$http.get(api).then(
          (response) => {
            this.$store.commit('setDeptTreeData',response.data);
          }
        );
      },
    },
     mounted() {
       this.getData();
     }
  };
</script>
