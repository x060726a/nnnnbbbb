
<template>
<div class="notLogin">
    <div class="logo"><div class="icon-login"></div></div>
    <div class="icon-posi">
      <span class="block-line username-line"><i class="iconfont icon-my"></i></span>
      <input type="text" class="username" v-model="username" placeholder="请输入手机号 / 用户名" maxlength="16" ref="input1" value="">
    </div>
    <div class="icon-posi">
      <span class="yanj" @click="isShowP=!isShowP"><i class="iconfont" :class="{'icon-attention':!isShowP,'icon-attentionfill':isShowP}"></i></span>
      <span class="block-line password-line"><i class="iconfont icon-unlock"></i></span>
      <input :type="isShowP?'text':'password'" class="password" v-model="password" placeholder="请输入密码"  maxlength="16">
    </div>
    <!-- <div class="kefu"><span>联系客服</span></div> -->
    <div class="login-btn" @click="login()">登录</div>
    <div class="re">
        <div class="reg" @click="goRouter()">我要注册</div>
        <div class="split"></div>
        <a class="rem" @click="$router.push({path:'/findpassword'})">忘记密码</a>
    </div>
</div>
</template>
<script>
import { mapGetters } from "Vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      value: "",
      isShowP:false
    };
  },
  computed:{
    ...mapGetters(['sysTem'])
  },
  methods: {
    login() {
      if (this.username == "") {
        this.$vux.toast.text('用户名不能为空', 'middle')
        return;
      }
      if (this.password == "") {
        this.$vux.toast.text('密码不能为空', 'middle')
        return;
      }
      var that = this;

      let postData = that.$qs.stringify({
        username: that.username,
        password: that.password
      });
      this.$vux.loading.show({
          text: '登录中',
      })
      that.$http.post("/v1/user/login", postData).then(res => {
        if (res.code == 0) {
          that.$store.commit("user", res.data);
          var user = JSON.stringify(res.data);
          localStorage.setItem("user", user);
          if (!res.data.user_category) { // 判断是否选择喜好的类型
              that.$router.push({ path: "/loveType" });
          }else if (that.$store.state.loginBackPath) {
            //判断是否从哪里获得的登录提示
            that.$router.push({ path: that.$store.state.loginBackPath });
          } else {
            //默认的登录跳转
            that.$router.push({ path: "/main" });
          }
          //登录成功后把loginBackPath=null
          that.$store.commit("loginBackPath", null);
        }
        if (res.code == 1001) {
          that.$vux.toast.text(res.msg_zh, 'middle')
        }
        that.$vux.loading.hide()
      });
    },
    goRouter() {
      this.$router.push({ path: "/reg" });
    }
  }
};
</script>
<style lang="scss" scoped>
.notLogin {
  background: #fff;
  height: 100%;
  .icon-posi{
    width: 552px;
    padding-bottom:10px;
    margin: auto;
    position: relative;
    margin-bottom:60px;
    border-bottom:$border-color 1px solid;
  }
  .yanj{
    width:50px;
    height: 50px;
    display: block;
    position: absolute;
    right:18px;
    top: -5px;
    >i{
      width:50px;
      height: 50px;
      color:#999;
      font-size: 35px;
      display: block;
    }
  }
  .mtop {
    margin-top: 20px;
  }
  .logo {
    width: 160px;
    margin: auto;
    padding-top:60px;
    margin-bottom:100px;
    .icon-login {
      width: 160px;
      height: 160px;
      background: url("/static/images/logo_new.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 30px;
    }
  }
  input {
    display: block;
    width: calc(100% - 60px);
    font-size: 30px;
    padding-left:55px;
    color:$text-table-color;
    border-radius: 0;
    color:#000;
    // padding-bottom:10px;
  }
  input::-webkit-input-placeholder {
    color: #999;
    font-size: 30px;
  }
  .block-line {
    height: 42px;
    display: block;
    text-align: left;
    line-height: 42px;
    position: absolute;
    bottom: 10px;
    left: 0;
    i {
      font-size: 38px;
      display: block;
    }
  }
  .kefu {
    font-size: 24px;
    line-height: 35px;
    color: $subtitle-color;
    overflow: hidden;
    width: 80%;
    margin: auto;
    span {
      float: right;
    }
  }
}
.login-btn {
  height: 88px;
  line-height: 88px;
  border-radius: 44px;
  width: 80%;
  margin: 0 auto;
  background: $theme-color;
  color: #fff;
  font-size: 32px;
}
.re {
  width: 80%;
  margin: auto;
  font-size: 30px;
  display: flex;
  justify-content: center;
  color: #666;
  padding-top: 20px;
  .split {
    width: 1px;
    height: 32px;
    background-color: #666;
    margin: 6px 20px 0;
  }
  a {
    text-decoration: none;
    color: #666;
  }
}
</style>
