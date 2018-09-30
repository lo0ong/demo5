<template>
  <div class="user-page">
    <div class="left-menu">
      <do-tree-dept ref="doTreeDept" :cellBackTreeClick="cellBackTreeClick"></do-tree-dept>

    </div>
    <div class="right-content">
      <!-- 查询条件 -->
      <el-row class="query-bar margin">
        <el-col :span="6">
          <label>用户名称：</label>
          <el-input v-model="query.username"></el-input>
        </el-col>
        <el-col :span="6">
          <label>登录账号：</label>
          <el-input v-model="query.loginid"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button plain type="primary" @click="queryData">查询</el-button>
          <el-button plain type="primary" @click="queryReset">重置</el-button>
        </el-col>
      </el-row>

      <!-- 标题与操作按钮 -->
      <do-content-title title="用户列表" :clickAdd='tableA' :clickDelete='tableDS'></do-content-title>

      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%" @selection-change="tableSelect">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名称" width="180"></el-table-column>
        <el-table-column prop="loginid" label="登录账号" width="180"></el-table-column>
        <el-table-column prop="deptname" label="部门名称" width="200"></el-table-column>
        <el-table-column prop="telephones" label="手机号码" width="200"></el-table-column>
        <do-content-table-operate :edit="tableE" :del="tableD"></do-content-table-operate>
      </el-table>

      <!-- 分页 -->
      <do-content-pagination :currentPage="page.currentPage" :total="page.total"></do-content-pagination>

      <!-- 新增 -->
      <user-edit :dialogVisible="dialogVisible" :close="viewClose" :getData="getData"></user-edit>
      
    </div>

  </div>
</template>

<style lang="scss" scoped>
.user-page{
  display:flex;
  height: 100%;
  .left-menu{
    width: 200px;
    border-right:2px solid #ccc;
  }
  .right-content{
    flex-grow: 1;
    .el-tabs{
      height: 100%;
      border:none;
    }
    .el-tabs--border-card>.el-tabs__content{
      margin-top:15px;
      padding:0px;

    }
  }
}

</style>


<script>
import store from "@/vuex/store.js";
import UserEdit from "./UserEdit.vue";

export default {
  store,
  components: {
    UserEdit
  },
  data() {
    return {
      query: {
        username: "",
        loginid: "",
      },
      page: {
        currentPage: 1,
        total: 803
      },
      selectedData: [],
      tableData: [],
      dialogVisible: false,
      deptId:'',
    };
  },
  methods: {
    cellBackTreeClick(o){
      this.deptId = o.id;
      this.getData();
    },
    queryReset() {
      this.query.username = '';
      this.query.loginid = '';
    },
    queryData() {
      this.getData();
    },
    viewOpen() {
      this.dialogVisible = true;
    },
    viewClose() {
      this.dialogVisible = false;
    },
    tableSelect(val){
      this.selectedData = val;
    },
    tableA() {
      this.$store.commit("setUserView", "add");
      this.viewOpen();
    },
    tableE(index,row,column){
      this.$store.commit('setUserViewData',this.tableData[index]);
      this.$store.commit('setUserView','update');
      this.viewOpen();
    },
    tableD(index,row,column){
      let param = {
        ids:this.tableData[index].id
      }
      let api = this.global.ip + 'sysmanager/user/batchDeleteUserById';
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
      let api = this.global.ip + 'sysmanager/user/batchDeleteUserById';
      this.$http.post(api,param,).then(
        (response) => {
          this.getData();
        }
      );
    },
    //获取数据
    getData(pageNum) {
      pageNum = pageNum | 1;
      let pageSize = this.$store.state.pagination.pageSize;
      let api =
        this.global.ip +
        "sysmanager/user/queryAll" +
        "?pageNum=" +
        pageNum +
        "&pageSize=" +
        pageSize;
      if(this.query.username){
        api += '&username=' + this.query.username;
      }
      if(this.query.loginid){
        api += '&loginid=' + this.query.loginid;
      }
      if(this.deptId != ''){
        api += '&deptid=' + this.deptId;
      }
      this.$http.get(api).then(response => {
        this.page.total = response.total;
        this.tableData = response.data;
      });
    },

    
  },
  mounted() {
    this.getData();
  }
};
</script>