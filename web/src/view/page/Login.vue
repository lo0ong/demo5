<template>
  <div class="login-page">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="loginAcct">
          <el-input v-model="ruleForm.loginAcct" placeholder="账号">
            <template slot="prepend"><i class="el-icon-edit"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="loginPass">
          <el-input type="password" placeholder="密码" v-model="ruleForm.loginPass" @keyup.enter.native="submitForm('ruleForm')">
            <el-button slot="prepend"><i class="el-icon-edit"></i></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="login-tips">Tips : admin/admin</p>
      </el-form>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.login-page {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: 100%;

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }
  .ms-content {
    padding: 30px 30px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
}
</style>

<script>
export default {
  data: function() {
    return {
      ruleForm: {
        appType: "10",
        loginType: "10",
        loginAcct: "admin",
        loginPass: "admin"
      },
      rules: {
        loginAcct: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        loginPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        }
      });
    },
    login() {
      let api = this.global.ip + "sysmanager/login/login";
      this.$http.post(api, this.ruleForm).then(response => {
        if (response.code == "000") {
          this.$router.push("/dept");
        }
      });
    }
  }
};
</script>
