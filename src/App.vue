<template>
  <div id="app">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
}
em,
i {
  font-style: normal;
}
/* 页面切换时候过渡样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
 }

 /* 打开时候过渡样式 */
.fade-enter,
.fade-leave-active {
  opacity: 0;
}


</style>
