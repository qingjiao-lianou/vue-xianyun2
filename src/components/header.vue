<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <router-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </router-link>
      </div>

      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
        <router-link to="/">首页</router-link>
        <router-link to="/post">旅游攻略</router-link>
        <router-link to="/hotel">酒店</router-link>
        <router-link to="/air">国内机票</router-link>
      </el-row>

      <!-- 登录/用户信息 -->

      <router-link v-if="!$store.state.userInfo.token" to="/login" class="account-link">登录 / 注册</router-link>
      <div v-else>
        <img
          class="img1"
          :src="`${$axios.defaults.baseURL}${$store.state.userInfo.user.defaultAvatar}`"
          alt
        />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{$store.state.userInfo.user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;

  .main {
    width: 1000px;
    margin: 0 auto;
  }

  .logo {
    width: 156px;
    padding-top: 8px;

    img {
      display: block;
      width: 100%;
    }
  }

  .navs {
    margin: 0 20px;
    flex: 1;

    a {
      display: block;
      padding: 0 20px;
      height: 60px;
      box-sizing: border-box;

      &:hover,
      &:focus,
      &:active {
        border-bottom: 5px #409eff solid;
        color: #409eff;
      }
    }

    // /deep/ .nuxt-link-exact-active {
    //   background: #409eff;
    //   color: #fff !important;
    // }
  }

  .message {
    height: 36px;
    line-height: 1;
    cursor: pointer;
    .el-icon-bell {
      margin-right: 2px;
      font-size: 18px;
    }
  }

  .el-dropdown-link {
    margin-left: 5px;

    a {
      display: block;
    }
  }

  .account-link {
    font-size: 14px;
    margin-left: 10px;
    color: #666;

    &:hover {
      color: #409eff;
      text-decoration: underline;
    }
  }
}

.img1 {
  width: 36px;
  height: 36px;
  vertical-align: middle;
  border: 2px #fff solid;
  border-radius: 50px;
  &:hover {
    border-color: #409eff;
  }
}
</style>