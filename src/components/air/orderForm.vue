<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="users[index].id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in airInfo.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handleChange(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span v-show="false">{{allPrice}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [{ username: "", id: "" }], // 用户数据
      insurances: [], //   保险id
      contactName: "", //联系人名字
      contactPhone: "", //联系人电话
      invoice: false, //是否需要发票
      captcha: "", //验证码
      seat_xid: "", //座位id
      air: "", //航班id
      airInfo: {} //   机票信息
    };
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    //   获取保险数据
    this.$axios({
      url: `/airs/${id}`,
      params: {
        seat_xid
      }
    }).then(res => {
      console.log(res);
      this.airInfo = res.data;
      this.$store.commit("setAirInfo", this.airInfo);
    });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    // 获取保险id
    handleChange(id) {
      const index = this.insurances.indexOf(id);
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(id);
      }
    },

    // 发送手机验证码
    async handleSendCaptcha() {
      if (this.contactPhone === "") {
        this.$message.error("请输入手机号");
        return;
      }

      const res = await this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.contactPhone
        }
      });
      this.$alert(`模拟验证码是:${res.data.code}`, "提示");
    },

    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        air: this.$route.query.id,
        seat_xid: this.$route.query.seat_xid,
        captcha: this.captcha,
        invoice: this.invoice
      };
      // 验证乘机人
      if (!this.users[0].username || !this.users[0].id) {
        this.$message.error("乘机人不能为空");
        return;
      }
      // 验证联系人
      if (!this.contactName) {
        this.$message.error("联系人不能为空");
        return;
      }
      // 手机号不能为空
      if (!this.contactPhone) {
        this.$message.error("手机号不能为空");
        return;
      }
      // 验证验证码
      if (!this.captcha) {
        this.$message.error("验证码不能为空");
        return;
      }

      this.$axios({
        url: "/airorders",
        method: "post",
        headers: {
          Authorization: `Bearer ${this.$store.state.userInfo.token}`
        },
        data
      }).then(res => {
        console.log(res);
        this.$message.success("提交成功");
        const {id} = res.data.data
        this.$router.push({
           name: 'pay',
           query:{
             id
           }
        })
      });
    }
  },
  computed: {
    //   计算总价格
    allPrice() {
        if(!this.airInfo.seat_infos){
            return 0
        }
      let price = 0;
      price += this.airInfo.seat_infos.org_settle_price; // 机票单价
      price += this.airInfo.airport_tax_audlet; // 燃油费
      price += 30 * this.insurances.length; // 保险费
      price *= this.users.length; // 人数总价
      this.$store.commit('setAllPrice',price)
      return price;
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>