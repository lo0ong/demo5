<template>
    <el-dialog title="数据字典项新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @open="open()">
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label-width="100px" label="字典名称">
          <el-input v-model="dictName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="字典项名称" prop="itemtext">
          <el-input v-model="form.itemtext"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="字典项编码" prop="codestr">
          <el-input v-model="form.codestr"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="描述">
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
  props:['dialogVisible','close','dictId','dictCode','dictName','getItemData'],
  data() {
    return {
      form: {
        dictionaryid:'',
        dictionarycode:'',
        itemtext:'',
        codestr:'',
        description:'',
      },
      rules:{
        itemtext:[
          { required: true, message: '请输入字典项名称', trigger: 'blur' },
        ],
        codestr:[
          { required: true, message: '请输入字典项编码', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    open(){

      if(this.$store.state.dictItem.view == 'update'){
        this.form.id = this.$store.state.dictItem.obj.id;
        this.form.itemtext = this.$store.state.dictItem.obj.itemtext;
        this.form.codestr = this.$store.state.dictItem.obj.codestr;
        this.form.description = this.$store.state.dictItem.obj.description;
      }
      else{
        this.form.id = '';
        this.form.itemtext = '';
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
      let api = this.global.ip + 'sysmanager/dict/item/addDictItem'; 
      this.form.dictionaryid = this.dictId;
      this.form.dictionarycode = this.dictCode;
      this.$http.post(api,this.form).then(
        (response) => {
          this.getItemData(1);
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
            this.getItemData(1);
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
