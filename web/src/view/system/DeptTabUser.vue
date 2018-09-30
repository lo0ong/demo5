<template>
  <div class="dept-tab-user-page">

    <el-row class="query-bar">
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

    <do-content-title title="组织成员"></do-content-title>
 
     <!-- 表格 -->
      <el-table :data="this.$store.state.dept.userTableData" stripe style="width: 100%">
        <el-table-column prop="username" label="用户名称" width="180"></el-table-column>
        <el-table-column prop="loginid" label="登录账号" width="180"></el-table-column>
        <el-table-column prop="deptname" label="部门名称" width="200"></el-table-column>
        <el-table-column prop="telephones" label="手机号码"></el-table-column>
      </el-table>

    <!-- 分页 -->
    <do-content-pagination :currentPage="this.$store.getters.getDeptTablePage.currentPage" :total="this.$store.getters.getDeptTablePage.total"></do-content-pagination>

  </div>
</template>

<style lang="scss" scoped>
</style>


<script>
export default {
  props: ["cellBackAddDept","getData"],
  data() {
    return {
      query: {
        username: "",
        loginid: ""
      },
      tableData:[],
      page: {
        currentPage: 1,
        total: 2
      }
    };
  },
  methods: {
    queryReset() {
      this.$store.commit('setDeptUserTableQuery',{});
      this.query.username = '';
      this.query.loginid = '';
    },
    queryData(){
      this.$store.commit('setDeptUserTableQuery',this.query);
      this.getData();
    },
  },
  mounted() {
  }
};
</script>
