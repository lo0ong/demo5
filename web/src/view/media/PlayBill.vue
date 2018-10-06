<template>
    <div>
        <div class="title"><span> {{msg}}·节目单</span>
            <el-date-picker class="searchdate" v-model="value" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
            </el-date-picker>
        </div>
        <div>
            <el-breadcrumb separator="|">
                <el-breadcrumb-item v-for="date in selectdate" :key="date">
                    <el-button @click="handledate(date)">{{date}}</el-button>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <span>{{currentdate}}的节目单</span>
        <span>
            <el-button type="primary" @click="addChannel()">新增</el-button>
        </span>
        <span>
            <el-button type="danger" size="small" @click="handleDeletes(scope.$index, scope.row)">批量删除</el-button>
        </span>
        <el-table ref="billData" :data="billData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="startDate" label="开始时间" width="120">
            </el-table-column>
            <el-table-column prop="endDate" label="结束时间" width="120">
            </el-table-column>
            <el-table-column prop="name" label="节目名称" width="120">
            </el-table-column>
            <el-table-column prop="status" width="120" label="状态" :formatter="formatRole">
            </el-table-column>
            <el-table-column prop="url" width="120" label="节目路径">
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

    </div>

</template>

<style scoped>
.title {
  height: 40px;
  background-color: red;
  font-size: 25px;
}
.searchdate {
  position: absolute;
  right: 50%;
}
.el-picker-panel [slot="sidebar"],
.el-picker-panel__sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 110px;
  border-right: 1px solid #e4e4e4;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 6px;
  background-color: #fff;
  overflow: hidden;
}
</style>

<script>
export default {
  data() {
    return {
      msg: this.$route.query.name,
      msg2: "",
      currentdate: new Date(),
      billData: [
        {
          urlImage: "",
          name: "湛江公共频道",
          parentName: "电视->地方",
          enumState: "0",
          playBill: "http://www.w3school.com.cn",
          isReview: "1"
        }
      ],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
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

