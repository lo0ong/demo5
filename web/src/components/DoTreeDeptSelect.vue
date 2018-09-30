<template>
  <el-dialog title="组织机构选择" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" append-to-body>
    <div class="do-tree-dept-select">
      <el-tree :data="this.$store.state.dept.deptTreeData" :props="defaultProps" @node-click="clickTreeRadio"></el-tree>

      <div>
        <h6>已选择</h6>
        <el-input type="textarea" :rows="3" v-model="dataRShow" :disabled="true">
        </el-input>
      </div>

      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </div>
  </el-dialog>

</template>

<style lang="scss" scoped>
.do-tree-dept-select {
  height: 100%;
  background-color: #fff;
  .dialog-footer {
    margin-top: 20px;
    text-align: right;
  }
  h6 {
    margin: 10px 0px;
  }
}
</style>


<script>
export default {
  props: ["dialogVisible", "close", "dataReturn"],

  data() {
    return {
      data: [], //全部部门
      dataR: [], //已选择部门
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  computed: {
    dataRShow: function() {
      return this.dataR
        .map(o => {
          return o.name;
        })
        .toString();
    }
  },
  methods: {
    getData() {
      let api = this.global.ip + "sysmanager/dept/getAllTreeInfo";
      this.$http.get(api).then(response => {
        this.$store.commit("setDeptTreeData", response.data);
      });
    },
    clickTreeRadio(obj) {
      this.dataR = [];
      this.dataR.push(obj);
    },
    save() {
      if (this.dataR.length == 0) {
        this.$message({
          message: "请选择机构！",
          type: "warning"
        });
      } else {
        this.dataReturn(this.dataR);
        this.close();
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.close();
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
