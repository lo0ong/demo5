<template>
    <el-dialog title="角色信息编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @open="open()">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label-width="100px" label="角色名称" prop="rolename">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="角色描述">
          <el-input v-model="form.description " :rows="3" type="textarea"></el-input>
        </el-form-item>
      </el-form>

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
  props:['dialogVisible','close','getData'],
  data() {
    return {
      form: {
        rolename:'',
        description:''
      },
      rules:{
        rolename:[
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    open(){
      if(this.$store.state.role.view == 'update'){
        let {id,rolename,description} = this.$store.state.role.viewData;
        this.form = {id,rolename,description};
      }
      else{
        this.form.rolename = '';
        this.form.description = '';
      }
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {//验证通过
          if(this.$store.state.role.view == 'update'){
            this.update();
          }
          else{
            this.add();
          }
        } else {//验证不通过
          return false;
        }
      });
    },
    add(){
      let api = this.global.ip + 'sysmanager/role/addRoletype'; 
      this.$http.post(api,this.form).then(
        (response) => {
          this.getData();
          this.close();
        }
      );
    },
    update(){
      let api = this.global.ip + 'sysmanager/role/updateRoletype'; 
      this.$http.post(api,this.form).then(
        (response) => {
          this.getData();
          this.close();
        }
      );
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        this.close();
      }).catch(_ => {});
    },
  }
};
</script>
