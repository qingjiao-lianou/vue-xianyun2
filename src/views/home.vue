<template>
  <div class="container">
    <!--轮播图 -->
    <el-carousel arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: []
    };
  },
  mounted() {
    // 获取轮播图数据
    this.$axios({ url: "/scenics/banners" }).then(res => {
      console.log(res);
      this.banners = res.data.data
      // console.dir(this.$axios);
      
    });
  }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
</style>