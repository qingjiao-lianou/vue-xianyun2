<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters :data="copyFlightsData" @setFlightsList="setFlightsList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in  flightsList" :key="index" :data="item" />
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import flightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      // 机票数据
      flightsData: {
        info: {},
        options: {}
      },
      copyFlightsData: {
        info: {},
        options: {}
      },
      //   渲染的机票列表
      flightsList: [],
      //   总条数
      total: 0,
      //   当前页码
      currentPage: 1,
      //   当前条数
      pageSize: 5
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    flightsFilters,
    FlightsAside
  },
  // 监听路由变化
  watch: {
    $route() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        this.copyFlightsData = { ...res.data };
        this.total = this.flightsData.total;
        this.flightsList = this.flightsData.flights.slice(0, this.pageSize);
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.flightsData = res.data;
      this.copyFlightsData = { ...res.data };
      this.total = this.flightsData.total;
      this.flightsList = this.flightsData.flights.slice(0, this.pageSize);
    });
  },
  methods: {
    //   切换条数时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.flightsList = this.flightsData.flights.slice(0, val);
    },
    //   切换页码时触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.flightsList = this.flightsData.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.pageSize * this.currentPage
      );
    },
    setFlightsList(arr) {
      this.flightsData.flights = arr;
      this.currentPage = 1;
      this.flightsList = this.flightsData.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.pageSize * this.currentPage
      );
      this.total = arr.length;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>