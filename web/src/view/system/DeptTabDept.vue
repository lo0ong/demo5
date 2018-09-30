<template>
  <div class="dept-tab-dept-page">
    
    <el-row class="query-bar">
      <el-col :span="6"><label>组织名称：</label><el-input v-model="query.dept" ></el-input></el-col>
      <el-col :span="6"> 
        <el-button plain type="primary" @click="queryData">查询</el-button> 
        <el-button plain type="primary" @click="queryReset">重置</el-button>
        </el-col>
    </el-row>

    <!-- 标题与操作按钮 -->
    <do-content-title title="下级组织" :clickAdd='tableA' :clickDelete="tableDS" isShowDelete="true"></do-content-title>
 
    <!-- 表格 -->
    <el-table :data="this.$store.state.dept.deptTableData" stripe style="width: 100%" @selection-change="tableSelect">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="deptname" label="组织名称" width="180"></el-table-column>
      <el-table-column prop="parentname" label="上级组织名称" width="180"></el-table-column>
      <el-table-column prop="ordernum" label="排序" width="180"></el-table-column>
      <do-content-table-operate :edit="tableE" :del="tableD"></do-content-table-operate>
    </el-table>

    <!-- 分页 -->
    <do-content-pagination :currentPage="this.$store.getters.getDeptTablePage.currentPage" :total="this.$store.getters.getDeptTablePage.total"></do-content-pagination>
    <!-- 新增 -->
    <dept-edit 
      :dialogVisible="dialogVisibleDept" 
      :close="viewDeptClose"
      :getData="getData">
    </dept-edit>
      
  </div>
</template>

<style lang="scss" scoped>

</style>


<script>
import DeptEdit from './DeptEdit.vue'

export default {
  props:['cellBackAddDept'],
  components:{
    DeptEdit,
  },
  data() {
    return {
      query:{
        dept:'',
      },
      page:{
        currentPage: 1,
        total:2,
      },
      dialogVisibleDept:false,//部门编辑弹窗是否显示
      selectedData:[],//表格选中
    };
  },
  methods: {
    queryReset(){
      this.$store.commit('setDeptTableQuery',{});
      this.query.dept = '';
    },
    queryData(){
      this.$store.commit('setDeptTableQuery',this.query);
      this.getData();
    },
    viewDeptOpen(){
      this.dialogVisibleDept = true;
    },
    viewDeptClose(){
      this.dialogVisibleDept = false;
    },
    tableSelect(val){
      this.selectedData = val;
    },
    tableA(){
      this.$store.commit('setDeptView','add');
      this.viewDeptOpen();
    },
    tableE(index,row,column){
      this.$store.commit('setDeptViewData',this.$store.state.dept.deptTableData[index]);
      this.$store.commit('setDeptView','update');
      this.viewDeptOpen();
    },
    tableD(index,row,column){
      let param = {
        ids:this.$store.state.dept.deptTableData[index].id
      }
      let api = this.global.ip + 'sysmanager/dept/batchDeleteDeptById';
      this.$http.post(api,param,).then(
        (response) => {
          this.getData();
        }
      );
    },
    tableDS(){
      if(this.selectedData.length<1){
        this.$message({
          message:'请选择需要删除的数据！',
          type:'warning'
        })
        return;
      }
      let param = {
        ids:this.selectedData.map(v=>{return v.id}).toString()
      }
      let api = this.global.ip + 'sysmanager/dept/batchDeleteDeptById';
      this.$http.post(api,param,).then(
        (response) => {
          this.getData();
        }
      );
    },
    getData(){
      this.cellBackAddDept();
    }
  },
  mounted() {}
};
</script>
