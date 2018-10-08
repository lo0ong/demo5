<template>
  <div>
    <div class="title">
      <span> {{msg}}·节目单</span>
      <el-date-picker class="searchdate" v-model="value" align="right" type="date" placeholder="选择日期" 
       format="yyyy 年 MM 月 dd 日"
      value-format="yyyy 年 MM 月 dd 日"
      :picker-options="pickerOptions1"
      >
      </el-date-picker>
    </div>
    <div>
      <el-breadcrumb separator="|">
        <el-breadcrumb-item v-for="date in selectdate" :key="date">
          <el-button @click="handledate(date)">{{date}}</el-button>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <span>{{value}}的节目单</span>
    <span class="title-button">
      <el-button type="primary" size="small" @click="copyChannel()">复制历史节目单</el-button>
      <el-button type="primary" size="small" @click="addChannel()">新增节目</el-button>
      <el-button type="danger" size="small" @click="handleDeletes(scope.$index, scope.row)">批量删除</el-button>
    </span>
    <el-table ref="billData" :data="billData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="200">
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="200">
      </el-table-column>
      <el-table-column prop="name" label="节目名称" width="200">
      </el-table-column>
      <el-table-column prop="status" width="120" label="状态" :formatter="formatRole">
      </el-table-column>
      <el-table-column prop="url" width="200" label="节目路径">
      </el-table-column>
      <el-table-column label="查看片源" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="checkMedia(scope.$index, scope.row)">查看片源</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">【修改】</el-button>
          <el-button type="text danger" size="small" @click="handleDelete(scope.$index, scope.row)">【删除】</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增节目" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="日期" prop="date">
          <el-input readonly v-model="addForm.date"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-input  v-model="addForm.startTime"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-input v-model="addForm.endTime"></el-input>
        </el-form-item>
        <el-form-item label="节目名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAdd('addForm')">确 认</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>

</template>

<style scoped>
.title-button {
  float: right;
}
.title {
  height: 40px;
  background-color: red;
  font-size: 25px;
  overflow: hidden;
}
.searchdate {
  position: absolute;
  right: 50%;
  overflow: hidden;
}
</style>

<script>
export default {
  data() {
    return {
      msg: this.$route.query.name,
      msg2: "",
      dialogFormVisible: false,
      currentdate: new Date(),
      addForm: {},
      rules: {
        startTime: [
          { required: true, message: "请输入开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请输入结束时间", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入节目名称", trigger: "blur" }]
      },
      billData: [
        {
          startTime: "11:49",
          endTime: "12:30",
          name: "湛江新闻(重播)",
          status: "2",
          url: "http://www.w3school.com.cn"
        }
      ],
      pickerOptions1: {
       shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value: "",
      selectdate: [
        20181001,
        20181002,
        20181003,
        19900205,
        19900830,
        20181006,
        20181007
      ]
    };
  },
  methods: {
    //状态数据转换
    formatRole: function(row, column) {
      return row.status == "1" ? "直播" : row.status == "0" ? "预告" : "回看";
    },
    //新增界面
    addChannel() {
      if (this.dialogFormVisible == false) {
        this.addForm.date = this.currentdate
        return (this.dialogFormVisible = true);
      } else {
        console.log(this.dialogFormVisible);
        return (this.dialogFormVisible = false);
      }
    },
    getParams() {
      this.msg2 = this.$route.query.key;
      console.log(this.$route.query);
    },
    handledate(date) {
      this.currentdate = date;
    }
  }
};
</script>

