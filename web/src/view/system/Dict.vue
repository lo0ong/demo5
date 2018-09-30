<template>
    <div class="dict-page">
      <el-container>
        <el-aside width="200px">
          <!-- 工具栏 -->
          <el-row class="tools-bar">
            <el-col :span="12"><el-button type="primary" icon="el-icon-plus" circle @click="dictEditViewOpen()"></el-button></el-col>
            <el-col v-if="!isDelete" :span="12"><el-button type="Warning" icon="el-icon-delete" circle @click="isDelete = true;"></el-button></el-col>
            <el-col v-if="isDelete" :span="12"><el-button type="danger" icon="el-icon-delete" circle @click="deleteDict()"></el-button></el-col>
          </el-row>
          <!-- 字典列表 普通状态 -->
          <el-row v-if="!isDelete" class="list-bar">
            <el-col  class="dict-item" :class="{active:i==activeList}" :span="24"  v-for="(item,i) in list" :key="item.id" >
              <span class="dict-name" v-on:click="onClickList(item,i)">{{item.dictname}}</span>
            </el-col>
          </el-row>
          <!-- 字典列表 删除状态 -->
          <el-checkbox-group v-if="isDelete" class="list-bar" v-model="checkList">
            <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{item.dictname}}</el-checkbox>
          </el-checkbox-group>
        </el-aside>
        <el-main>
          <!-- 标题与操作按钮 -->
          <do-content-title title="数据字典列表" :clickAdd='itemEditViewOpen' :clickDelete='itemDelete' notTop="true"></do-content-title>

          <!-- 表格 -->
          <el-table :data="tableData" stripe style="width: 100%" @selection-change="tableSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="itemtext" label="字典项名称" width="180"></el-table-column>
              <el-table-column prop="codestr" label="字典项编码" width="180"></el-table-column>
              <el-table-column prop="description" label="描述" width="200"></el-table-column>
              <do-content-table-operate :edit="tableEdit" :del="tableDelete"></do-content-table-operate>
          </el-table>

          <!-- 分页 -->
          <do-content-pagination :currentPage="page.currentPage" :total="page.total" :getData="getItemData"></do-content-pagination>

          <!-- 新增 -->
          <dict-edit 
            :dialogVisible="dialogVisible" 
            :close="dictEditViewClose"
            :getData="getData">
          </dict-edit>
          <dict-item-edit 
            :dialogVisible="dialogVisibleItem" 
            :close="itemEditViewClose" 
            :dictName="itemName" 
            :dictId="itemId" 
            :dictCode="itemCode" 
            :getItemData="getItemData">
          </dict-item-edit>
        </el-main>
      </el-container>
    </div>
</template>

<style lang="scss" scoped>
.dict-page{
  height: 100%;
  .el-container{
    height: 100%;
    .el-aside{
      background-color: #fff;
      border-width: 3px;
      .tools-bar{
        height: 50px;
        border-bottom:2px solid #ccc;
        text-align: center;
        button{
          margin:5px;
        }
      }
      .list-bar{
        margin:5px 0px;
        .el-checkbox{
          display: block;
          margin:0 5px;
        }
        .el-checkbox+.el-checkbox{
          margin:0 5px;
        }
        .el-col{
          padding:0 10px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          &:hover{
            font-weight: bold;
            background-color: #ecf5ff;
          }
          &.active{
            background-color: #ecf5ff;
          }
          .dict-name{
            display: block;
          }
        }
      }
    }
  }
}
</style>


<script>
import DictEdit from "./DictEdit.vue";
import DictItemEdit from './DictItemEdit.vue'
import store from '@/vuex/store.js';
export default {
  store,
  components: {
    DictEdit,DictItemEdit
  },
  data() {
    return {
      isDelete: false,
      list:[], //数据字典列表
      activeList:0,//当前选中的数据字典
      checkList:[],//需要删除的数据字典
      itemId:'',//当前字典id
      itemCode:'',//当前字典code
      itemName:'',//当前字典名称
      tableData: [],
      selectedData:[],//表格中已选中的数据字典项，（删除使用）
      page:{
        currentPage: 1,
        total:2,
      },
      dialogVisible: false,
      dialogVisibleItem:false,
    };
  },
  methods: {
    /* 数据字典操作 */
    deleteDict(){//顶部删除按钮2
      //this.$message(this.checkList);
      if(this.checkList.length<1){
        this.isDelete = false;
        return;
      }
      let param = {
        ids:this.checkList.toString()
      }
      let api = this.global.ip + 'sysmanager/dict/batchDeleteDictById'
      this.$http.post(api,param).then(
        (response) => {
          if(response.code == '000'){
            this.isDelete = false;
            this.checkList = [];
            this.getData();
          }
        }
      );
    },
    dictEditViewOpen(){//新增页面-打开
      this.dialogVisible = true;
    },
    dictEditViewClose(){//新增页面-关闭
      this.dialogVisible = false;
    },
    
    /* 数据字典项操作 */
    itemEditViewOpen(){//弹窗-打开【新增】
      this.$store.commit('setDictItemView','add');
      this.dialogVisibleItem = true;
    },
    //itemdelet
    itemEditViewClose(){//弹窗-关闭
      this.dialogVisibleItem = false;
    },
    tableEdit(index,row,column){//弹窗-打开【编辑】
      this.dialogVisibleItem = true;

      this.$store.commit('setDictItemObj',this.tableData[index]);
      this.$store.commit('setDictItemView','update');
    },
    tableDelete(index,row,column){//删除
      let param = {
        ids:this.tableData[index].id
      }
      let api = this.global.ip + 'sysmanager/dict/item/batchDeleteDicitemById';
      this.$http.post(api,param,).then(
        (response) => {
          this.getItemData(1);
        }
      );
    },
    tableSelectionChange(val){//点击多选框时，触发
      this.selectedData = val;
    },
    itemDelete(){
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
      let api = this.global.ip + 'sysmanager/dict/item/batchDeleteDicitemById';
      this.$http.post(api,param,).then(
        (response) => {
          this.getItemData(1);
        }
      );
    },

    //获取数据-数据字典列表
    getData(){
      let api = this.global.ip + 'sysmanager/dict/queryAll'
      this.$http.get(api).then(
        (response) => {
          this.list = response.data;
          if(this.list.length > 0 ){
            this.itemId = this.list[0].id;
            this.itemCode = this.list[0].codestr;
            this.itemName = this.list[0].dictname;
            this.getItemData();
          }
        }
      );
    },
    //获取数据-数据字典项
    getItemData(pageNum){
      pageNum = pageNum | 1;
      let pageSize = this.$store.state.pagination.pageSize;
      let api = this.global.ip + 'sysmanager/dict/item/queryAll?parentId=' + this.itemId + '&pageNum=' + pageNum + '&pageSize=' + pageSize; 
      this.$http.get(api).then(
        (response) => {
          this.page.total = response.total;
          this.tableData = response.data;
        }
      );
    },
    //点击字典列表-查看字典项
    onClickList(item,i){
      this.activeList = i;
      this.itemId = item.id;
      this.itemCode = item.codestr;
      this.itemName = item.dictname;
      this.getItemData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
