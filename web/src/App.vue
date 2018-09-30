<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>


<style lang="scss">
@import '@/assets/sass/query-bar.scss';

html,body,#app,.app-container,.app-center-container{
  margin: 0;
  height: 100%;
}


</style>


<script>

export default {
  name: "app",
  components: {}
};
</script>
