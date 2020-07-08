<template>
  <div id="app"  class="login-page">
    <!-- 背景图 -->
    <!-- <img class="login-page-bg" :src="bgImage" alt="登陆背景图" /> -->
    <!-- 登陆表单 -->
    <div class="login-form-box">
      <el-form :model="loginForm" :rules="loginRules" ref="login-form">
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入账号"></el-input>
        </el-form-item>
      </el-form>
      <div class="align-right login-button">
        <el-button type="primary" class="width-full" @click="handleLogin('login-form')">立即登录</el-button>
      </div>
      <div class="login-link-box">
        <div>立即注册</div>
        <div>忘记密码</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    handleLogin(formName) {
      let params = {
        account: this.loginForm.account,
        password: this.loginForm.password
      }
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.get("/userInfo1", params).then(res => {
              if (res.meta.status === 200) {
                this.$message.success(res.meta.msg);
                window.sessionStorage.setItem('token', res.data.token);
                // this.$store.dispatch('app/setToken', res.data.token);
              } else {
                this.$message.error("登录失败");
              }
            }).catch(error => {
              console.log(error);
            });
          } else {
            this.$message.error("账号或密码错误");
            return false;
          }
        });
    }
  },
};

</script>

<style lang="scss">
.login-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #393a44;

  > .login-form-box {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-top: -160px;
    margin-left: -230px;
    width: 460px;
    height: 320px;
    padding: 15px;
    background: rgba(245, 245, 245, 0.6);
    box-shadow: 0px 0px 4px 6px #f3f3f3;

    .login-button {
      padding-top: 20px;
      text-align: center;
    }

    .login-link-box {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      cursor: pointer;
    }
  }
}
</style>



