<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @open="getData">
    <!-- 表单 -->
    <el-transfer v-model="value" :titles="titles" :data="data"></el-transfer>

    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss" scoped>
button {
  margin: 5px;
}
</style>


<script>

export default {
  props: ["dialogVisible", "close","getTableData","tableData"],
  data() {
    return {
      title:'',
      data: [],
      value: [],
      titles:['未分配人员','已分配人员'],
      role:{},
      deptId:'',
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.close();
        })
        .catch(_ => {});
    },
    save() {
      let api = this.global.ip + 'sysmanager/dept/relativeUsers'; 
      let param = {
        deptid:this.deptId,
        roleid:this.role.id,
        userids: this.value.toString()
      };
      this.$http.post(api,param).then(
        (response) => {
          this.getTableData();
          this.close();
        }
      );
    },
    getData() {
      this.value = this.tableData.map(o=>{
        return o.id;
      });
      this.role = this.$store.state.dept.roleActive;
      this.title = '为【' + this.role.rolename + '】分配人员';
      this.deptId = this.$store.state.dept.deptTreeActive.id;

      let api = this.global.ip + 'sysmanager/user/queryAll?pageNum=1&pageSize=1000&deptid=' + this.deptId;
      this.$http.get(api).then(
        (response) => {
          this.data = response.body.map(d=>{
            let o = {
              key:d.id,
              label:d.username
            }
            return o;
          });
        }
      );
    }
  },
  mounted() {
  }
};
</script>
