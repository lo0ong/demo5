<!--
组件说明：主要内容区的标题与操作按钮（如：新增、删除）
-->

<template>
  <!-- 标题与操作按钮 -->
  <div class="do-content-title" v-bind:class="{ notTop: !notTop }">
    <h3 class="title">{{title}}</h3>
    <div class="tools">
      <el-button v-if="clickAdd" type="primary" @click="clickAdd('add')">{{(clickAddName?clickAddName:'新增')}}</el-button> 
      <el-button v-if="clickDelete" type="primary" @click="clickDelete('delete')">删除</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.do-content-title {
  position: relative;
  padding: 0 10px;
  height: 50px;
  background-color: #e9f1f4;
  &.notTop{
    margin-top:10px;
  }
  .title {
    margin: 0px;
    line-height: 50px;
  }
  .tools {
    position: absolute;
    top: 0px;
    right: 10px;
  }
  button {
    margin: 5px;
  }
}

</style>


<script>
export default {
  props:['title','clickAdd','clickDelete','notTop','clickAddName'],
  data() {
    return {
    };
  },
  methods: {},
  mounted() {
  }
};
</script>