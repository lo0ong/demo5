<template>
    <el-dialog title="数据字典编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @open="open()">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label-width="100px" label="上级组织">
          <el-input v-model="form.parentname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="组织名称" prop="deptname">
          <el-input v-model="form.deptname"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="排序" prop="ordernum">
          <el-input v-model="form.ordernum"></el-input>
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
        parentid:'',
        parentname:'',
        deptname:'',
        ordernum:'',
      },
      rules:{
        deptname:[
          { required: true, message: '请输入组织名称', trigger: 'blur' },
        ],
        ordernum:[
          {  required: true, message: '请输入排序', trigger: 'blur' },
          //{  type:"integer", message: '请输入数字', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    open(){
      if(this.$store.state.dept.view == 'update'){
        let {id,parentid,parentname,deptname,ordernum} = this.$store.state.dept.viewData;
        this.form = {id,parentid,parentname,deptname,ordernum};
      }
      else{
        let parent = this.$store.getters.getDeptTreeActive;
        this.form.parentid = parent.id;
        this.form.parentname = parent.name;
        this.form.deptname = '';
        this.form.ordernum = '';
      }
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {//验证通过
          if(this.$store.state.dept.view == 'update'){
            this.update();
          }
          else{
            this.add();
          }
          //location.reload();//页面重新加载【按需使用】
        } else {//验证不通过
          return false;
        }
      });
    },
    add(){
      let api = this.global.ip + 'sysmanager/dept/addDept'; 
      this.$http.post(api,this.form).then(
        (response) => {
          this.getData();
          this.close();
        }
      );
    },
    update(){
      let api = this.global.ip + 'sysmanager/dept/updateDept'; 
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
