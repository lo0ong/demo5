<template>
  <div class="do-tree-dept">
    <el-tree node-key="id" highlight-current :data="data" :props="defaultProps" :expand-on-click-node="false" default-expand-all>
      <span slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-show="node.level==1">
          <!-- 设置按钮 -->
          <el-button icon="el-icon-setting" size="mini" @click="editMenu()"></el-button>
        </span>
        <span v-if="buttonVisit==='1'">
          <span v-show="node.level==2">
            <!-- 新增按钮 -->
            <el-button icon="el-icon-plus" size="mini" @click="nodeAdd(node, data)"></el-button>
          </span>
          <span v-show="node.level ==3">
            <!-- 编辑按钮 -->
            <el-button icon="el-icon-edit" size="mini" @click="nodeEdit(node, data)"></el-button>
            <!-- 删除按钮 -->
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="nodeDel(node, data)"></el-button>
          </span>
        </span>
      </span>
    </el-tree>
    <!--新增界面-->
    <el-dialog title="新增目录" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="上级目录" prop="name">
          <el-input readonly v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="目录层级" prop="level">
          <el-input readonly v-model="addForm.level"></el-input>
        </el-form-item>
        <el-form-item label="目录名称" prop="subname">
          <el-input v-model="addForm.subname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAdd('addForm')">确 认</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑目录" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="上级目录" prop="fatherName">
          <el-input v-model="editForm.fatherName"></el-input>
        </el-form-item>
        <el-form-item label="目录层级" prop="level">
          <el-input v-model="editForm.level"></el-input>
        </el-form-item>
        <el-form-item label="目录名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmEdit('editForm')">确认修改</el-button>
          <el-button @click="editFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<style lang="scss" scoped>
.do-tree-dept {
  height: 100%;
  background-color: #fff;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 1px 1px;
  margin-left: 10px;
}
</style>


<script>
export default {
  data() {
    return {
      buttonVisit: "0",
      dialogFormVisible: false,
      editFormVisible: false,
      data: [],
      addForm: {
        id: "",
        name: "",
        level: "",
        subname: ""
      },
      editForm: {},
      rules: {
        subname: [
          { required: true, message: "请输入目录名称", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "childs",
        label: "name"
      },
      alldata: {
        resultCount: 1,
        resultData: [
          {
            id: 1,
            name: "频道目录",
            level: 1,
            sequence: 1,
            fatherId: null,
            fatherName: "广播",
            childs: [
              {
                id: 2,
                name: "电视",
                level: 2,
                sequence: 1,
                fatherId: null,
                fatherName: "广播",
                childs: []
              },
              {
                id: 3,
                name: "广播",
                level: 2,
                sequence: 2,
                fatherId: null,
                fatherName: "广播",
                childs: [
                  {
                    id: 4,
                    name: "央视",
                    level: 3,
                    sequence: 1,
                    fatherId: null,
                    fatherName: "广播",
                    childs: []
                  },
                  {
                    id: 5,
                    name: "卫视",
                    level: 3,
                    sequence: 2,
                    fatherId: null,
                    fatherName: "广播",
                    childs: []
                  },
                  {
                    id: 6,
                    name: "地方",
                    level: 3,
                    sequence: 3,
                    fatherId: null,
                    fatherName: "广播",
                    childs: []
                  },
                  {
                    id: 7,
                    name: "央视",
                    level: 3,
                    sequence: 1,
                    fatherId: null,
                    fatherName: "广播",
                    childs: []
                  },
                  {
                    id: 8,
                    name: "卫视",
                    level: 3,
                    sequence: 2,
                    fatherId: null,
                    fatherName: "广播",
                    childs: []
                  },
                  {
                    id: 9,
                    name: "地方",
                    level: 3,
                    sequence: 3,
                    fatherId: null,
                    fatherName: "广播",
                    childs: []
                  }
                ]
              }
            ]
          }
        ],
        resultCode: "000",
        resultMsg: "调用成功！"
      }
    };
  },
  methods: {
    getData() {
      //   let api = "static/data/treechannel.json";
      //   this.$http.get(api).then(response => {
      //     console.log(response);
      //     // this.$store.commit('setDeptTreeData',response.data);
      //   });
      this.data = this.alldata.resultData;
      console.log(this.data);
      return this.data;
    },
    //显示菜单编辑按钮
    editMenu() {
      if (this.buttonVisit == "0") {
        console.log(this.buttonVisit);
        return (this.buttonVisit = "1");
      } else {
        console.log(this.buttonVisit);
        return (this.buttonVisit = "0");
      }
    },
    //新增菜单
    nodeAdd(n, d) {
      if (this.dialogFormVisible == false) {
        this.addForm.name = d.name;
        this.addForm.level = d.level;
        return (this.dialogFormVisible = true);
      } else {
        console.log(this.dialogFormVisible);
        return (this.dialogFormVisible = false);
      }
    },

    //确认增加
    confirmAdd(formName) {
      console.log("confirmAdd");
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.addForm);
          return (this.dialogFormVisible = false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //编辑按钮
    nodeEdit(n, d) {
      if (this.editFormVisible == false) {
        this.editForm = d;
        return (this.editFormVisible = true);
      } else {
        console.log("error submit!!");
        return (this.editFormVisible = false);
      }
    },
    //确认编辑
    confirmEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.editForm);
          return (this.editFormVisible = false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除子目录
    nodeDel(n, d) {
      this.$confirm("确认删除？")
        .then(_ => {
          console.log(d);
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
<style>
.slot-tree {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  padding: 1em;
  max-width: 600px;
  overflow-y: auto;
}
/*顶部按钮*/
.slot-tree .slot-t-top {
  margin-bottom: 15px;
}
.slot-tree .slot-t-node span {
  display: inline-block;
}
/*节点*/
.slot-tree .slot-t-node--label {
  font-weight: 600;
}
/*输入框*/
.slot-tree .slot-t-input .el-input__inner {
  height: 26px;
  line-height: 26px;
}
/*按钮列表*/
.slot-tree .slot-t-node .slot-t-icons {
  display: none;
  margin-left: 10px;
}
.slot-tree .slot-t-icons .el-button + .el-button {
  margin-left: 6px;
}
.slot-tree .el-tree-node__content:hover .slot-t-icons {
  display: inline-block;
}
</style>

