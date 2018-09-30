<template>
  <div class="dept-page">
    <div class="left-menu">
      <do-tree-dept ref="doTreeDept" :cellBackTreeClick="cellBackTreeClick"></do-tree-dept>

    </div>
    <div class="right-content">
      <el-tabs v-model="tabsActiveName" type="border-card" @tab-click="tabsClick">
        <el-tab-pane label="下级组织" name="first">
          <dept-tab-dept :cellBackAddDept="cellBackAddDept"></dept-tab-dept>
        </el-tab-pane>
        <el-tab-pane label="组织成员" name="second">
          <dept-tab-user :getData="getData"></dept-tab-user>
        </el-tab-pane>
        
        <el-tab-pane label="角色分配" name="third">
          <dept-tab-role :getData="getData"></dept-tab-role>
        </el-tab-pane>
        
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss">
.dept-page {
  display: flex;
  height: 100%;
  .left-menu {
    width: 200px;
    border-right: 2px solid #ccc;
  }
  .right-content {
    flex-grow: 1;
    .el-tabs {
      height: 100%;
      border: none;
    }
    .el-tabs--border-card > .el-tabs__content {
      margin-top: 15px;
      padding: 0px;
    }
  }
}
button {
  margin: 5px;
}
</style>


<script>
import DeptTabDept from "./DeptTabDept.vue";
import DeptTabUser from "./DeptTabUser.vue";
import DeptTabRole from "./DeptTabRole.vue";
import store from "@/vuex/store.js";

export default {
  store,
  components: {
    DeptTabDept,
    DeptTabUser,
    DeptTabRole,
  },
  data() {
    return {
      tabsActiveName: "first" //默认tab的名称
    };
  },
  methods: {
    tabsClick(tab, event) {
      //点击tab触发
    },
    cellBackTreeClick(obj) {
      //点击机构数触发
      this.$store.commit("setDeptTreeActive", obj);
      this.getData();
    },
    getData() {
      this.getDeptTableData();
      this.getUserTableData();
      this.getRoleData();
    },
    getDeptTableData(pageNum) {
      pageNum = pageNum | 1;
      let pageSize = this.$store.state.pagination.pageSize;
      let api =
        this.global.ip +
        "sysmanager/dept/queryAll?parentId=" +
        this.$store.getters.getDeptTreeActive.id +
        "&pageNum=" +
        pageNum +
        "&pageSize=" +
        pageSize +
        this.$store.getters.getDeptTableQuery;

      this.$http.get(api).then(response => {
        let table = response.body.map(o => {
          o.parentname = this.$store.getters.getDeptTreeActive.name;
          return o;
        });
        this.$store.commit("setDeptTableData", table);
        this.$store.commit("setDeptTablePage", {
          currentPage: 1,
          total: response.total
        });
      });
    },
    getUserTableData(pageNum) {
      pageNum = pageNum | 1;
      let pageSize = this.$store.state.pagination.pageSize;
      let api =
        this.global.ip +
        "sysmanager/user/queryAll" +
        "?pageNum=" +
        pageNum +
        "&pageSize=" +
        pageSize +
        this.$store.getters.getDeptUserTableQuery +
        "&deptid=" +
        this.$store.getters.getDeptTreeActive.id;
      this.$http.get(api).then(response => {
        this.$store.commit("setDeptUserTableData", response.body);
        this.$store.commit("setUserTablePage", {
          currentPage: 1,
          total: response.total
        });
      });
    },
    getRoleData() {
      let api = this.global.ip + 'sysmanager/role/getRoleByDeptId?deptid=' + this.$store.getters.getDeptTreeActive.id;
      this.$http.get(api).then(
        (response) => {
          this.$store.commit("setDeptRole",response.body);
        }
      );
    },
    getRoleTableData(){
      let api =
        this.global.ip +
        "sysmanager/user/queryAll" +
        "?pageNum=" +
        pageNum +
        "&pageSize=" +
        pageSize +
        this.$store.getters.getDeptUserTableQuery +
        "&deptid=" +
        this.$store.getters.getDeptTreeActive.id;
      this.$http.get(api).then(response => {
        this.$store.commit("setDeptUserTableData", response.body);
        this.$store.commit("setUserTablePage", {
          currentPage: 1,
          total: response.total
        });
      });
    },
    cellBackAddDept() {
      this.getData();
      this.refreshTree();
    },
    refreshTree() {
      //刷新树
      this.$refs.doTreeDept.getData();
    }
  },
  mounted() {
    this.$store.commit("setDeptTableQuery", {});
    this.getData();
  }
};
</script>
