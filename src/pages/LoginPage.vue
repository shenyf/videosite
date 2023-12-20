<template>
  <div class="bg-styl login">
    <q-form @submit="submit" class="q-pa-md shadow-9">
      <q-tabs
        v-model="tab"
        active-color="primary"
        indicator-color="primary"
        align="left"
        :breakpoint="0"
        narrow-indicator
        class="text-black"
      >
        <q-tab name="mails" label="用户密码登录" />
      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels v-model="tab" class="text-center">
          <q-tab-panel name="mails" class="q-col-gutter-y-sm">
            <div class="row">
              <div class="col">
                <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  v-model.trim="form.userName"
                  dense
                  debounce="500"
                  label="用户名"
                  lazy-rules
                  square
                  :rules="[(val) => (val && val.length > 0) || '请输入用户名']"
                >
                  <template #prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  :type="isPwd ? 'password' : 'text'"
                  v-model.trim="form.password"
                  dense
                  debounce="500"
                  label="密码"
                  lazy-rules
                  square
                  :rules="[(val) => (val && val.length > 0) || '请输入密码']"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <div class="q-mx-md">
          <div class="row">
            <div class="col text-left">
              <q-checkbox v-model="autoLogin" label="自动登录" />
            </div>
            <div class="col text-right">
              <q-btn color="primary" flat label="忘记密码" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-btn
                dense
                unelevated
                label="登 录"
                size="17px"
                color="primary q-mt-sm"
                class="full-width no-border-radius"
                type="submit"
                :loading="loading"
              >
                <template v-slot:loading>
                  <q-spinner-ios class="on-left" />登录...
                </template>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "LoginPage",
  data() {
    return {
      title: process.env.PRODUCT_NAME,
      form: {
        userName: "guest",
        password: "123456",
      },
      iconObject: {
        weixin: {
          class: { iconName: "iconweixin", color: "text-grey" },
          size: "22px",
        },
        zhifubao: {
          class: {
            iconName: "iconzhifubao",
            color: "text-grey",
          },
          size: "20px",
        },
        taobao: {
          class: { iconName: "icontaobao", color: "text-grey" },
          size: "22px",
        },
        weibo: {
          class: { iconName: "iconweibo", color: "text-grey" },
          size: "20px",
        },
        github: {
          class: { iconName: "iconhuaban88", color: "text-grey" },
          size: "23px",
          type: "link",
        },
      },
      iconActive: {
        weibo: "grey",
      },
      tab: "mails",
      isPwd: true,
      autoLogin: true,
      loading: false,
    };
  },
  methods: {
    submit() {
      this.loading = true;
      login(this.form)
        .then((res) => {
          this.$store.commit("user/updateToken", res.data.token);
          // this.$store.commit("user/updateInfo", res.data.user);
          // this.$store.commit("user/updateAccesses", res.data.menus);
          // this.$router.push({ path: "/system/depts" });
          setTimeout(() => {
            window.location.replace(this.$route.params.from || "/home");
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    mouseOver(iconKey) {
      this.activeForLoginType(iconKey, "text-primary");
    },
    mouseLeave(iconKey) {
      this.activeForLoginType(iconKey, "text-grey");
    },
    activeForLoginType(iconKey, targetColor) {
      this.iconObject[iconKey].class.color = targetColor;
    },
  },
  mounted() {
    if (this.$store.state.user.token) {
      this.$router.replace(this.$route.params.from || "/home");
    } else {
      this.$store.commit("user/clear");
    }
  },
  computed: {
    loginIcon() {
      return this.iconObject;
    },
  },
};
</script>

<style lang="scss" scoped>
/* @import "~assets/icons/iconfont.css"; */

.login {
  background-color: #f0f2f5;
  width: 100%;
  min-height: 100%;
  /* background: #f0f2f5 url("~assets/login/login.svg") no-repeat 50%; */
  background-size: 100%;
  display:flex;

  h2 {
    left: 0;
    width: 100%;
    font-size: 20px;
    color: #707070;
    text-align: center;
    text-shadow: 1px 2px 4px #444;
  }

  .q-form {
    width: 400px;
    background: #fff;
    border-radius: 9px;
    margin:auto;
  }
}
</style>
