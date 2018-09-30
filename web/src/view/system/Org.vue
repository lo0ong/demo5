<template>
    <div>
        <h3>机构列表{{msg}}</h3>
    </div>
</template>

<style lang="scss" scoped>
button {
  margin: 5px;
}
</style>


<script>
export default {
  data() {
    return {
      msg: "msg：触发了"
    };
  },
  methods: {
    test() {
    }
  },
  mounted() {}
};
</script>
