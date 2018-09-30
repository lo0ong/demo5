<template>
    <div class="do-footer">{{msg}}</div>
</template>

<style lang="scss" scoped>
$do-footer-height:30px;
.do-footer{
  text-align: center;
  height: $do-footer-height;
  line-height: $do-footer-height;
  background: #f7f7f7;
  border-top:2px solid #ccc;
}
</style>


<script>
export default {
  data() {
    return {
      msg: "版权所有：XXXX"
    };
  },
  methods: {
  },
  mounted() {}
};
</script>
