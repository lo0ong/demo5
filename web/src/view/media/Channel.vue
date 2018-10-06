<template>
  <div class="dept-page">
    <div class="left-menu">
      <do-tree-channel ref="doTreeChannel"></do-tree-channel>
    </div>
    <div>
      <div>
        <span> 查询条件</span>
      </div>
      <el-form :inline="true" :model="SearchForm" class="demo-form-inline" ref="SearchForm">
        <el-form-item label="频道名称" prop="name">
          <el-input v-model="SearchForm.name" placeholder="频道名称"></el-input>
        </el-form-item>
        <el-form-item label="频道状态" prop="status">
          <el-select v-model="SearchForm.status">
            <el-option label="全部" value="2"></el-option>
            <el-option label="已上线" value="1"></el-option>
            <el-option label="已下线" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="直播状态" prop="livestatus">
          <el-select v-model="SearchForm.livestatus">
            <el-option label="全部" value="2"></el-option>
            <el-option label="正在直播" value="1"></el-option>
            <el-option label="停播" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
          <el-button @click="resetForm('SearchForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span>频道列表</span>
      <span class="title-button">
        <el-button type="primary" size="small" @click="addChannel()">新增</el-button>
        <el-button type="danger" size="small" @click="handleDeletes(scope.$index, scope.row)">批量删除</el-button>
      </span>
      <el-table ref="tableData" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="urlImage" label="预览图" width="120">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column prop="name" label="频道名称" width="120">
        </el-table-column>
        <el-table-column prop="parentName" label="所属目录" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="enumState" width="120" label="频道状态" :formatter="formatRole">
        </el-table-column>
        <el-table-column label="节目单" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="checkPlayBill(scope.$index, scope.row)">查看节目单</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="isReview" width="120" label="直播状态" :formatter="liveformatRole">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">【修改】</el-button>
            <el-button type="text danger" size="small" @click="handleDelete(scope.$index, scope.row)">【删除】</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[ 10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!--新增界面/编辑界面-->
    <el-dialog title="新增菜单" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" label-width="100px">
        <el-form-item label="所属目录" prop="parentName">
          <el-input v-model="addForm.parentName"></el-input>
        </el-form-item>
        <el-form-item label="频道名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="seq">
          <el-input v-model="addForm.seq"></el-input>
        </el-form-item>
        <el-form-item label="预览图" prop="urlImage">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" prop="enumState">
          <el-radio v-model="addForm.enumState" label="1">上线</el-radio>
          <el-radio v-model="addForm.enumState" label="0">下线</el-radio>
        </el-form-item>
        <el-form-item label="说明" prop="text">
          <el-input v-model="addForm.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAdd('addForm')">立即创建</el-button>
          <el-button @click="addFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<style lang="scss" scoped>
.title-button {
  float: right;
}
</style>


<script>
export default {
  data() {
    return {
      //总记录数
      total: 0,
      //分页大小
      pageSizes: 10,
      //页码
      pageNum: 1,
      addFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      //查询表初始化数据
      SearchForm: {
        name: "",
        status: "2",
        livestatus: "2"
      },
      tableData: [
        {
          urlImage: "",
          name: "湛江公共频道",
          parentName: "电视->地方",
          enumState: "0",
          playBill: "http://www.w3school.com.cn",
          isReview: "1"
        }
      ],
      addForm: {}
    };
  },
  methods: {
    //查询方法
    onSubmit() {
      let params = "&pageNum=" + this.pageNum + "&pageSize=" + this.pageSizes;
      params += this.SearchForm.name ? "&name=" + this.SearchForm.name : "";
      params +=
        parseInt(this.SearchForm.status) < 2
          ? "&enumState=" + this.SearchForm.status
          : "";
      params +=
        parseInt(this.SearchForm.livestatus) < 2
          ? "&isReview=" + this.SearchForm.livestatus
          : "";
      console.log("查询参数是：", params);
      getChannelList(params).then(data => {
        if (data.resultCode == "000") {
          this.tableData3 = data.resultData;
          this.total = data.resultCount;
          console.log(data);
          console.log(data.resultData);
        } else {
          this.$message.error("查询失败");
        }
      });
      this.formatRole;
    },
    //频道状态数据转换
    formatRole: function(row, column) {
      return row.enumState == "1"
        ? "已上线"
        : row.enumState == "0"
          ? "已下线"
          : "NA";
    },
    //直播状态数据转换
    liveformatRole: function(row, column) {
      return row.isReview == "1"
        ? "正在直播"
        : row.isReview == "0"
          ? "停播"
          : "NA";
    },
    //编辑方法
    handleEdit(index, row) {
      this.addForm = row;
      this.addFormVisible = true;
      this.addForm.enumState = "" + this.addForm.enumState;
      console.log(this.addForm);
      console.log(this.addForm.enumState);
    },
    //删除方法
    handleDelete(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", { type: "warning" })
        .then(() => {
          // this.listLoading = true;
          let para = { id: row.id };
          // console.log('要删除的id是',para)
          post_deletLanmu(para).then(res => {
            // this.listLoading = false;
            // console.log('删除返回的信息是',res.resultData);
            this.onSubmit(); //重新绑定table数据。
            //  this.$refs.treeLanm. getList();//重新绑定树
            // console.log('删除成功，并更新数据');
          });
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //重置
    resetForm(formName) {
      console.log("重置");
      this.$refs[formName].resetFields();
    },
    //每页显示行数
    handleSizeChange(val) {
      this.pageSizes = val;
      this.onSubmit();
      console.log(`每页 ${this.pageSizes} 条2`);
    },
    //页码选择
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.onSubmit();
    },
    //新增频道
    addChannel() {
      this.addForm = {};
      return (this.addFormVisible = true);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
    },
    //查看节目单
    checkPlayBill(index, r) {
      let playbillpage = this.$router.resolve({
        path: "/playbill",
        name: "playbill",
        query: { view: "playbill", key: index, name: r.name }
      });
      console.log(r)
      window.open(playbillpage.href, "_blank");
    }
  }
};
</script>
