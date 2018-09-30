<template>
  <el-dialog title="分配角色" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @open="getData">
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
  props: ["dialogVisible", "close"],
  data() {
    return {
      data: [],
      value: [],
      titles:['未分配角色','已分配角色']
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
      let api = this.global.ip + 'sysmanager/dept/grantRoleToDept'; 
      let param = {
        roleIds:this.value.toString(),
        subDepId:this.$store.getters.getDeptTreeActive.id
      }
      this.$http.post(api,param).then(
        (response) => {
          this.getRoleData();
          this.close();
        }
      );
    },
    getData() {
      this.value = this.$store.getters.getDeptRoleId;

      let api = this.global.ip + 'sysmanager/role/queryAll?pageNum=1&pageSize=1000';
      this.$http.get(api).then(
        (response) => {
          this.data = response.body.map(d=>{
            let o = {
              key:d.id,
              label:d.rolename
            }
            return o;
          });
        }
      );
    },
    getRoleData() {
      let api = this.global.ip + 'sysmanager/role/getRoleByDeptId?deptid=' + this.$store.getters.getDeptTreeActive.id;
      this.$http.get(api).then(
        (response) => {
          this.$store.commit("setDeptRole",response.body);
        }
      );
    },
  },
  mounted() {}
};
</script>
