<template>
    <el-dialog title="数据字典编辑" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @open="open()">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label-width="100px" label="字典名称" prop="dictname">
          <el-input v-model="form.dictname "></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="字典编码" prop="codestr">
          <el-input v-model="form.codestr"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="描述" >
          <el-input v-model="form.description" type="textarea" :rows="3"></el-input>
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
  props:['dialogVisible','close','dictId','dictCode','dictName','getData'],
  data() {
    return {
      form: {
        dictname:'',
        codestr:'',
        description:'',
      },
      rules:{
        dictname:[
          { required: true, message: '请输入字典名称', trigger: 'blur' },
        ],
        codestr:[
          { required: true, message: '请输入字典编码', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    open(){
      if(this.$store.state.dictItem.view == 'update'){
      }
      else{
        this.form.dictname = '';
        this.form.codestr = '';
        this.form.description = '';
      }
    },
    save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {//验证通过
          if(this.$store.state.dictItem.view == 'update'){
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
      let api = this.global.ip + 'sysmanager/dict/addDict'; 
      this.$http.post(api,this.form).then(
        (response) => {
          this.getData();
          this.close();
        }
      );
    },
    update(){
      let api = this.global.ip + 'sysmanager/dict/item/updateDictItem'; 
      this.form.dictionaryid = this.dictId;
      this.form.dictionarycode = this.dictCode;
      this.$http.post(api,this.form).then(
        (response) => {
          if(response.code == '000'){
            this.getData();
            this.close();
          }
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
