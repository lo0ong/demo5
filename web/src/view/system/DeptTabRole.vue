<template>
  <div class="dept-tab-role-page">
    <div v-if="this.$store.getters.getDeptTreeActive.id == ''" class="not-data">请选择组织机构！</div>
    <div v-else class="content-bar">
      <div class="role-box">
        <h3>可分配的角色</h3>
        <ul class="content">
          <li v-for="o in $store.state.dept.role" :key="o.id" v-on:click="clickRole(o)" v-bind:class="{ active: o.id == roleActive.id }">{{o.rolename}}</li>
        </ul>
        <div class="tools">
          <el-button type="primary" @click="viewRoleOpen">角色维护</el-button>
        </div>
      </div>
      <div class="user-box">
        <do-content-title title="已分配用户" :clickAdd='viewUserOpen' clickAddName="人员维护" notTop="true"></do-content-title>

        <!-- 表格 -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="username" label="用户名称" width="180"></el-table-column>
          <el-table-column prop="loginid" label="登录账号" width="180"></el-table-column>
          <el-table-column prop="telephones" label="手机号码" width="180"></el-table-column>          
          <el-table-column prop="deptname" label="组织名称"></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 新增-角色 -->
    <dept-tab-role-add-role :dialogVisible="dialogVisibleRole" :close="viewRoleClose"></dept-tab-role-add-role>
    <dept-tab-role-add-user :dialogVisible="dialogVisibleUser" :close="viewUserClose" :getTableData="getUserData" :tableData="tableData"></dept-tab-role-add-user>
  </div>
</template>

<style lang="scss" scoped>
.dept-tab-role-page {
  .not-data {
    padding-left: 10px;
  }
  .content-bar {
    padding: 0 10px;
    display: flex;
    .role-box {
      width: 200px;
      h3 {
        margin: 0px;
        padding: 0px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        background-color: #ccc;
      }
      .content {
        margin: 0px;
        padding: 0px;
        border: 1px solid #ccc;
        min-height: 300px;
        li {
          padding: 0 5px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          &:hover {
            background-color: #f5f7fa;
          }
          &.active {
            background-color: #f5f7fa;
            font-weight: bold;
          }
        }
      }
      .tools {
        margin-top: 5px;
        button {
          width: 100%;
        }
      }
    }
    .user-box {
      flex-grow: 1;
      margin-left: 10px;
    }
  }
}
</style>


<script>
import DeptTabRoleAddRole from "./DeptTabRoleAddRole.vue";
import DeptTabRoleAddUser from "./DeptTabRoleAddUser.vue";

export default {
  components: { DeptTabRoleAddRole, DeptTabRoleAddUser },
  props: ["cellBackAddDept", "getData"],
  data() {
    return {
      roleData: [],
      roleActive: {},
      dialogVisibleRole: false,
      dialogVisibleUser: false,
      query: {
        username: "",
        loginid: ""
      },
      tableData: [],
      page: {
        currentPage: 1,
        total: 2
      }
    };
  },
  methods: {
    viewRoleOpen() {
      this.dialogVisibleRole = true;
    },
    viewRoleClose() {
      this.dialogVisibleRole = false;
    },
    viewUserOpen() {
      if (Object.keys(this.roleActive) == 0) {
        this.$message({
          message: "请选择角色！",
          type: "warning"
        });
      } else {
        this.dialogVisibleUser = true;
      }
    },
    viewUserClose() {
      this.dialogVisibleUser = false;
    },
    clickRole(obj) {
      this.roleActive = obj;
      this.getUserData();
      this.$store.commit("setDeptRoleActive", obj);
    },
    getUserData() {
      let api =
        this.global.ip +
        "sysmanager/user/queryUserByDetpAndRole?pageNum=1&pageSize=1000&&deptid=" +
        this.$store.getters.getDeptTreeActive.id +
        "&roleid=" +
        this.roleActive.id;
      this.$http.get(api).then(response => {
        this.tableData = response.body;
      });
    }
  },
  mounted() {}
};
</script>
