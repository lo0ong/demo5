<template>
  <div class="role-page">
    <el-row class="query-bar margin">
      <el-col :span="6">
        <label>角色名称：</label>
        <el-input v-model="query.rolename"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button plain type="primary" @click="queryData">查询</el-button>
        <el-button plain type="primary" @click="queryReset">重置</el-button>
      </el-col>
    </el-row>

    <do-content-title title="角色列表" :clickAdd='tableA' :clickDelete="tableDS"></do-content-title>

    <!-- 表格  -->
    <el-table :data="this.$store.state.role.roleTableData" stripe style="width: 100%" @selection-change="tableSelect">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="description" label="描述" ></el-table-column>
      <do-content-table-operate :edit="tableE" :del="tableD" width="180"></do-content-table-operate>
    </el-table>
    <do-content-pagination :currentPage="this.$store.getters.getRoleTablePage.currentPage" :total="this.$store.getters.getRoleTablePage.total"></do-content-pagination>

    <role-edit :dialogVisible="dialogVisible" :close="viewDeptClose" :getData="getData"></role-edit>

  </div>
</template>

<style lang="scss" scoped>
.role-page {
}
</style>


<script>
import RoleEdit from "./RoleEdit.vue";
import store from '@/vuex/store.js';

export default {
  store,
  components: { RoleEdit },
  data() {
    return {
      query: {
        rolename: ""
      },
      dialogVisible: false,
      selectedData:[],//表格选中
    };
  },
  methods: {
    queryReset() {
      this.query.rolename = '';
    },
    queryData() {
      this.getData();
    },
    viewDeptOpen() {
      this.dialogVisible = true;
    },
    viewDeptClose() {
      this.dialogVisible = false;
    },
    tableSelect(val){
      this.selectedData = val;
    },
    tableA() {
      this.$store.commit("setRoleView", "add");
      this.viewDeptOpen();
    },
    tableE(index,row,column){
      this.$store.commit('setRoleViewData',this.$store.state.role.roleTableData[index]);
      this.$store.commit('setRoleView','update');
      this.viewDeptOpen();
    },
    tableD(index,row,column){
      let param = {
        ids:this.$store.state.role.roleTableData[index].id
      }
      let api = this.global.ip + 'sysmanager/role/batchDeleteRoletypeById';
      this.$http.post(api,param,).then(
        (response) => {
          this.getData();
        }
      );
    },
    tableDS(){
      if(this.selectedData.length<1){
        this.$message({
          message:'请选择需要删除的数据！',
          type:'warning'
        })
        return;
      }
      let param = {
        ids:this.selectedData.map(v=>{return v.id}).toString()
      }
      let api = this.global.ip + 'sysmanager/role/batchDeleteRoletypeById';
      this.$http.post(api,param,).then(
        (response) => {
          this.getData();
        }
      );
    },
    getData(pageNum) {
      pageNum = pageNum | 1;
      let pageSize = this.$store.state.pagination.pageSize;
      let api = this.global.ip + 'sysmanager/role/queryAll?pageNum=' + pageNum + '&pageSize=' + pageSize ;
      if(this.query.rolename != ''){
        api += '&rolename=' + this.query.rolename;
      }
      this.$http.get(api).then(
        (response) => {
          this.$store.commit('setRoleTableData',response.body);
          this.$store.commit('setRoleTablePage',{currentPage:1,total:response.total});
        }
      );
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
