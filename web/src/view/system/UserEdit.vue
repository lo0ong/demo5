<template>
  <el-dialog title="用户信息新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @open="open()">
    <!-- 表单 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="loginid">
        <el-input v-model="form.loginid"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="passwd">
        <el-input type="password" v-model="form.passwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repasswd">
        <el-input type="password" v-model="form.repasswd"></el-input>
      </el-form-item>
      <el-form-item label="组织机构" prop="deptname">
        <el-input v-model="form.deptname" :disabled="true">
          <el-button slot="append" icon="el-icon-tickets" @click="viewOpen"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="telephones">
        <el-input v-model="form.telephones"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

    </el-form>

    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </span>

    <do-tree-dept-select :dialogVisible="dialogVisibleTree" :close="viewClose" :dataReturn="viewReturn"></do-tree-dept-select>

  </el-dialog>
</template>

<style lang="scss" scoped>
button {
  margin: 5px;
}
</style>


<script>
export default {
  props: ["dialogVisible", "close", "getData"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.form.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        loginid: "",
        passwd: "",
        repasswd: "",
        deptid: "",
        deptname: "",
        telephones: "",
        email: ""
      },

      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
          //{ min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        loginid: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
          //{ min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
          //{ min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        repasswd: [{ validator: validatePass, trigger: "blur" }],
        deptname: [
          { required: true, message: "请选择组织机构", trigger: "blur" }
        ],
        telephones: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ]
      },
      dialogVisibleTree: false,
      detpReturn: []
    };
  },
  methods: {
    open() {
      if (this.$store.state.user.view == "update") {
        let { id, username, loginid,passwd,repasswd,deptid,deptname,telephones,email } = this.$store.state.user.viewData;
        this.form = { id, username, loginid,passwd,repasswd,deptid,deptname,telephones,email };
      } else {
        this.form = {
          username: "",
          loginid: "",
          passwd: "",
          repasswd: "",
          deptid: "",
          deptname: "",
          telephones: "",
          email: ""
        };
      }
    },
    save() {
      this.$refs["form"].validate(valid => {
        if (valid) {
           if(this.$store.state.user.view == 'update'){
            this.update();
          }
          else{
            this.add();
          }
        }
      });
    },
    add() {
      this.form.deptid = this.detpReturn
        .map(o => {
          return o.id;
        })
        .toString();
      let api = this.global.ip + "sysmanager/user/addUser";
      this.$http.post(api, this.form).then(response => {
        this.getData();
        this.close();
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.close();
        })
        .catch(_ => {});
    },
    viewOpen() {
      this.dialogVisibleTree = true;
    },
    viewClose() {
      this.dialogVisibleTree = false;
    },
    viewReturn(obj) {
      this.detpReturn = obj;
      this.form.deptname = obj
        .map(o => {
          return o.name;
        })
        .toString();
    }
  },
  mounted() {}
};
</script>
